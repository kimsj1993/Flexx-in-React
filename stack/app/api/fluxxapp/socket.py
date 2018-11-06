from collections import defaultdict
from flask import session, request, current_app
from flask_socketio import SocketIO, disconnect, emit, send, join_room, leave_room, rooms
from typing import Optional

from .api import get_user, get_game
from .db_models import ActiveUser, Game, Card

socketio = SocketIO(manage_session=False)
CID_SID_MAP = {}  # socket SID -> flask session ID mapping
SID_CID_MAP = defaultdict(lambda: set())  # flask session ID -> set of socket SIDs


def global_emit(*args, event="global", **kwargs):
    return socketio.emit(event, *args, namespace="/", room="global", **kwargs)


def game_emit(*args, event="game", game: Optional[Game] = None, **kwargs):
    if game is None:
        user = get_user()
        game = user.game

    if game:
        return socketio.emit(event, *args, namespace="/", room=f"game_{game.id}", **kwargs)


def user_emit(*args, event="user", user: Optional[ActiveUser] = None, **kwargs):
    sid = (user and user.session.session_id) or session.sid

    if sid:
        return socketio.emit(event, *args, namespace="/", room=sid, **kwargs)


def disconnect_user(user: Optional[ActiveUser] = None):
    sid = (user and user.session.session_id) or session.sid

    for ssid in SID_CID_MAP[sid].copy():
        disconnect(sid=ssid, namespace="/")


def user_join_room(room: str, user: Optional[ActiveUser] = None):
    sid = (user and user.session.session_id) or session.sid

    for ssid in SID_CID_MAP[sid].copy():
        join_room(room, sid=ssid, namespace="/")


def user_leave_room(room: str, user: Optional[ActiveUser] = None):
    sid = (user and user.session.session_id) or session.sid

    for ssid in SID_CID_MAP[sid].copy():
        leave_room(room, sid=ssid, namespace="/")


def game_sync(game: Game, user: ActiveUser):
    user_emit({"e": "GAME_SYNC", "game": game.to_json(full=True), "state": user.game_state.to_json(full=True)})


@socketio.on("connect")
def on_connect():
    user = get_user()

    if not user:
        return False  # not logged in

    # populate connection SID in user SID mappings
    SID_CID_MAP[session.sid].add(request.sid)
    CID_SID_MAP[request.sid] = session.sid

    # collect HELLO information
    games = [g.to_json() for g in Game.query.all()]
    users = [u.to_json() for u in ActiveUser.query.all()]
    cards = [u.to_json(full=True) for u in Card.query.all()]

    # room shared by all of a user's connections
    join_room(session.sid)
    join_room("global")

    emit("user", {"e": "HELLO", "games": games, "users": users, "cards": cards})

    # send game sync
    if user.game:
        join_room(room=f"game_{user.game.id}")
        game_sync(user.game, user)


@socketio.on("disconnect")
def on_disconnect():
    SID_CID_MAP[session.sid].discard(request.sid)
    CID_SID_MAP.pop(request.sid, None)

    # cleanup if the connection is the last one
    if not SID_CID_MAP[session.sid]:
        SID_CID_MAP.pop(session.sid)
