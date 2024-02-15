from flask_restful import Resource, reqparse, request
import json
from flask import json
from datetime import datetime, timedelta
from db import users
class AdminApi(Resource):
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
            dictionary["session_key"] = data[10]
        admin_data.append(dictionary)

        return admin_data
