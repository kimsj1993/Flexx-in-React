from flask import session
from flask_socketio import SocketIO, emit, send, join_room, leave_room

from .api import get_user, get_game

socketio = SocketIO(manage_session=False)


@socketio.on('connect')
def on_connect():
    user = get_user()

    if not user:
        return False  # not logged in

    game = user.current_game

    if game:
        join_room(f"game_{game.id}")

    emit('hello')
