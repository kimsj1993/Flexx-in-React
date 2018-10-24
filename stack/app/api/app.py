import os
from flask import Flask, session
from flask_restful import Api
from flask_session import Session
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy

from fluxxapp.db_models import register_models
from fluxxapp.routes import register_routes
from fluxxapp.socket import register_handlers

app = Flask(__name__)

db_uri = os.environ.get("SQLALCHEMY_DATABASE_URI")
assert db_uri, "Database URI (SQLALCHEMY_DATABASE_URI) isn't set."
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", "CHANGEME")
app.config['SESSION_TYPE'] = 'sqlalchemy'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_SQLALCHEMY'] = db = SQLAlchemy(app)

Api(app)
Session(app)
socketio = SocketIO(app, manage_session=False)

register_models(db)
db.create_all()
db.session.commit()

register_routes(app)
register_handlers(socketio)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
