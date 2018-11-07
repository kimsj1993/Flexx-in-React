from enum import Enum
import random
from typing import List, Optional, Union

from . import events
from .db_models import db, Card, CardMapping, Game, PlayerState
from .enums import CARD_LOCATION, CARD_TYPE, CARD_TYPE_LOC_MAP


def evaluate_conditions(card: Card, player: Optional[PlayerState] = None) -> bool:
    if card.precondition is None:
        return True


def compute_num_to_draw(player: PlayerState):
    rules_present = [c for c in player.game.rules
                     if c.type is CARD_TYPE.NEW_RULE
                        and c.subtype == "BONUS"
                        and evaluate_conditions(c, player)]

    bonus = sum((d.get("draw_extra", 0) for d in c.result.values()) for c in rules_present)

    return player.game.draw_num + bonus


def compute_num_plays(player: PlayerState):
    rules_present = [c for c in player.game.rules
                     if c.type is CARD_TYPE.NEW_RULE
                        and c.subtype == "BONUS"
                        and evaluate_conditions(c, player)]

    bonus = sum((d.get("play_extra", 0) for d in c.result.values()) for c in rules_present)

    return player.game.play_num + bonus


def recycle_pile(game: Game):
    cards = list(game.discard_pile)
    game.discard_pile.clear()
    random.shuffle(cards)
    game.draw_pile.extend(cards)
    events.game_deck_recycle(game)


def draw(player: PlayerState, num: int = 1) -> List[Card]:
    cards_drawn = []
    num_available = len(player.game.draw_pile)

    if num > num_available:
        events.player_draw(player, num_available)
        num -= num_available

        for i in range(num_available):
            card = player.game.draw_pile.pop()
            player.hand.append(card)
            cards_drawn.append(card)

        recycle_pile(player.game)

    events.player_draw(player, num)

    for i in range(num):
        card = player.game.draw_pile.pop()
        player.hand.append(card)
        cards_drawn.append(card)

    events.player_hand_update(player, [c.id for c in cards_drawn])
    return cards_drawn


def discard(player: PlayerState, card: Card):
    card_map = CardMapping.query.filter_by(card=card, game=player.game).one()

    container = card_map.get_container()
    container.remove(card)

    if card.type is CARD_TYPE.NEW_RULE and card_map.location is CARD_LOCATION.RULES:
        player.game.remove_rule_card(card)

        if isinstance(card.result, dict) and "game" in card.result:
            updated = {k: DEFAULT_RULES[k] for k in card.result}
            events.game_rule_update(game, updated)

    if card_map.player and card_map.player != player:
        events.player_card_discard(player, card, card_map.player, card_map.location)
    else:
        events.player_card_discard(player, card, card_map.location)


def pick_from_other_hand_index(player: PlayerState, other: PlayerState, index: int = None) -> Card:
    game = player.game
    assert player.game == other.game, "games aren't the same"

    if index is not None:
        assert 0 <= index < len(other.hand), "index out of range"
    else:
        # pick randomly
        index = randrange(len(other.hand))

    other.hand.remove(card)
    player_hand_update(other, removed_cards=[card])
    return card


def play_from_hand(player: PlayerState, card: Card, **kwargs):
    assert card in player.hand, "that card isn't in your hand"
    player.hand.remove(card)
    return play(player, card, source = CARD_LOCATION.HAND, **kwargs)


def play_from_temp_hand(player: PlayerState, card: Card, **kwargs):
    assert card in player.hand, "that card isn't in your temporary hand"
    player.temp_hand.remove(card)
    return play(player, card, CARD_LOCATION.TEMP_HAND, **kwargs)


def play_from_discard(player: PlayerState, card: Card, **kwargs):
    game = player.game
    assert card in game.discard_pile, "that card isn't in the discard pile"
    game.discard_pile.remove(card)
    game_discard_remove(player.game, card)
    return play(player, card, CARD_LOCATION.DISCARD, **kwargs)


def play_from_other_hand_index(player: PlayerState, other: PlayerState, index: int = None, **kwargs):
    card = pick_from_other_hand_index(player, other, index)
    source = other
    return play(player, card, other, **kwargs)


def play(player: PlayerState, card: Card, source: Optional[Union[PlayerState, CARD_LOCATION]], **kwargs):
    if source is CARD_LOCATION.TEMP_HAND:
        assert player.temp_plays_remaining > 0, "no more temp hand plays remaining"
        player.temp_plays_remaining -= 1
    else:
        assert player.plays_remaining > 0, "no more plays remaining"
        player.plays_remaining -= 1

    db.session.add(player)
    game = player.game

    if card.type is CARD_TYPE.KEEPER:
        player.keepers.append(card)
        db.session.add(player)
    elif card.type is CARD_TYPE.NEW_RULE:
        to_replace = game.apply_rule_card(card)

        if to_replace:
            discard(player, to_replace)

        if isinstance(card.result, dict) and "game" in card.result:
            events.game_rule_update(game, card.result["game"])

        game.rules.append(card)
        db.session.add(game)
    elif card.type is CARD_TYPE.GOAL:
        # TODO: handle Double Agenda
        game.goals[:] = [card]
        db.session.add(game)

    events.player_card_play(player, card, source)

    if card.type is CARD_TYPE.ACTION:
        return execute_action(player, card, **kwargs)


def execute_action(player: PlayerState, card: Card, **kwargs):
    pass


def start_game(game: Game):
    #assert game.started is None, "already started"

    player_count = len(game.player_states)
    assert game.min_players <= player_count <= game.max_players, "bad player count"
    assert game.initial_dealt * player_count < len(game.draw_pile), "not enough cards"

    game.set_start()
    events.game_start(game)

    for player in game.player_states:
        draw(player, game.initial_dealt)

    start_turn(game.current_player)


def start_turn(player: PlayerState):
    player.plays_remaining = compute_num_plays(player)
    db.session.add(player)

    events.player_turn_begin(player)

    initial_draw_num = compute_num_to_draw(player)
    draw(player, initial_draw_num)


def end_turn(player: PlayerState):
    game = player.game

    assert player == game.current_player, "not your turn to end"
    assert (game.keeper_limit is None or
            len(player.keepers) <= game.keeper_limit), "you have too many keepers, discard some first"
    assert (game.hand_limit is None or
            len(player.hand) <= game.hand_limit), "you have too many cards in hand, discard some first"

    player.game.turn_number += 1
    start_turn(game.current_player)
