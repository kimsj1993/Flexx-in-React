from .db_models import db, ActiveUser, Game


def user_update(user: ActiveUser, **old_values):
    pass


def user_login(user: ActiveUser):
    pass


def user_logout(user: ActiveUser):
    pass


def game_create(game: Game):
    pass


def game_user_join(game: Game, user: ActiveUser):
    pass


def game_user_leave(game: Game, user: ActiveUser, kick=False):
    pass


def game_update(game: Game, **old_values):
    pass


def game_remove(game: Game):
    pass
