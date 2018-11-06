from flask_sqlalchemy import SQLAlchemy

import enum

import sqlalchemy
from sqlalchemy import (Column, Integer, String, Enum, ForeignKey, Float,
                        DateTime, Boolean, Numeric)
from sqlalchemy.schema import UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, composite, backref, foreign, remote
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.orderinglist import ordering_list

from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlite3 import Connection as SQLite3Connection
from typing import Optional


from .db_utils import ModelFactoryRegistry, aug_association_proxy
from .enums import CARD_LOCATION, CARD_TYPE
from .session import session as flask_session

DEFAULT = sqlalchemy.text('DEFAULT')

@event.listens_for(Engine, "connect")
def _set_sqlite_pragma(dbapi_connection, connection_record):
    if isinstance(dbapi_connection, SQLite3Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON;")
        cursor.close()


db = SQLAlchemy()
mfr = ModelFactoryRegistry()


class UpdatableMixin:
    def update(self, **kwargs) -> dict:
        old_values = {}

        for key, value in kwargs.items():
            old_value = getattr(self, key, None)
            if old_value != value:
                old_values[key] = old_value

            setattr(self, key, value)

        return old_values


class Card(db.Model, UpdatableMixin):
    __tablename__ = "base_cards"

    id = db.Column(db.String(32), primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    type = db.Column(db.Enum(CARD_TYPE), index=True, nullable=False)
    subtype = db.Column(db.String(32), index=True, nullable=True)

    exclusive = db.Column(db.Boolean, nullable=False, server_default="0")

    description = db.Column(db.String(256))
    image_url = db.Column(db.String(256))

    precondition = db.Column(db.JSON)
    result = db.Column(db.JSON)

    __mapper_args__ = {
        "polymorphic_on": type,
        "polymorphic_identity": CARD_TYPE.BASE
    }

    def to_json(self, full: bool = False):
        ret = {
            "id"   : self.id,
            "name" : self.name,
            "type" : self.type.name,
        }

        if self.subtype:
            ret["subtype"] = self.subtype

        if self.description:
            ret["description"] = self.description

        if self.image_url:
            ret["image_url"] = self.image_url

        if full:
            if self.precondition:
                ret["precondition"] = self.precondition
            if self.result:
                ret["result"] = self.result

        return ret


class KeeperCard(Card):
    __mapper_args__ = {
        "polymorphic_identity": CARD_TYPE.KEEPER
    }


class ActionCard(Card):
    __mapper_args__ = {
        "polymorphic_identity": CARD_TYPE.ACTION
    }


class GoalCard(Card):
    __mapper_args__ = {
        "polymorphic_identity": CARD_TYPE.GOAL
    }


class NewRuleCard(Card):
    __mapper_args__ = {
        "polymorphic_identity": CARD_TYPE.NEW_RULE
    }


class CardMapping(db.Model):
    __tablename__ = "card_mapping"

    card_id = db.Column(db.String(32), db.ForeignKey(Card.id, ondelete="CASCADE"), nullable=False, index=True,  primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id", ondelete="CASCADE"), nullable=False, index=True, primary_key=True)

    location = db.Column(db.Enum(CARD_LOCATION), nullable=False, index=True, default=CARD_LOCATION.DRAW_PILE)
    position = db.Column(db.Integer, nullable=False, index=True)
    turn_played = db.Column(db.Integer, nullable=True, index=True)

    player_id = db.Column(db.Integer, db.ForeignKey("active_users.id"), nullable=True, index=True)

    player = relationship("PlayerState",
                          primaryjoin="(CardMapping.player_id == foreign(PlayerState.player_id)) & "
                          "(CardMapping.game_id == foreign(PlayerState.game_id))", uselist=False)

    card = relationship(Card)
    game = relationship("Game")

    __table_args__ = (
        # Ensure there is only one of each card per game
        # NOTE: sqlite doesn"t support deferred constraints!
        #UniqueConstraint(game_id, card_id, deferrable=True, initially="DEFERRED"),
    )

    def get_container(self):
        if self.location is CARD_LOCATION.HAND:
            return self.player.hand
        elif self.location is CARD_LOCATION.DRAW_PILE:
            return self.game.draw_pile
        elif self.location is CARD_LOCATION.DISCARD:
            return self.game.discard_pile
        elif self.location is CARD_LOCATION.GOALS:
            return self.game.goals
        elif self.location is CARD_LOCATION.RULES:
            return self.game.rules
        elif self.location is CARD_LOCATION.TEMP_HAND:
            return self.player.temp_hand


class Game(db.Model, UpdatableMixin):
    __tablename__ = "games"

    DEFAULT_RULES = dict(
        keeper_limit = None,
        hand_limit  = None,
        num_goals = 1,
        play_num  = 1,
        draw_num  = 1,
        inflation = False,
        first_play_random = False,
        swap_plays_draws  = False
    )

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created = db.Column(db.DateTime, nullable=False, server_default=func.now())
    started = db.Column(db.DateTime, nullable=True)

    free_join = db.Column(db.Boolean, nullable=False, server_default="0")
    join_password = db.Column(db.String(64), nullable=True)

    min_players = db.Column(db.SmallInteger, nullable=False, server_default="1")
    max_players = db.Column(db.SmallInteger, nullable=False, server_default="6")

    host_id = db.Column(db.Integer, db.ForeignKey("active_users.id"), nullable=False, index=True)
    host = db.relationship("ActiveUser", foreign_keys=[host_id])

    turn_direction = db.Column(db.SmallInteger, nullable=False, server_default="1")
    turn_number = db.Column(db.Integer, nullable=False, server_default="0")
    initial_dealt = db.Column(db.SmallInteger, nullable=False, server_default="3")

    # Game rules

    keeper_limit = db.Column(db.SmallInteger, nullable=True)
    hand_limit = db.Column(db.SmallInteger, nullable=True)
    num_goals = db.Column(db.SmallInteger, nullable=False, server_default="1")
    play_num = db.Column(db.Integer, nullable=False, server_default="1")
    draw_num = db.Column(db.Integer, nullable=False, server_default="1")

    # Action rules

    inflation = db.Column(db.Boolean, nullable=False, server_default="0")
    first_play_random = db.Column(db.Boolean, nullable=False, server_default="0")
    swap_plays_draws = db.Column(db.Boolean, nullable=False, server_default="0")

    @hybrid_property
    def in_progress(self):
        return self.started != None

    @hybrid_property
    def current_player(self):
        if self.players:
            return self.player_states[self.turn_number % len(self.players)]

    player_states = db.relationship(
        "PlayerState",
        order_by=lambda: PlayerState.position,
        collection_class=ordering_list("position"),
        cascade="save-update, merge, delete, delete-orphan",
        uselist=True,
        back_populates="game"
    )

    players = association_proxy("player_states", "player",
                                creator=lambda p: PlayerState(player=p))

    #_card_mappings = relationship(CardMapping, cascade="save-update, merge, delete, delete-orphan", back_populates="game")

    discard_pile_cards = relationship(
        CardMapping,
        order_by=CardMapping.position,
        collection_class=ordering_list("position"),
        primaryjoin=(CardMapping.game_id == id) & (CardMapping.location == CARD_LOCATION.DISCARD),
        cascade="save-update, merge, delete, delete-orphan"
    )

    discard_pile = association_proxy("discard_pile_cards", "card",
                                     creator=lambda c: CardMapping(card=c, location=CARD_LOCATION.DISCARD))

    draw_pile_cards = relationship(
        CardMapping,
        order_by=CardMapping.position,
        collection_class=ordering_list("position"),
        primaryjoin=(CardMapping.game_id == id) & (CardMapping.location == CARD_LOCATION.DRAW_PILE),
        cascade="save-update, merge, delete, delete-orphan"
    )

    draw_pile = association_proxy("draw_pile_cards", "card",
                                  creator=lambda c: CardMapping(card=c, location=CARD_LOCATION.DRAW_PILE))

    goal_cards = relationship(
        CardMapping,
        order_by=CardMapping.position,
        collection_class=ordering_list("position"),
        primaryjoin=(CardMapping.game_id == id) & (CardMapping.player_id == None) & (CardMapping.location == CARD_LOCATION.GOALS),
        cascade="save-update, merge, delete, delete-orphan"
    )

    goals = association_proxy("goal_cards", "card",
                              creator=lambda c: CardMapping(card=c, location=CARD_LOCATION.GOALS))

    rule_cards = relationship(
        CardMapping,
        order_by=CardMapping.position,
        collection_class=ordering_list("position"),
        primaryjoin=(CardMapping.game_id == id) & (CardMapping.player_id == None) & (CardMapping.location == CARD_LOCATION.RULES),
        cascade="save-update, merge, delete, delete-orphan"
    )

    rules = association_proxy("rule_cards", "card",
                              creator=lambda c: CardMapping(card=c, location=CARD_LOCATION.RULES))

    def apply_rule_card(self, card: Card, change_table: bool = True) -> Optional[Card]:
        "returns the card that was replaced, if any"
        assert card.type is CARD_TYPE.NEW_RULE, "not a rule card"
        assert card not in self.rules, "card is already active"

        if card.exclusive:
            existing = [c for c in self.rules if c.subtype == card.subtype]
            existing = existing and existing[0] or None
        else:
            existing = None

        if existing and change_table:
            self.rules.remove(existing)

        rules = card.result.get("game", {})

        for rule, value in rules.items():
            setattr(self, rule, value)

        if change_table:
            self.rules.append(card)

        return existing

    def remove_rule_card(self, card: Card, change_table: bool = True) -> bool:
        assert card.type is CARD_TYPE.NEW_RULE, "not a rule card"

        if card not in self.rules:
            return False
        elif change_table:
            self.rules.remove(card)

        rules = card.result.get("game", {})

        for rule, value in rules.items():
            assert rule in self.DEFAULT_RULES, "missing rule default"
            default = self.DEFAULT_RULES[rule]
            setattr(self, rule, default)

        return True

    def to_json(self, include_children: bool = False, full: bool = False):
        ret = {
            "id": self.id,
            "host_id": self.host_id,
            "created": self.created.timestamp(),
            "started": self.started and self.started.timestamp(),
            "free_join": self.free_join,
            "has_password": self.join_password is not None,
            "min_players": self.min_players,
            "max_players": self.max_players,
        }

        if include_children or full:
            ret["players"] = [p.to_json() for p in self.players]
        else:
            ret["player_ids"] = [u.id for u in self.players]

        # full only sends data relevant to a *running* game
        if full:
            ret.update({
                # In-game state of players
                "player_states"     : [ps.to_json() for ps in self.player_states],
                "current_player_id" : self.current_player and self.current_player.player_id,

                # Card lists and counts
                "discard_pile"   : [c.id for c in self.discard_pile],
                "rules"          : [c.id for c in self.rules],
                "goals"          : [c.id for c in self.goals],
                "draw_pile_size" : len(self.draw_pile),

                # rules
                "play_num"       : self.play_num,
                "draw_num"       : self.draw_num,
                "num_goals"      : self.num_goals,
                "keeper_limit"   : self.keeper_limit,
                "hand_limit"     : self.hand_limit,

                # action rules
                "inflation"         : self.inflation,
                "first_play_random" : self.first_play_random,
                "swap_plays_draws"  : self.swap_plays_draws,
            })

        return ret

    def set_start(self):
        self.started = func.now()


class Session(db.Model):
    __tablename__ = "sessions"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    session_id = db.Column(db.String(255), unique=True)
    data = db.Column(db.LargeBinary)
    expiry = db.Column(db.DateTime)

    user = db.relationship("ActiveUser", uselist=False, back_populates="session")

    def __init__(self, session_id, data, expiry):
        self.session_id = session_id
        self.data = data
        self.expiry = expiry

    def __repr__(self):
        return "<Session data %s>" % self.data


class ActiveUser(db.Model, UpdatableMixin):
    __tablename__ = "active_users"

    id = db.Column(db.Integer, db.ForeignKey(Session.id, ondelete="CASCADE"), primary_key=True, autoincrement=True)
    session = db.relationship(Session, uselist=False, back_populates="user")
    username = db.Column(db.String(64), unique=True, nullable=False, index=True)

    game = db.relationship(Game, secondary="player_state", uselist=False, backref="users")
    game_state = db.relationship("PlayerState", uselist=False,
                                 cascade="save-update, merge, delete, delete-orphan",
                                 back_populates="player")

    def to_json(self, include_children: bool = False) -> dict:
        ret = {
            "id": self.id,
            "username": self.username,
        }

        if self.game:
            if include_children:
                ret["game"] = self.game.to_json()
            else:
                ret["game_id"] = self.game.id

        return ret

    def __repr__(self):
        return "<ActiveUser %r>" % self.username


class PlayerState(db.Model):
    __tablename__ = "player_state"
    __mapper_args__ = {"confirm_deleted_rows": False}

    game_id = db.Column(db.Integer, db.ForeignKey(Game.id, ondelete="CASCADE"), primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey(ActiveUser.id, ondelete="CASCADE"), primary_key=True, unique=True)
    position = db.Column(db.Integer, nullable=False, index=True)

    game = db.relationship(Game, lazy=False, uselist=False, back_populates="player_states")
    player = db.relationship(ActiveUser, lazy=False, uselist=False, back_populates="game_state")

    plays_remaining = db.Column(db.SmallInteger, nullable=False, server_default="0")
    temp_plays_remaining = db.Column(db.SmallInteger, nullable=False, server_default="0")

    # for persisting multistage plays between requests
    move_state = db.Column(db.JSON)

    #_card_mappings = relationship(
        #CardMapping,
        #primaryjoin=(CardMapping.game_id == foreign(game_id)) & (CardMapping.player_id == foreign(player_id)),
        #cascade="save-update, merge, delete, delete-orphan",
        ##back_populates="player",
        #single_parent=True
    #)

    hand_cards = relationship(
        CardMapping,
        order_by=CardMapping.position,
        collection_class=ordering_list("position"),
        primaryjoin=(CardMapping.game_id == foreign(game_id))
                     & (CardMapping.player_id == foreign(player_id))
                     & (CardMapping.location == CARD_LOCATION.HAND),
        uselist=True,
        lazy=False
    )

    hand = aug_association_proxy("hand_cards", "card",
                                 creator=lambda p, c: CardMapping(card=c, player_id=p.player_id, game_id=p.game_id, location=CARD_LOCATION.HAND))

    temp_hand_cards = relationship(
        CardMapping,
        order_by=CardMapping.position,
        collection_class=ordering_list("position"),
        primaryjoin=(CardMapping.game_id == foreign(game_id))
                     & (CardMapping.player_id == foreign(player_id))
                     & (CardMapping.location == CARD_LOCATION.TEMP_HAND),
        uselist=True, single_parent=True,
        lazy=False
    )

    temp_hand = aug_association_proxy("temp_hand_cards", "card",
                                      creator=lambda p, c: CardMapping(card=c, player_id=p.player_id, game_id=p.game_id, location=CARD_LOCATION.TEMP_HAND))


    keeper_cards = relationship(
        CardMapping,
        order_by=CardMapping.position,
        collection_class=ordering_list("position"),
        primaryjoin=(CardMapping.game_id == foreign(game_id)) & (CardMapping.player_id == foreign(player_id)) & (CardMapping.location == CARD_LOCATION.KEEPERS),
        uselist=True, single_parent=True,
        lazy=False
    )

    keepers = aug_association_proxy("keeper_cards", "card",
                                    creator=lambda p, c: CardMapping(card=c, player_id=p.player_id, game_id=p.game_id, location=CARD_LOCATION.KEEPERS))

    def to_json(self, full: bool = False):
        ret = {
            "player_id"       : self.player_id,
            "keepers"         : [c.id for c in self.keepers],
            "position"        : self.position,
            "plays_remaining" : self.plays_remaining,
            "temp_plays_remaining" : self.temp_plays_remaining,
        }

        if full:
            ret["hand"] = [c.id for c in self.hand]
            ret["temp_hand"] = [c.id for c in self.temp_hand]
        else:
            ret["hand_size"] = len(self.hand)
            ret["temp_hand_size"] = len(self.temp_hand)

        return ret
