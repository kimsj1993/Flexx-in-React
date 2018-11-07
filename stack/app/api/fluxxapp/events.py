from typing import Optional, Union

from flask import session, request
from flask_socketio import emit, send, close_room, join_room, leave_room, disconnect

from .api import get_user
from .db_models import db, ActiveUser, Game, PlayerState, Card
from .enums import CARD_LOCATION, CARD_TYPE, CARD_TYPE_LOC_MAP
from .socket import (
    socketio,
    global_emit,
    game_emit,
    user_emit,
    disconnect_user,
    user_join_room,
    user_leave_room,
    game_sync,
)

# User events (global)


def user_update(user: ActiveUser, **old_values):
    global_emit({"e": "USER_UPDATE", "user": user.to_json()})


def user_login(user: ActiveUser):
    global_emit({"e": "USER_LOGIN", "user": user.to_json()})


# only called from logout request
def user_logout(user: ActiveUser):
    disconnect_user(user)
    global_emit({"e": "USER_LOGOUT", "user": user.to_json()})


# Game events (global and game scope)


def game_create(game: Game):
    global_emit({"e": "GAME_CREATE", "game": game.to_json()})


def game_start(game: Game):
    game_emit({"e": "GAME_START", "game_id": game.id})


def game_user_join(game: Game, user: ActiveUser):
    user_join_room(f"game_{game.id}", user)
    global_emit({"e": "GAME_USER_JOIN", "game_id": game.id, "user_id": user.id})
    game_sync(game, user)


def game_user_leave(game: Game, user: ActiveUser, kick=False):
    user_leave_room(f"game_{game.id}", user)

    global_emit({"e": "GAME_USER_LEAVE", "game_id": game.id, "user_id": user.id, "kick": kick})


def game_update(game: Game, **old_values):
    global_emit({"e": "GAME_UPDATE", "game": game.to_json()})


def game_remove(game: Game):
    close_room(f"game_{game.id}", namespace="/")
    global_emit({"e": "GAME_REMOVE", "game_id": game.id})


def game_deck_recycle(game: Game):
    game_emit({"e": "DECK_RECYCLE", "game_id": game.id, "draw_pile_size": len(game.draw_pile)})


def game_discard_remove(game: Game, card: Card):
    game_emit({"e": "DISCARD_REMOVE", "game_id": game.id, "card_id": card.id})


def game_rule_update(game: Game, rules: dict):
    game_emit({"e": "RULES_UPDATE", "game_id": game.id, "rules": rules})


def player_draw(player: PlayerState, num_drawn: int):
    if num_drawn:
        game_emit(
            {
                "e": "CARDS_DRAWN",
                "game_id"   : player.game.id,
                "player_id" : player.player_id,
                "num_drawn" : num_drawn,
            }
        )

# Player events (in-game)

def player_turn_begin(player: PlayerState):
    game_emit({
        "e": "TURN_BEGIN",
        "player_id" : player.player_id,
        "plays_remaining" : player.plays_remaining
    })


def player_hand_update(player: PlayerState, new_cards=(), removed_cards=()):
    payload = {"e": "HAND_UPDATE", "hand": [c.id for c in player.hand]}

    if new_cards:
        payload["new_cards"] = list(new_cards)

    if removed_cards:
        payload["removed_cards"] = list(removed_cards)

    user_emit(payload)


def player_card_play(
    player: PlayerState,
    card: Card,
    source: Union[CARD_LOCATION, PlayerState] = CARD_LOCATION.HAND,
    dest: CARD_LOCATION = None,
):
    if dest is None:
        dest = CARD_TYPE_LOC_MAP[card.type]

    payload = {"e": "CARD_PLAY", "player_id": player.player_id, "card": card.id, "to": dest.name}

    if isinstance(source, PlayerState):
        payload.update({"from": CARD_LOCATION.HAND.name, "from_player": source.player_id})
    else:
        payload["from"] = source.name

    game_emit(payload)


def player_card_discard(
    player: PlayerState,
    card: Card,
    source: Union[CARD_LOCATION, PlayerState] = CARD_LOCATION.HAND,
    source_loc: Optional[CARD_LOCATION] = None,
):
    payload = {
        "e": "CARD_DISCARD",
        "player_id": player.player_id,
        "card": card.id,
    }

    if isinstance(source, PlayerState):
        payload.update({"from": source_loc or CARD_LOCATION.HAND.name, "from_player": source.player_id})
    else:
        payload["from"] = source.name

    game_emit(payload)
