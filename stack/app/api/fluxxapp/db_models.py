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

from .db_utils import ModelFactoryRegistry, aug_association_proxy
from .session import session as flask_session


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


class CARD_TYPE(enum.Enum):
    BASE     = "BASE"
    GOAL     = "GOAL"
    ACTION   = "ACTION"
    KEEPER   = "KEEPER"
    NEW_RULE = "NEW_RULE"


class Card(db.Model, UpdatableMixin):
    __tablename__ = "base_cards"

    id = db.Column(db.String(32), primary_key=True)
    name = db.Column(db.String(32), nullable=False)
    type = db.Column(db.Enum(CARD_TYPE), index=True, nullable=False)
    subtype = db.Column(db.String(32), index=True, nullable=True)

    description = db.Column(db.String(256))
    image_url = db.Column(db.String(256))

    precondition = db.Column(db.JSON)
    result = db.Column(db.JSON)

    __mapper_args__ = {
        "polymorphic_on": type,
        "polymorphic_identity": CARD_TYPE.BASE
    }

    def to_json(self):
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


class CARD_LOCATION(enum.Enum):
    DISCARD = "DISCARD"
    HAND = "HAND"
    PILE = "PILE"
    TABLE = "TABLE"


class CardMapping(db.Model):
    __tablename__ = "card_mapping"

    card_id = db.Column(db.String(32), db.ForeignKey(Card.id, ondelete="CASCADE"), nullable=False, index=True,  primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id", ondelete="CASCADE"), nullable=False, index=True, primary_key=True)

    location = db.Column(db.Enum(CARD_LOCATION), nullable=False, index=True, default=CARD_LOCATION.PILE)
    position = db.Column(db.Integer, nullable=False, index=True)
    turn_played = db.Column(db.Integer, nullable=True, index=True)

    player_id = db.Column(db.Integer, db.ForeignKey("active_users.id"), nullable=True, index=True)

    card = relationship(Card)
    game = relationship("Game")

    __table_args__ = (
        # Ensure there is only one of each card per game
        # NOTE: sqlite doesn't support deferred constraints!
        #UniqueConstraint(game_id, card_id, deferrable=True, initially="DEFERRED"),
    )


class Game(db.Model, UpdatableMixin):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created = db.Column(db.DateTime, nullable=False, server_default=func.now())
    started = db.Column(db.DateTime, nullable=True)

    # in_progress = db.Column(db.Boolean, nullable=False, server_default="0")
    free_join = db.Column(db.Boolean, nullable=False, server_default="0")
    join_password = db.Column(db.String(64), nullable=True)

    min_players = db.Column(db.SmallInteger, nullable=False, server_default="2")
    max_players = db.Column(db.SmallInteger, nullable=False, server_default="6")

    host_id = db.Column(db.Integer, db.ForeignKey("active_users.id"), nullable=False, index=True)
    host = db.relationship("ActiveUser", foreign_keys=[host_id])

    turn_direction = db.Column(db.SmallInteger, nullable=False, server_default="1")
    turn_number = db.Column(db.Integer, nullable=False, server_default="0")

    # rules

    play_num = db.Column(db.Integer, nullable=False, server_default="1")
    draw_num = db.Column(db.Integer, nullable=False, server_default="1")

    keeper_limit = db.Column(db.Integer, nullable=True)
    hand_limit = db.Column(db.Integer, nullable=True)

    @hybrid_property
    def in_progress(self):
        return self.started != None

    @hybrid_property
    def current_player(self):
        if self.players:
            return self.players[self.turn_number % len(self.players)]

    player_states = db.relationship(
        "PlayerState",
        order_by=lambda: PlayerState.position,
        collection_class=ordering_list('position'),
        cascade="save-update, merge, delete, delete-orphan",
        uselist=True
    )

    players = association_proxy('player_states', 'player',
                                creator=lambda p: PlayerState(player=p))

    _card_mappings = relationship(CardMapping, cascade="save-update, merge, delete, delete-orphan")

    discard_pile_cards = relationship(
        CardMapping,
        order_by=CardMapping.position,
        collection_class=ordering_list('position'),
        primaryjoin=(CardMapping.game_id == id) & (CardMapping.location == CARD_LOCATION.DISCARD),
        cascade="save-update, merge, delete, delete-orphan"
    )

    discard_pile = association_proxy('discard_pile_cards', 'card',
                                     creator=lambda c: CardMapping(card=c, location=CARD_LOCATION.DISCARD))

    draw_pile_cards = relationship(
        CardMapping,
        order_by=CardMapping.position,
        collection_class=ordering_list('position'),
        primaryjoin=(CardMapping.game_id == id) & (CardMapping.location == CARD_LOCATION.PILE),
        cascade="save-update, merge, delete, delete-orphan"
    )

    draw_pile = association_proxy('draw_pile_cards', 'card',
                                  creator=lambda c: CardMapping(card=c, location=CARD_LOCATION.PILE))

    table_cards = relationship(
        CardMapping,
        order_by=CardMapping.position,
        collection_class=ordering_list('position'),
        primaryjoin=(CardMapping.game_id == id) & (CardMapping.player_id == None) & (CardMapping.location == CARD_LOCATION.TABLE),
        cascade="save-update, merge, delete, delete-orphan"
    )

    table = association_proxy('table_cards', 'card',
                              creator=lambda c: CardMapping(card=c, location=CARD_LOCATION.TABLE))

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
                "player_states"  : [ps.to_json() for ps in self.player_states],
                "play_num"       : self.play_num,
                "draw_num"       : self.draw_num,
                "keeper_limit"   : self.keeper_limit,
                "hand_limit"     : self.hand_limit,
                "current_player" : self.current_player.id,

                "discard_pile"   : [c.id for c in self.discard_pile],
                "table_cards"    : [c.id for c in self.table],
                "draw_pile_size" : len(self.draw_pile)
            })

        return ret


