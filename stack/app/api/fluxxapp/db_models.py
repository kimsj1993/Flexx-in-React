from flask_sqlalchemy import SQLAlchemy

import enum

import sqlalchemy
from sqlalchemy import (Column, Integer, String, Enum, ForeignKey, Float,
                        DateTime, Boolean, Numeric)
from sqlalchemy.schema import UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, composite, backref
from sqlalchemy.ext.hybrid import hybrid_property

from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlite3 import Connection as SQLite3Connection

from .db_utils import ModelFactoryRegistry
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
            old_value = getattr(self, key)
            if old_value != value:
                old_values[key] = old_value

            setattr(self, key, value)

        return old_values


class Game(db.Model, UpdatableMixin):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    created = db.Column(db.DateTime, nullable=False, server_default=func.now())
    started = db.Column(db.DateTime, nullable=True)

    # in_progress = db.Column(db.Boolean, nullable=False, server_default="0")
    free_join = db.Column(db.Boolean, nullable=False, server_default="0")
    join_password = db.Column(db.String(64), nullable=True)
    min_players = db.Column(db.SmallInteger, nullable=False, server_default="2")
    max_players = db.Column(db.SmallInteger, nullable=False, server_default="6")

    host_id = db.Column(db.Integer, db.ForeignKey("active_users.id"), nullable=False, index=True)
    host = db.relationship("ActiveUser", foreign_keys=[host_id])

    @hybrid_property
    def in_progress(self):
        return self.started != None

    def to_json(self, include_children: bool = False):
        ret = {
            "id": self.id,
            "created": self.created.timestamp(),
            "started": self.started and self.started.timestamp(),
            "free_join": self.free_join,
            "has_password": self.join_password is not None,
            "min_players": self.min_players,
            "max_players": self.max_players,
        }

        if include_children:
            ret["host"] = self.host.to_json()
            ret["players"] = [u.to_json() for u in self.players]
        else:
            ret["host_id"] = self.host.id
            ret["player_ids"] = [u.id for u in self.players]

        return ret


class Session(db.Model):
    __tablename__ = "sessions"

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(255), unique=True)
    data = db.Column(db.LargeBinary)
    expiry = db.Column(db.DateTime)

    user = db.relationship("ActiveUser", uselist=False)

    def __init__(self, session_id, data, expiry):
        self.session_id = session_id
        self.data = data
        self.expiry = expiry

    def __repr__(self):
        return '<Session data %s>' % self.data


class ActiveUser(db.Model, UpdatableMixin):
    __tablename__ = "active_users"

    id = db.Column(db.Integer, db.ForeignKey(Session.id, ondelete="CASCADE"), primary_key=True)
    session = db.relationship(Session, uselist=False)
    username = db.Column(db.String(64), unique=True, nullable=False, index=True)

    current_game_id = db.Column(db.Integer, db.ForeignKey("games.id"), nullable=True, index=True)
    current_game = db.relationship("Game", backref=db.backref("players", lazy=False), foreign_keys=[current_game_id], post_update=True)

    def to_json(self, include_children: bool = False) -> dict:
        ret = {
            "id": self.id,
            "username": self.username,
        }

        if self.current_game:
            if include_children:
                ret["game"] = self.current_game.to_json()
            else:
                ret["game_id"] = self.current_game_id

        return ret

    def __repr__(self):
        return "<ActiveUser %r>" % self.username


class GameRules(db.Model, UpdatableMixin):
    __tablename__ = "game_rules"
    id = db.Column(db.Integer, db.ForeignKey("games.id", ondelete="cascade"), primary_key=True)

    play_num = db.Column(db.Integer, nullable=True)
    draw_num = db.Column(db.Integer, nullable=True)
    keeper_limit = db.Column(db.Integer, nullable=True)
    hand_limit = db.Column(db.Integer, nullable=True)


class CARD_KIND(enum.Enum):
    BASE = "BASE"
    ACTION = "ACTION"
    KEEPER = "KEEPER"
    NEW_RULE = "NEW_RULE"


class Card(db.Model):
    __tablename__ = "base_cards"
    id = db.Column(db.Integer, primary_key=True)
    kind = db.Column(db.Enum(CARD_KIND), index=True, nullable=False)
    name = db.Column(db.String(32))
    description = db.Column(db.String(256))
    image_url = db.Column(db.String(256))

    __mapper_args__ = {
        "polymorphic_on": kind,
        "polymorphic_identity": CARD_KIND.BASE
    }


class KeeperCard(Card):
    __mapper_args__ = {
        "polymorphic_identity": CARD_KIND.KEEPER
    }


class ActionCard(Card):
    __mapper_args__ = {
        "polymorphic_identity": CARD_KIND.ACTION
    }


class NewRuleCard(Card):
    __mapper_args__ = {
        "polymorphic_identity": CARD_KIND.NEW_RULE
    }
