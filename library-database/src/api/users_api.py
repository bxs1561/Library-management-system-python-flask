from flask_restful import Resource, reqparse, request
import json
from flask import json
from datetime import datetime, timedelta
from db import users
parser = reqparse.RequestParser()

class UsersApi(Resource):
    def get(self):
        admin_data = []
        dictionary = dict()
        for data in users.list_admin():
            dictionary["AdminID"]=data[0]
            dictionary["FirstName"] = data[1]
            dictionary["LastName"] = data[2]
            dictionary["username"] = data[3]
            dictionary["password"] = data[4]
            dictionary["DateOfBirth"] = str(data[5])
            dictionary["Address"] = data[6]
            dictionary["PhoneNumber"] = data[7]
            dictionary["Email"] = data[8]
            dictionary["RoleID"] = data[9]
            dictionary["user_status_id"] = data[10]
            dictionary["session_key"] = data[11]
        admin_data.append(dictionary)

        return admin_data

class UsersApiPost(Resource):
    def post(self):
        parser.add_argument('user_id', type=int)
        parser.add_argument('first_name', type=str)
        parser.add_argument('last_name', type=str)
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('date_of_birth', type=str)
        parser.add_argument('address', type=str)
        parser.add_argument('phone_number', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('role_id', type=int)

        args = parser.parse_args()
        id = args['user_id']
        first_name = args['first_name']
        last_name = args['last_name']
        username = args['username']
        password = args['password']
        date_of_birth = args['date_of_birth']
        address = args['address']
        phone_number = args['phone_number']
        email = args['email']
        role_id = args['role_id']
        user=users.add_users(id, first_name, last_name, date_of_birth, username, password, address, phone_number, email,role_id)
        return user

