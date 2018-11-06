import csv
from flask import session, current_app
import json
from pathlib import Path
from random import shuffle
from typing import Optional, Union

from .db_models import db, ActiveUser, Game, Card
from .enums import CARD_TYPE


def load_cards_csv(path: Union[Path, str]):
    present_cards = {c.id: c for c in Card.query.all()}
    csv_cards = set()

    if isinstance(path, str):
        path = Path(path)

    keys = ("id", "name", "description", "image_url", "subtype")
    type_key = "type"
    json_map = {"TRUE": True, "FALSE": False, "NULL": None, "": None}
    json_keys = ("precondition", "result")
    bool_keys = ("exclusive",)

    with path.open() as f:
        reader = csv.DictReader(f)

        for row in reader:
            card_id = row["id"]
            csv_cards.add(card_id)
            ud = {k: (row.get(k) or None) for k in keys}
            ud[type_key] = CARD_TYPE(row[type_key].upper())

            for jk in json_keys:
                jv = row.get(jk, "")

                if jv in json_map:
                    jv = json_map[jv]
                else:
                    jv = json.loads(jv)

                ud[jk] = jv

            for bk in bool_keys:
                bv = row.get(bk, "")
                ud[bk] = bv.strip().lower() == "true"

            if card_id in present_cards:
                card = present_cards[card_id]
                card.update(**ud)
            else:
                card = Card(**ud)

            db.session.add(card)

    for outlier in set(present_cards) - csv_cards:
        db.session.delete(present_cards[outlier])

    db.session.commit()


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

        flt = Game.players.any(id=user_id)
    else:
        flt = Game.id == game_id

    game = Game.query.filter(flt).one_or_none()

    if game:
        return game

    if create:
        host = kwargs.pop("host", get_user())
        game = Game(host=host, players=[host], **kwargs)

        cards = Card.query.all()
        shuffle(cards)
        game.draw_pile.extend(cards)

        host.current_game = game
        db.session.add(game)
        db.session.add(host)
        db.session.commit()

        return game


def get_card(card_id) -> Optional[Card]:
    return Card.query.filter_by(id=card_id).one_or_none()
