from .db_models import db, ActiveUser, Game
from flask import session
from flask_socketio import emit, send, close_room, join_room, leave_room, disconnect


def global_emit(*args, **kwargs):
    return emit(*args, namespace="/", room="global", **kwargs)


def user_update(user: ActiveUser, **old_values):
    global_emit("user_update", {"user": user.to_json()})


def user_login(user: ActiveUser):
    global_emit("user_login", {"user": user.to_json()})


# only called from logout request
def user_logout(user: ActiveUser):
    disconnect(sid=session.sid, namespace="/")
    global_emit("user_logout", {"user": user.to_json()})


def game_create(game: Game):
    global_emit("game_create", {"game": game.to_json()})


def game_user_join(game: Game, user: ActiveUser):
    join_room(f"game_{game.id}", sid=session.sid, namespace="/")
    global_emit("game_user_join", {"game_id": game.id, "user_id": user.id})


def game_user_leave(game: Game, user: ActiveUser, kick=False):
    global_emit("game_user_leave", {"game_id": game.id, "user_id": user.id, "kick": kick})


def game_update(game: Game, **old_values):
    global_emit("game_update", {"game": game.to_json()})


def game_remove(game: Game):
    close_room(f"game_{game.id}")
    global_emit("game_remove", {"game_id": game.id})