class Session(db.Model):
    __tablename__ = "sessions"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    session_id = db.Column(db.String(255), unique=True)
    data = db.Column(db.LargeBinary)
    expiry = db.Column(db.DateTime)

    user = db.relationship("ActiveUser", uselist=False, cascade="save-update, merge, delete, delete-orphan")

    def __init__(self, session_id, data, expiry):
        self.session_id = session_id
        self.data = data
        self.expiry = expiry

    def __repr__(self):
        return '<Session data %s>' % self.data


class ActiveUser(db.Model, UpdatableMixin):
    __tablename__ = "active_users"

    id = db.Column(db.Integer, db.ForeignKey(Session.id, ondelete="CASCADE"), primary_key=True, autoincrement=True)
    session = db.relationship(Session, uselist=False)
    username = db.Column(db.String(64), unique=True, nullable=False, index=True)

    game = db.relationship(Game, secondary="player_state", uselist=False)
    game_state = db.relationship("PlayerState", uselist=False, cascade="save-update, merge, delete, delete-orphan")

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
    __mapper_args__ = {'confirm_deleted_rows': False}

    game_id = db.Column(db.Integer, db.ForeignKey(Game.id, ondelete="CASCADE"), primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey(ActiveUser.id, ondelete="CASCADE"), primary_key=True, unique=True)
    position = db.Column(db.Integer, nullable=False, index=True)

    game = db.relationship(Game, lazy=False, uselist=False)
    player = db.relationship(ActiveUser, lazy=False, uselist=False)

    _card_mappings = relationship(
        CardMapping,
        primaryjoin=(CardMapping.game_id == foreign(game_id)) & (CardMapping.player_id == foreign(player_id)),
        cascade="save-update, merge, delete, delete-orphan",
        single_parent=True
    )

    hand_cards = relationship(
        CardMapping,
        order_by=CardMapping.position,
        collection_class=ordering_list('position'),
        primaryjoin=(CardMapping.game_id == foreign(game_id))\
                    & (CardMapping.player_id == foreign(player_id))
                    & (CardMapping.location == CARD_LOCATION.HAND),
        uselist=True
    )

    hand = aug_association_proxy('hand_cards', 'card',
                                 creator=lambda p, c: CardMapping(card=c, player_id=p.player_id, game_id=p.game_id, location=CARD_LOCATION.HAND))

    table_cards = relationship(
        CardMapping,
        order_by=CardMapping.position,
        collection_class=ordering_list('position'),
        primaryjoin=(CardMapping.game_id == foreign(game_id)) & (CardMapping.player_id == foreign(player_id)) & (CardMapping.location == CARD_LOCATION.TABLE),
        uselist=True
    )

    table = aug_association_proxy('table_cards', 'card',
                                  creator=lambda p, c: CardMapping(card=c, player_id=p.player_id, game_id=p.game_id, location=CARD_LOCATION.TABLE))

    def to_json(self, full: bool = False):
        ret = {
            "player_id" : self.player_id,
            "table" : [c.id for c in self.table],
            "position" : self.position
        }

        if full:
            ret["hand"] = [c.id for c in self.hand]
        else:
            ret["hand_size"] = len(self.hand)

        return ret
