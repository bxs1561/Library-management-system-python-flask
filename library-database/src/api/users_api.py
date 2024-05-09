from flask_restful import Resource, reqparse, request
import json
from flask import json, jsonify
from datetime import datetime, timedelta
from db import users

parser = reqparse.RequestParser()

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

dbs = SQLAlchemy()

# Define your models
class Users(dbs.Model):
    __tablename__ = 'users'
    user_id = dbs.Column(dbs.Integer, primary_key=True)
    first_name = dbs.Column(dbs.String(50))
    last_name = dbs.Column(dbs.String(50))
    username = dbs.Column(dbs.String(50))
    password = dbs.Column(dbs.Text)  # Consider using a password hashing algorithm for security
    date_of_birth = dbs.Column(dbs.Date)
    address = dbs.Column(dbs.String(255))
    phone_number = dbs.Column(dbs.String(15))
    email = dbs.Column(dbs.String(255))
    user_image_url=dbs.Column(dbs.String(255))
    role_id = dbs.Column(dbs.Integer, dbs.ForeignKey('roles.role_id'))
    user_status_id = dbs.Column(dbs.Integer, dbs.ForeignKey('user_status.id'))
    session_key = dbs.Column(dbs.Text)

    role = dbs.relationship('Roles', backref='users')
    user_status = dbs.relationship('UserStatus', backref='users')

    def serialize(self):
        return {
            'user_id': self.user_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'password': self.password,
            'date_of_birth': str(self.date_of_birth),
            'address': self.address,
            'phone_number': self.phone_number,
            'email': self.email,
            'user_image_url':self.user_image_url,
            'role': self.role.serialize(),  # Include related role data
            'user_status': self.user_status.serialize(),  # Include related user status data
            'session_key': self.session_key
        }

class Roles(dbs.Model):
    __tablename__ = 'roles'
    role_id = dbs.Column(dbs.Integer, primary_key=True)
    name = dbs.Column(dbs.String(50))

    def serialize(self):
        return {
            'role_id': self.role_id,
            'name': self.name
        }

class UserStatus(dbs.Model):
    __tablename__ = 'user_status'
    id = dbs.Column(dbs.Integer, primary_key=True)
    status_value = dbs.Column(dbs.Boolean)

    def serialize(self):
        return {
            'id': self.id,
            'status_value': self.status_value
        }
class UsersApi(Resource):
    def get(self):
        users = Users.query.all()
        return jsonify([user.serialize() for user in users])

        # serialized_users=[user.serialize() for user in users]
        # return jsonify({'success': True, 'users': serialized_users})


        # admin_data = []
        # for data in users.list_admin():
        #     dictionary = dict()
        #     dictionary["user_id"] = data[0]
        #     dictionary["FirstName"] = data[1]
        #     dictionary["LastName"] = data[2]
        #     dictionary["username"] = data[3]
        #     dictionary["password"] = data[4]
        #     dictionary["DateOfBirth"] = str(data[5])
        #     dictionary["Address"] = data[6]
        #     dictionary["PhoneNumber"] = data[7]
        #     dictionary["Email"] = data[8]
        #     dictionary["RoleID"] = data[9]
        #     dictionary["user_status_id"] = data[10]
        #     dictionary["session_key"] = data[11]
        #     admin_data.append(dictionary)
        #
        # return admin_data
class AdminApi(Resource):
    def get(self,role_type):
        role = Roles.query.filter_by(name=role_type).first()
        users = Users.query.filter_by(role_id=role.role_id).all()
        return jsonify([user.serialize() for user in users])

