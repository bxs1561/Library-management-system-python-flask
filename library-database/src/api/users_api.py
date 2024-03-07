from flask_restful import Resource, reqparse, request
import json
from flask import json, jsonify
from datetime import datetime, timedelta
from db import users

parser = reqparse.RequestParser()


# class UsersApi(Resource):
#     def get(self):
#         admin_data = []
#         for data in users.list_admin():
#             print(data)
#             dictionary = dict()
#             dictionary["user_id"] = data[0]
#             dictionary["FirstName"] = data[1]
#             dictionary["LastName"] = data[2]
#             dictionary["username"] = data[3]
#             dictionary["password"] = data[4]
#             dictionary["DateOfBirth"] = str(data[5])
#             dictionary["Address"] = data[6]
#             dictionary["PhoneNumber"] = data[7]
#             dictionary["Email"] = data[8]
#             dictionary["RoleID"] = data[9]
#             dictionary["user_status_id"] = data[10]
#             dictionary["session_key"] = data[11]
#             admin_data.append(dictionary)
#
#         return admin_data
class UsersApi(Resource):
    def get(self):
        users_data=[]
        for data in users.list_admin():
            users_data.append(
                {'user_id': data[0], 'FirstName': data[1], 'LastName': data[2],'username':data[3],'password':data[4],
                 'DateOfBirth':str(data[5]),"Address": data[6], 'PhoneNumber':data[7],'Email':data[8],
                 'Role': {'role_id': data[9], 'role_name': data[10]},
                 'member_status':{'user_status_id':data[11],'status_value':data[12]},
                 'session_key':data[13]}
            )
        return jsonify(users_data)

        # return user_data


class UsersApiPost(Resource):
    def post(self):
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
        first_name = args['first_name']
        last_name = args['last_name']
        username = args['username']
        password = args['password']
        date_of_birth = args['date_of_birth']
        address = args['address']
        phone_number = args['phone_number']
        email = args['email']
        role_id = args['role_id']
        user = users.add_users(first_name, last_name, date_of_birth, username, password, address, phone_number, email,
                               role_id)
        return user

        # try:
        #     if user == False:
        #         error_data = {'error': "user already exist"}
        #         json.dumps(error_data)
        #         return jsonify(error_data), 400
        #     else:
        #         return jsonify({'message': 'User created successfully'}), 200
        # except Exception as e:
        #     # Handle other potential errors
        #     return jsonify({'error': str(e)}), 500

        # return user


class UserApiLogin(Resource):
    def post(self):
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('role_name', type=str)
        args = parser.parse_args()
        username = args['username']
        password = args['password']
        role_name = args['role_name']
        user = users.login_users(username, password, role_name)
        # print(user)
        return user


class RemoveUserApi(Resource):
    def delete(self,user_id):
        delete_user = users.remove_users(user_id)
        return delete_user
