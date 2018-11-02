from flask import session, current_app
from typing import Optional

from .db_models import db, ActiveUser, Game

def get_user(create=False, **kwargs) -> Optional[ActiveUser]:
    user_id = session.get("user_id")

    if user_id is not None:
        active_user = ActiveUser.query.filter_by(id=user_id).one_or_none()

        if active_user:
            return active_user

    if create:
        sa_session = current_app.session_interface.flush_session(current_app, session)
        active_user = ActiveUser(session=sa_session, **kwargs)
        db.session.add(active_user)
        db.session.commit()
        session["user_id"] = active_user.id

        return active_user


def get_game(game_id: Optional[str] = None, create=False, **kwargs) -> Optional[Game]:
    if game_id in (None, "@current"):
        user_id = session.get("user_id")

        if user_id is None:
            return None

        flt = ActiveUser.id == user_id
    else:
        flt = Game.id == game_id

    game = Game.query.filter(flt).one_or_none()

    if game:
        return game

    if create:
        host = kwargs.pop("host", get_user())
        game = Game(host=host, **kwargs)
        host.current_game = game
        db.session.add(game)
        db.session.add(host)
        db.session.commit()

        return game
