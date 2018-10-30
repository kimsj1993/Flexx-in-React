import os

from flask_session import Session

from fluxxapp import app
from fluxxapp.db_models import db
from fluxxapp.api import api
from fluxxapp.socket import socketio

db_uri = os.environ.get("DATABASE_URI")
assert db_uri, "Database URI (DATABASE_URI) isn't set."
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", "CHANGEME")
app.config['SESSION_TYPE'] = 'sqlalchemy'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_SQLALCHEMY'] = db

# app.config['SESSION_COOKIE_DOMAIN'] = 'fluxx.d.calebj.io'
app.config['APPLICATION_ROOT'] = '/api/'
app.config['SESSION_COOKIE_PATH'] = '/'


if __name__ == '__main__':
    db.app = app
    db.init_app(app)

    # flask_session needs db initialized, but registers its own model
    # so must come before create_all()
    Session(app)

    db.create_all()
    db.session.commit()

    api.app = app
    api.init_app(app)

    socketio.init_app(app)
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
