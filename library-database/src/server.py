from flask import Flask
from flask_restful import Resource, Api
from db.users import rebuild_tables
from api.users_api import GetPaymentApi,ApprovePaymentApi,PaymentApi,GetStudentsApi,UsersApi,UsersApiPost, UserApiLogin,EditApiUser,AdminApiRegister,RemoveUserApi,AdminApi,GetCheckOutApi,CheckOutBookPost,GetLoginReport,GetRecommendationBook,PostChatbotApi,GetCheckOutSingleApi
from api.books_api import BookApiGet,BookApiPost,BooksApiEdit,RemoveBookApi,PopulateBookApi
from flask_cors import CORS
from api.users_api import dbs
from dotenv import load_dotenv
import os


app = Flask(__name__)
load_dotenv()
CORS(app)  # Enable CORS for all routes
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://swen344:YyeSTqWAZIGYHIkjaYgvyhypN0zBXyTT@dpg-cpt2f0iju9rs73ak2bdg-a.oregon-postgres.render.com/library_khd3"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://swen344:Godisgreat+123@localhost:5433/Library'

dbs.init_app(app)  # Initialize SQLAlchemy with the Flask app

api = Api(app)

api.add_resource(UsersApi, '/users')
api.add_resource(UsersApiPost,'/user/add')
api.add_resource(AdminApi,'/user/<string:role_type>')

api.add_resource(UserApiLogin,'/user/login')
api.add_resource(EditApiUser,'/user/<int:user_id>')
api.add_resource(RemoveUserApi,'/user/<int:user_id>')


api.add_resource(AdminApiRegister,'/admin/add')
api.add_resource(BookApiGet, '/books')
api.add_resource(BookApiPost,'/book/add')
api.add_resource(BooksApiEdit,'/book/edit/<int:book_id>')
api.add_resource(RemoveBookApi,'/book/<int:book_id>')
api.add_resource(GetCheckOutApi,'/books/checkout')
api.add_resource(CheckOutBookPost,'/checkout-book')
api.add_resource(PopulateBookApi,'/popular-book')
api.add_resource(GetLoginReport,'/weekly-report')
api.add_resource(GetRecommendationBook,'/recommendations/<int:user_id>')
api.add_resource(PostChatbotApi,'/chatbot')
api.add_resource(GetCheckOutSingleApi,"/checkout/<int:user_id>")
api.add_resource(PaymentApi,"/payment")
api.add_resource(GetStudentsApi,'/users/students')
api.add_resource(ApprovePaymentApi,'/approve/<int:payment_id>')
api.add_resource(GetPaymentApi,"/get/payments")





if __name__ == '__main__':
    # rebuild_tables()
    app.run(host='0.0.0.0',debug=True, port=5000)
