from typing import Optional

from flask import session, request
from flask_socketio import emit, send, close_room, join_room, leave_room, disconnect

from .api import get_user
from .db_models import db, ActiveUser, Game
from .socket import (socketio, global_emit, game_emit, user_emit,
                     disconnect_user, user_join_room, user_leave_room,
                     game_sync)


def user_update(user: ActiveUser, **old_values):
    global_emit({"e": "USER_UPDATE", "user": user.to_json()})


def user_login(user: ActiveUser):
    global_emit({"e": "USER_LOGIN", "user": user.to_json()})


# only called from logout request
def user_logout(user: ActiveUser):
    disconnect_user(user)
    global_emit({"e": "USER_LOGOUT", "user": user.to_json()})


def game_create(game: Game):
    global_emit({"e": "GAME_CREATE", "game": game.to_json()})


def game_start(game: Game):
    game_emit({"e": "GAME_START", "game": game.to_json(full=True)})


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
