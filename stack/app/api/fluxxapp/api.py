from flask import session, request, make_response
from flask_restful import Api, Resource, reqparse, abort
from typing import Optional

from .db_models import db, ActiveUser, Game
from . import events

api = Api()
_resources = {}


def resp_204():
    resp = make_response('', 204)
    resp.headers['Content-Length'] = 0
    return resp


def reg_resource(*args, **kwargs):
    def deco(cls):
        api.add_resource(cls, *args, **kwargs)
        return cls

    return deco


def get_user(create=False, **kwargs) -> Optional[ActiveUser]:
    user_id = session.get("user_id")

    if user_id is not None:
        active_user = ActiveUser.query.filter_by(id=user_id).one_or_none()

        if active_user:
            return active_user

    if create:
        active_user = ActiveUser(**kwargs)
        db.session.add(active_user)
        db.session.commit()
        session["user_id"] = active_user.id

        return active_user


def get_game(game_id: Optional[str] = None, create=False, **kwargs) -> Optional[Game]:
    if game_id in (None, '@current'):
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
        host = kwargs.pop('host', get_user())
        game = Game(host=host, **kwargs)
        host.current_game = game
        db.session.add(game)
        db.session.add(host)
        db.session.commit()

        return game


@reg_resource("/session")
class SessionResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', type=str, required=True, nullable=False)

    def get(self):
        resp = {}
        active_user = get_user()

        if active_user:
            resp["user"] = active_user.to_json(include_children=True)

        return resp

    def put(self):
        resp = {}

        args = self.parser.parse_args()
        username = args['username']

        active_user = get_user()

        if not active_user:
            return self.post()

        if active_user.username == args["username"]:
            resp["message"] = "username not changed"
        else:
            existing_user = ActiveUser.query.filter_by(**args).one_or_none()

            if existing_user:
                abort(409, message="that username is already in use")

            old_username = active_user.username
            active_user.username = username
            db.session.add(active_user)
            db.session.commit()
            resp["message"] = "username updated"

            events.user_update(active_user, username=old_username)

        resp["user"] = active_user.to_json(include_children=True)

        return resp

    def post(self):
        resp = {}
        args = self.parser.parse_args()
        active_user = get_user()

        if active_user:
            abort(409, message="already logged in, use PUT to update")
        else:
            existing_user = ActiveUser.query.filter_by(**args).one_or_none()

            if existing_user:
                abort(409, message="that username is already in use")

            active_user = get_user(create=True, **args)
            events.user_login(active_user)

        resp["user"] = active_user.to_json(include_children=True)

        return resp, 201

    def delete(self):
        active_user = get_user()

        if not active_user:
            abort(400, message="not logged in, can't log out")
        elif active_user.current_game:
            abort(409, message="you must leave your game first")

        events.user_logout(active_user)
        db.session.delete(active_user)
        db.session.commit()
        session.clear()

        return resp_204()


