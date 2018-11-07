from flask import session, request, make_response
from flask_restful import Api, Resource, reqparse, abort
from typing import Optional

from .api import get_game, get_user, get_card
from .db_models import db, ActiveUser, Game
from . import events, gamelogic

rest_api = Api()
_resources = {}


def resp_204():
    resp = make_response('', 204)
    resp.headers['Content-Length'] = 0
    return resp


def reg_resource(*args, **kwargs):
    def deco(cls):
        rest_api.add_resource(cls, *args, **kwargs)
        return cls

    return deco


def validate_game_id(game_id):
    if game_id in (None, ""):
        return
    elif isinstance(game_id, str):
        if game_id.lower() == '@current':
            return game_id.lower()
        elif game_id.isnumeric():
            return int(game_id)
    elif not isinstance(game_id, int):
        abort(400, message="invalid game ID (must be '@current' or numeric)")


def validate_player_id(player_id):
    if player_id in (None, ""):
        return
    elif isinstance(player_id, str):
        if player_id.lower() == '@me':
            return player_id.lower()
        elif game_id.isnumeric():
            return int(player_id)
    elif not isinstance(game_id, int):
        abort(400, message="invalid player ID (must be '@me' or numeric)")


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

        if username == "":
            abort(400, message="username can't be blank")

        active_user = get_user()

        if not active_user:
            return self.post()

        if active_user.username == username:
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

        username = args['username']

        if username == "":
            abort(400, message="username can't be blank")

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
        elif active_user.game:
            abort(409, message="you must leave your game first")

        events.user_logout(active_user)
        db.session.delete(active_user)
        db.session.commit()
        session.clear()

        return resp_204()


# TODO: refactor list out of individual resources
# @reg_resource("/games", "/games/")
# class GamesList(Resource):
#     def get(self):
#         
#     def 


@reg_resource("/games", "/games/", "/games/<string:game_id>", "/games/<string:game_id>/players/<string:player_id>")
class GameResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('free_join', type=bool, default=False, nullable=False)
    parser.add_argument('max_players', type=int, default=6, nullable=False)
    parser.add_argument('host', type=int, default=None, nullable=False)

    def _validate_params(self, game_id: Optional[str], player_id: Optional[str]):
        game_id = validate_game_id(game_id)
        player_id = validate_player_id(player_id)
        return game_id, player_id

    def get(self, game_id: str = None, player_id: str = None):
        if game_id is None:
            return [g.to_json() for g in Game.query.all()]

        game_id, player_id = self._validate_params(game_id, player_id)
        game = get_game(game_id)

        if game:
            return game.to_json(full=True)
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
        elif game_id and (game_id == '@current' or user.game and game_id == user.game.id):
            resp["message"] = "requested to join current game, no change"
        elif user.game:
            abort(409, message="you must leave your current game before creating or joining another")
        elif game_id and player_id:
            game = get_game(game_id)

            if len(game.players) >= game.max_players:
                abort(409, message="that game is already full")
            elif game.in_progress and not game.free_join:
                abort(409, message="that game has already started and isn't taking new players")
            else:
                game.players.append(user)
                db.session.add(game)
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
        elif user.game != game:
            abort(403, message="can't leave or delete a game you're not in")
        elif game.host != user and player_id not in (user.id, '@me'):
            abort(401, message="you must be the host to delete a game or player")
        elif player_id in (None, game.host_id):  # delete on game or self as host
            if len(game.players) > 1:
                abort(409, message="you must delegate another host before leaving")

            events.game_remove(game)
            # db.session.delete(user.game_state)  # not needed, game delete cascades
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

            events.game_user_leave(game, player, kick=kick)
            db.session.delete(player.game_state)
            db.session.commit()

        return resp_204()


@reg_resource("/games/<string:game_id>/start")
class StartGameResource(Resource):
    def post(self, game_id: str):
        game_id = validate_game_id(game_id)

        user = get_user()
        game = get_game(game_id)

        if not user:
            abort(401, message="you must be logged in to start a game")
        elif not game:
            abort(404, message="game not found")
        elif game.host != user:
            abort(401, message="you must be the host to start the game")

        try:
            gamelogic.start_game(game)
        except AssertionError as e:
            if e.args:
                abort(400, message=e.args[0])
            else:
                abort(400)

        return {"message": "ok"}


@reg_resource("/games/<string:game_id>/players/<string:player_id>/hand/<string:card_id>")
class HandCardResource(Resource):
    "Represents a player hand. card_id can be the card's ID or @random"
    def delete(self, game_id: str, player_id: str, card_id: str):
        player_id = validate_player_id(player_id)
        user = get_user()
        game = get_game(validate_game_id(game_id))
        card = get_card(card_id)

        if not user:
            abort(401, message="you must be logged in to start a game")
        elif not game:
            abort(404, message="game not found")
        elif user.game != game:
            abort(401, message="you must be in that game to have a hand")
        elif player_id not in (user.id, '@me'):
            abort(401, message="you can only discard cards from your own hand")
        elif not card_id and card and card in user.game_state.hand:
            abort(404, message="card not found")

        try:
            gamelogic.discard(user.game_state, card)
        except AssertionError as e:
            if e.args:
                abort(400, message=e.args[0])
            else:
                abort(400)


@reg_resource("/games/<string:game_id>/discard_pile")
class DiscardResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('card_id', type=int, default=None, nullable=False)

    def get(self, game_id: str):
        "shows the discard pile"
        game = get_game(game_id)
        return [c.id for c in game.discard_pile]


@reg_resource("/games/<string:game_id>/play")
class PlayResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('card_id', type=str, default=None, nullable=False)

    def post(self, game_id: str):
        "plays a card"
        user = get_user()
        game = get_game(validate_game_id(game_id))
        card_id = self.parser.parse_args()["card_id"]
        card = get_card(card_id)

        if not user:
            abort(401, message="you must be logged in to start a game")
        elif not game:
            abort(404, message="game not found")
        elif not card:
            abort(404, message="card not found")
        elif user.game != game:
            abort(401, message="you must be in that game to draw a card")

        try:
            return gamelogic.play_from_hand(user.game_state, card)
        except AssertionError as e:
            if e.args:
                abort(400, message=e.args[0])
            else:
                abort(400)



@reg_resource("/games/<string:game_id>/draw_pile/@top")
class DrawResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('num', type=int, default=1, nullable=True)

    def get(self, game_id: str):
        "draws a card"
        user = get_user()
        game = get_game(validate_game_id(game_id))

        if not user:
            abort(401, message="you must be logged in to start a game")
        elif not game:
            abort(404, message="game not found")
        elif user.game != game:
            abort(401, message="you must be in that game to draw a card")

        try:
            num = self.parser.parse_args()["num"]
            return [c.id for c in gamelogic.draw(user.game_state, num)]
        except AssertionError as e:
            if e.args:
                abort(400, message=e.args[0])
            else:
                abort(400)

