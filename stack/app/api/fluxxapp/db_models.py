from flask_sqlalchemy import SQLAlchemy


import sqlalchemy
from sqlalchemy import (Column, Integer, String, Enum, ForeignKey, Float,
                        DateTime, Boolean, Numeric)
from sqlalchemy.schema import UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, composite, backref

from sqlalchemy import event
from sqlalchemy.engine import Engine
from sqlite3 import Connection as SQLite3Connection

from .db_utils import ModelFactoryRegistry


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

    # in_progress = db.Column(db.Boolean, nullable=False, server_default='0')
    free_join = db.Column(db.Boolean, nullable=False, server_default='0')
    join_password = db.Column(db.String(64), nullable=True)
    min_players = db.Column(db.SmallInteger, nullable=False, server_default='2')
    max_players = db.Column(db.SmallInteger, nullable=False, server_default='6')

    host_id = db.Column(db.Integer, db.ForeignKey("active_users.id"), nullable=False, index=True)
    host = db.relationship("ActiveUser", foreign_keys=[host_id])

    def to_json(self, include_children: bool = False):
        ret = {
            "id": self.id,
            "created": self.created.timestamp(),
            "started": self.started and self.started.timestamp(),
            "free_join": self.free_join,
            "has_password": self.join_password is not None,
            "min_players": self.min_players,
            "max_players": self.max_players,
            "host": self.host.to_json(),
        }

        if include_children:
            ret["players"] = [u.to_json() for u in self.players]

        return ret


class ActiveUser(db.Model, UpdatableMixin):
    __tablename__ = "active_users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False, index=True)

    current_game_id = db.Column(db.Integer, db.ForeignKey("games.id"), nullable=True, index=True)
    current_game = db.relationship("Game", backref=db.backref("players", lazy=False), foreign_keys=[current_game_id], post_update=True)

    def to_json(self, include_children: bool = False) -> dict:
        ret = {
            "id": self.id,
            "username": self.username,
        }

        if self.current_game and include_children:
            ret["game"]: self.current_game.to_json()

        return ret

    def __repr__(self):
        return "<ActiveUser %r>" % self.username
