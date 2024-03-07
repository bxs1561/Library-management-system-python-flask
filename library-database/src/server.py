from flask import Flask
from flask_restful import Resource, Api
from db.users import rebuild_tables
from api.users_api import UsersApi,UsersApiPost, UserApiLogin, RemoveUserApi
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

api = Api(app)

api.add_resource(UsersApi, '/users')
api.add_resource(UsersApiPost,'/user/add')
api.add_resource(UserApiLogin,'/user/login')
api.add_resource(RemoveUserApi,'/user/<int:user_id>')


if __name__ == '__main__':
    rebuild_tables()
    app.run(debug=True, port=5000)