@reg_resource("/games", "/games/", "/games/<string:game_id>", "/games/<string:game_id>/players/<string:player_id>")
class GameResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('free_join', type=bool, default=False, nullable=False)
    parser.add_argument('max_players', type=int, default=6, nullable=False)
    parser.add_argument('host', type=int, default=None, nullable=False)

    def _validate_params(self, game_id: Optional[str], player_id: Optional[str]):
        if game_id is None:
            pass
        elif isinstance(game_id, str):
            if game_id.lower() == '@current':
                game_id = game_id.lower()
            elif game_id.isnumeric():
                game_id = int(game_id)
        elif not isinstance(game_id, int):
            abort(400, message="invalid game ID (must be '@current' or numeric)")

        if player_id is None:
            pass
        elif isinstance(player_id, str):
            if player_id.lower() == '@me':
                player_id = player_id.lower()
            elif game_id.isnumeric():
                player_id = int(player_id)
        elif not isinstance(game_id, int):
            abort(400, message="invalid player ID (must be '@me' or numeric)")

        return game_id, player_id

    def get(self, game_id: str = None, player_id: str = None):
        if game_id is None:
            return [g.to_json(include_children=True) for g in Game.query.all()]

        game_id, player_id = self._validate_params(game_id, player_id)
        game = get_game(game_id)

        if game:
            return game.to_json(include_children=True)
        else:
            abort(404, message="game not found")

    def post(self, game_id: str = None, player_id: str = None):
        resp = {}
        user = get_user()
        game_id, player_id = self._validate_params(game_id, player_id)
        game = None

        if not user:
            abort(401, message="you must be logged in to create or join a game")
        elif game_id and not player_id:
            abort(400, message="use PUT to update game settings")
        elif player_id not in (None, '@me', user.id):
            abort(403, message="you can only add yourself to games")
        elif game_id and game_id in ('@current', user.current_game_id):
            resp["message"] = "requested to join current game, no change"
        elif user.current_game:
            abort(409, message="you must leave your current game before creating or joining another")
        elif game_id and player_id:
            game = get_game(game_id)

            if len(game.players) >= game.max_players:
                abort(409, message="that game is already full")
            elif game.in_progress and not game.free_join:
                abort(409, message="that game has already started and isn't taking new players")
            else:
                user.current_game = game
                db.session.add(user)
                db.session.commit()
        else:
            args = self.parser.parse_args()

            if args.pop("host") not in (None, user.id, "@me"):
                abort(400, message="cannot create a game with another player as host")

            game = get_game(create=True, host=get_user(), **args)
            events.game_create(game)

        if game:
            events.game_user_join(game, user)
            resp["game"] = game.to_json(include_children=True)

        return resp

    def put(self, game_id: str = None, player_id: str = None):
        if game_id is None:
            return self.post(game_id, player_id)

        resp = {}
        game_id, player_id = self._validate_params(game_id, player_id)
        game = get_game(game_id)
        user = get_user()

        if not user:
            abort(401, message="you must be logged in to update a game")
        elif not game:
            abort(404, message="game not found")
        elif player_id:
            return self.post(game_id, player_id)
        elif game.host != user:
            abort(403, message="you can only update games where you are the host")

        args = self.parser.parse_args()
        new_host_id = args.pop("host")
        players = {p.id: p for p in game.players}

        if new_host_id == user.id:
            abort(400, message="you're already the host")
        elif new_host_id and new_host_id not in players:
            abort(409, message=f"new host ID {new_host_id} isn't in this game")
        elif new_host_id:
            args["host"] = players[new_host_id]

        old_values = game.update(**args)

        if old_values:
            db.session.add(game)
            db.session.commit()
            events.game_update(game, **old_values)
            resp["message"] = "game updated OK"
        else:
            resp["message"] = "nothing to update"

        resp["game"] = game.to_json(include_children=True)
        return resp

    def delete(self, game_id: str = None, player_id: str = None):
        game_id, player_id = self._validate_params(game_id, player_id)
        user = get_user()
        game = get_game(game_id)

        if not game_id:
            abort(400, message="game ID is required")
        elif not user:
            abort(401, message="you must be logged in to delete a game or player")
        elif not game:
            abort(404, message="game not found")
        elif user.current_game != game:
            abort(403, message="can't leave or delete a game you're not in")
        elif game.host != user and player_id not in (user.id, '@me'):
            abort(401, message="you must be the host to delete a game or player")
        elif player_id in (None, game.host_id):  # delete on game or self as host
            if len(game.players) > 1:
                abort(409, message="you must delegate another host before leaving")

            user.current_game_id = None
            events.game_remove(game)
            db.session.add(user)
            db.session.delete(game)
            db.session.commit()
        else:
            kick = player_id not in (user.id, '@me')

            if kick:
                players = {p.id: p for p in game.players}
                player = players.get(player_id)
                if not player:
                    abort(404, message=f"player id {player_id} isn't in this game")
            else:
                player = user

            player.current_game_id = None
            events.game_user_leave(game, player, kick=kick)
            db.session.add(player)
            db.session.commit()

        return resp_204()
