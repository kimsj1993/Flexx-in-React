from .db_models import db, ActiveUser, Game
from flask import session
from flask_socketio import emit, send, close_room, join_room, leave_room, disconnect


def broadcast_emit(*args, **kwargs):
    return emit(*args, namespace='/', broadcast=True, **kwargs)


def user_update(user: ActiveUser, **old_values):
    broadcast_emit("user_update", {"user": user.to_json()})


def user_login(user: ActiveUser):
    broadcast_emit("user_login", {"user_id": user.id})


# only called from logout request
def user_logout(user: ActiveUser):
    disconnect(sid=session.sid, namespace='/')
    broadcast_emit("user_logout", {"user_id": user.id})


def game_create(game: Game):
    join_room(f"game_{game.id}", sid=session.sid, namespace='/')
    broadcast_emit("game_create", {"game": game.to_json()})


def game_user_join(game: Game, user: ActiveUser):
    join_room(f"game_{game.id}", sid=session.sid, namespace='/')
    broadcast_emit("game_user_join", {"game_id": game.id, "user_id": user.id})


def game_user_leave(game: Game, user: ActiveUser, kick=False):
    broadcast_emit("game_user_leave", {"game_id": game.id, "user_id": user.id, "kick": kick})


def game_update(game: Game, **old_values):
    broadcast_emit("game_update", {"game": game.to_json()})


def game_remove(game: Game):
    broadcast_emit("game_remove", {"game_id": game.id})
