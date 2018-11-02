from collections import defaultdict
from flask import session, request, current_app
from flask_socketio import SocketIO, disconnect, emit, send, join_room, leave_room, rooms
from typing import Optional

from .api import get_user, get_game
from .db_models import ActiveUser, Game

socketio = SocketIO(manage_session=False)
CID_SID_MAP = {}  # socket SID -> flask session ID mapping
SID_CID_MAP = defaultdict(lambda: set())  # flask session ID -> set of socket SIDs


def global_emit(*args, **kwargs):
    return socketio.emit("global", *args, namespace="/", room="global", **kwargs)


def game_emit(*args, game: Optional[Game] = None, **kwargs):
    if game is None:
        user = get_user()
        game = user.current_game

    if game:
        return socketio.emit("game", *args, namespace="/", room=f"game_{game.id}", **kwargs)


def user_emit(*args, user: Optional[ActiveUser] = None, **kwargs):
    sid = (user and user.session.session_id) or session.sid

    if sid:
        return socketio.emit("user", *args, namespace="/", room=sid, **kwargs)


def disconnect_user(user: Optional[ActiveUser] = None):
    sid = (user and user.session.session_id) or session.sid

    for ssid in SID_CID_MAP[sid].copy():
        socketio.disconnect(sid=ssid, namespace="/")


def user_join_room(room: str, user: Optional[ActiveUser] = None):
    sid = (user and user.session.session_id) or session.sid

    for ssid in SID_CID_MAP[sid].copy():
        join_room(room, sid=ssid, namespace="/")


def user_leave_room(room: str, user: Optional[ActiveUser] = None):
    sid = (user and user.session.session_id) or session.sid

    for ssid in SID_CID_MAP[sid].copy():
        leave_room(room, sid=ssid, namespace="/")


@socketio.on("connect")
def on_connect():
    user = get_user()

    if not user:
        return False  # not logged in

    # room shared by all of a user's connections
    join_room(session.sid)
    join_room("global")

    if user.current_game:
        join_room(room=f"game_{user.current_game.id}")

    # populate connection SID in user SID mappings
    SID_CID_MAP[session.sid].add(request.sid)
    CID_SID_MAP[request.sid] = session.sid

    games = [g.to_json() for g in Game.query.all()]
    users = [u.to_json() for u in ActiveUser.query.all()]

    emit("user", {"e": "HELLO", "games": games, "users": users})


@socketio.on("disconnect")
def on_disconnect():
    SID_CID_MAP[session.sid].discard(request.sid)
    CID_SID_MAP.pop(request.sid, None)

    # cleanup if the connection is the last one
    if not SID_CID_MAP[session.sid]:
        SID_CID_MAP.pop(session.sid)
