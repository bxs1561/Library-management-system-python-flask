from flask import Flask
from flask_restful import Resource, Api
from db.users import rebuild_tables
from api.users_api import AdminApi

app = Flask(__name__)
api = Api(app)
api.add_resource(AdminApi, '/admin')


if __name__ == '__main__':
    rebuild_tables()
    app.run(debug=True)