class UsersApiPost(Resource):
    def post(self):
        parser.add_argument('first_name', type=str)
        parser.add_argument('user_image_url', type=str)
        parser.add_argument('last_name', type=str)
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('date_of_birth', type=str)
        parser.add_argument('address', type=str)
        parser.add_argument('phone_number', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('role_name', type=str)

        args = parser.parse_args()
        first_name = args['first_name']
        user_image_url = args['user_image_url']
        last_name = args['last_name']
        username = args['username']
        password = args['password']
        date_of_birth = args['date_of_birth']
        address = args['address']
        phone_number = args['phone_number']
        email = args['email']
        role_name = args['role_name']
        user = users.add_users(first_name, last_name, date_of_birth, username, password, address, phone_number, email,
                               user_image_url, role_name)
        return jsonify(user)

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

class AdminApiRegister(Resource):
    def post(self):
        # parser.add_argument('user_id', type=int)
        parser.add_argument('first_name', type=str)
        parser.add_argument('last_name', type=str)
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('phone_number', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('user_image_url', type=str)


        args = parser.parse_args()
        # user_id = args['user_id']
        first_name = args['first_name']
        last_name = args['last_name']
        username = args['username']
        password = args['password']
        phone_number = args['phone_number']
        email = args['email']
        user_image_url=args['user_image_url']

        user=users.add_admin_register(first_name, last_name, username, password, phone_number, email,user_image_url)
        return user


class UserApiLogin(Resource):
    def post(self):
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()
        email = args['email']
        password = args['password']
        user = users.login_users(email, password)
        # print(user)
        return jsonify(user)

class EditApiUser(Resource):
    def put(self, id):
        """Edit users information"""
        args = parser.parse_args()
        session_key = request.headers.get('Session')
        first_name = args['first_name']
        last_name = args['last_name']
        username = args['username']
        date_of_birth = args['date_of_birth']
        address = args['address']
        phone_number = args['phone_number']
        email = args['email']
        user_edit = users.edit_user(id,first_name,username, last_name,date_of_birth,phone_number,email, address, session_key)
        if not user_edit is False:
            return user_edit
        else:
            return 'authentication failed'

class RemoveUserApi(Resource):
    def delete(self,user_id):
        """Delete user information"""
        session_key = request.headers.get('Session')
        delete_user = users.remove_user_account(user_id,session_key)
        return delete_user

class CheckOutBookPost(Resource):
    def post(self):
        parser.add_argument('title', type=str)
        parser.add_argument('checkout_date', type=str)
        parser.add_argument('due_date', type=str)
        parser.add_argument('student_name', type=str)
        # parser.add_argument('librarian_id', type=int)


        args = parser.parse_args()
        # user_id = args['user_id']
        title = args['title']
        checkout_date = args['checkout_date']
        due_date = args['due_date']
        student_name = args['student_name']
        # librarian_id = args['librarian_id']

        checkout_book=users.checkout_book(title, checkout_date, due_date)
        return checkout_book




class Checkout(dbs.Model):
    __tablename__ = 'checkout'

    checkout_id = dbs.Column(dbs.Integer, primary_key=True)
    student_id = dbs.Column(dbs.Integer, dbs.ForeignKey('student.student_id'))  # Foreign key referencing Student table
    librarian_id = dbs.Column(dbs.Integer, dbs.ForeignKey('librarian.librarian_id'))
    book_id = dbs.Column(dbs.Integer, dbs.ForeignKey('books.book_id'))
    checkout_date = dbs.Column(dbs.Date)
    due_date = dbs.Column(dbs.Date)
    return_date = dbs.Column(dbs.Date)
    borrow_days = dbs.Column(dbs.Integer)

    # Define relationships
    student = dbs.relationship("Student", backref="checkout")
    librarian = dbs.relationship("Librarian", backref="checkout")
    book = dbs.relationship("Books", backref="checkout")

    def serialize(self):
        return {
            'checkout_id': self.checkout_id,
            'student': self.student.serialize(),
            'librarian':self.librarian.serialize() if self.librarian else None,
            'books': self.book.serialize(),
            'checkout_date': self.checkout_date.isoformat() if self.checkout_date else None,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'return_date': self.return_date.isoformat() if self.return_date else None,
            'borrow_days': self.borrow_days
        }



class Student(dbs.Model):
    __tablename__ = 'student'

    student_id = dbs.Column(dbs.Integer, primary_key=True)
    user_id = dbs.Column(dbs.Integer, dbs.ForeignKey('users.user_id'))  # Foreign key referencing Users table
    fine_balance = dbs.Column(dbs.Integer)
    membership_expiry_date = dbs.Column(dbs.Date)

    # Define relationship
    users = dbs.relationship("Users", backref="student")

    def serialize(self):
        return {
            'student_id': self.student_id,
            'user': self.users.serialize(),
            'fine_balance': self.fine_balance,
            'membership_expiry_date': self.membership_expiry_date.isoformat() if self.membership_expiry_date else None
        }

# Define the librarian table
class Librarian(dbs.Model):
    __tablename__ = 'librarian'

    librarian_id = dbs.Column(dbs.Integer, primary_key=True)
    hire_date = dbs.Column(dbs.Date)
    user_id = dbs.Column(dbs.Integer, dbs.ForeignKey('users.user_id'))  # Foreign key referencing Users table

    # Define relationship
    users = dbs.relationship("Users", backref="librarian")

    def serialize(self):
        return {
            'librarian_id': self.librarian_id,
            'hire_date': self.hire_date.isoformat() if self.hire_date else None,
            'user': self.users.serialize()
        }


# Define the books table
class Books(dbs.Model):
    __tablename__ = 'books'

    book_id = dbs.Column(dbs.Integer, primary_key=True)
    isbn = dbs.Column(dbs.String(13), unique=True)
    title = dbs.Column(dbs.String(255))
    genre = dbs.Column(dbs.String(255))
    publication_year = dbs.Column(dbs.String(255))
    publisher = dbs.Column(dbs.String(255))
    language = dbs.Column(dbs.String(255))
    copies_available = dbs.Column(dbs.Integer)
    total_copies = dbs.Column(dbs.Integer)
    location = dbs.Column(dbs.String(50))
    cover_image_url = dbs.Column(dbs.String(255))
    availability_status = dbs.Column(dbs.String(50))
    rating = dbs.Column(dbs.String(50))
    review = dbs.Column(dbs.String(50))

    # Define relationship

    def serialize(self):
        return {
            'book_id': self.book_id,
            'ISBN': self.isbn,
            'title': self.title,
            'genre': self.genre,
            'publication_year': self.publication_year,
            'publisher': self.publisher,
            'language': self.language,
            'copies_available': self.copies_available,
            'total_copies': self.total_copies,
            'location': self.location,
            'cover_image_url': self.cover_image_url,
            'availability_status': self.availability_status,
            'rating': self.rating,
            'review': self.review
        }


class GetCheckOutApi(Resource):
    def get(self):
        checkouts = Checkout.query.all()
        return jsonify([checkout.serialize() for checkout in checkouts])


class GetLoginReport(Resource):
    def get(self):
        report = []
        for date, count in users.weekly_login_report().items():
            date_str = date.strftime('%Y-%m-%d')
            dictionary = dict()
            dictionary['date'] = date_str
            dictionary['count'] = count
            report.append(dictionary)
        return report


