from flask import Flask
from flask_restful import Resource, Api
from db.users import rebuild_tables
from api.users_api import UsersApi,UsersApiPost, UserApiLogin,EditApiUser,AdminApiRegister,RemoveUserApi,AdminApi,GetCheckOutApi,CheckOutBookPost
from api.books_api import BookApiGet,BookApiPost,BooksApiEdit,RemoveBookApi,PopulateBookApi
from flask_cors import CORS
from api.users_api import dbs


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://swen344:Godisgreat+123@localhost:5433/Library'
dbs.init_app(app)  # Initialize SQLAlchemy with the Flask app

api = Api(app)

api.add_resource(UsersApi, '/users')
api.add_resource(UsersApiPost,'/user/add')
api.add_resource(AdminApi,'/user/<string:role_type>')

api.add_resource(UserApiLogin,'/user/login')
api.add_resource(EditApiUser,'/user/<int:id>')
api.add_resource(RemoveUserApi,'/user/<int:user_id>')


api.add_resource(AdminApiRegister,'/admin/add')
api.add_resource(BookApiGet, '/books')
api.add_resource(BookApiPost,'/book/add')
api.add_resource(BooksApiEdit,'/book/edit/<int:book_id>')
api.add_resource(RemoveBookApi,'/book/<int:book_id>')
api.add_resource(GetCheckOutApi,'/books/checkout')
api.add_resource(CheckOutBookPost,'/checkout-book')
api.add_resource(PopulateBookApi,'/popular-book')




if __name__ == '__main__':
    # rebuild_tables()
    app.run(debug=True, port=5000)
# from flask import Flask, jsonify
# from flask_sqlalchemy import SQLAlchemy
#
# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://swen344:Godisgreat+123@localhost:5433/Library'
# db = SQLAlchemy(app)
#
# # Define your models
# class Users(db.Model):
#     __tablename__ = 'users'
#     user_id = db.Column(db.Integer, primary_key=True)
#     first_name = db.Column(db.String(50))
#     last_name = db.Column(db.String(50))
#     username = db.Column(db.String(50))
#     password = db.Column(db.Text)  # Consider using a password hashing algorithm for security
#     date_of_birth = db.Column(db.Date)
#     address = db.Column(db.String(255))
#     phone_number = db.Column(db.String(15))
#     email = db.Column(db.String(255))
#     role_id = db.Column(db.Integer, db.ForeignKey('roles.role_id'))
#     user_status_id = db.Column(db.Integer, db.ForeignKey('user_status.id'))
#     session_key = db.Column(db.Text)
#
#     role = db.relationship('Roles', backref='users')
#     user_status = db.relationship('UserStatus', backref='users')
#
#     def serialize(self):
#         return {
#             'user_id': self.user_id,
#             'first_name': self.first_name,
#             'last_name': self.last_name,
#             'username': self.username,
#             'password': self.password,
#             'date_of_birth': str(self.date_of_birth),
#             'address': self.address,
#             'phone_number': self.phone_number,
#             'email': self.email,
#             'role': self.role.serialize(),  # Include related role data
#             'user_status': self.user_status.serialize(),  # Include related user status data
#             'session_key': self.session_key
#         }
#
# class Roles(db.Model):
#     __tablename__ = 'roles'
#     role_id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50))
#
#     def serialize(self):
#         return {
#             'role_id': self.role_id,
#             'name': self.name
#         }
#
# class UserStatus(db.Model):
#     __tablename__ = 'user_status'
#     id = db.Column(db.Integer, primary_key=True)
#     status_value = db.Column(db.Boolean)
#
#     def serialize(self):
#         return {
#             'id': self.id,
#             'status_value': self.status_value
#         }
#
# # Define your API endpoints
# @app.route('/users', methods=['GET'])
# def get_users():
#     users = Users.query.all()
#     return jsonify({'users': [user.serialize() for user in users]})
#
# if __name__ == '__main__':
#     app.run(debug=True)





# class Librarian(Base):
#     __tablename__ = 'Librarian'
#     librarian_id = Column(Integer, primary_key=True)
#     hire_date = Column(Date)
#     user_id = Column(Integer, ForeignKey('Users.user_id'))
#
# class Student(Base):
#     __tablename__ = 'Student'
#     student_id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey('Users.user_id'))
#     fine_balance = Column(Integer)
#     membership_expiry_date = Column(Date)
#
# class Admin(Base):
#     __tablename__ = 'Admin'
#     admin_id = Column(Integer, primary_key=True)
#     user_id = Column(Integer, ForeignKey('Users.user_id'))
#     librarian_id = Column(Integer, ForeignKey('Librarian.librarian_id'))
#
# class Books(Base):
#     __tablename__ = 'Books'
#     book_id = Column(Integer, primary_key=True)
#     ISBN = Column(String(13), unique=True)
#     title = Column(String(255))
#     genre = Column(String(255))
#     publication_year = Column(String(255))
#     publisher = Column(String(255))
#     language = Column(String(255))
#     copies_available = Column(Integer)
#     total_copies = Column(Integer)
#     location = Column(String(50))
#     cover_image_url = Column(String(255))
#     availability_status = Column(String(50))
#     rating = Column(String(50))
#     review = Column(String(50))
#     author = Column(Text)
#
# class Checkout(Base):
#     __tablename__ = 'Checkout'
#     checkout_id = Column(Integer, primary_key=True)
#     student_id = Column(Integer, ForeignKey('Student.student_id'))
#     librarian_id = Column(Integer, ForeignKey('Librarian.librarian_id'))
#     book_id = Column(Integer, ForeignKey('Books.book_id'))
#     checkout_date = Column(Date)
#     due_date = Column(Date)
#     return_date = Column(Date)
#     borrow_days = Column(Integer)
#
# class Reservations(Base):
#     __tablename__ = 'Reservations'
#     reservation_id = Column(Integer, primary_key=True)
#     student_id = Column(Integer, ForeignKey('Student.student_id'))
#     book_id = Column(Integer, ForeignKey('Books.book_id'))
#     reservation_date = Column(Date)
