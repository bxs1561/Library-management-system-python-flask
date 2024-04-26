from builtins import len

from .db_utils import *
import hashlib
import secrets
from flask import jsonify
import json
from datetime import datetime, timedelta
import time



def rebuild_tables():
    """re-build the tables"""
    exec_sql_file('src/db/schema.sql')
    # exec_sql_file('src/db/data.sql')


def list_users():
    """Get the list of all admin info from database."""
    # return exec_get_all(
    # 'SELECT u.user_id, u.first_name, u.last_name, u.username, u.password, u.date_of_birth, u.address, u.phone_number, u.email, '
    # 'r.role_id,r.name AS role_name, u.user_status_id,us.status_value AS user_status_value, u.session_key '
    # 'FROM Users u, Roles r,user_status us WHERE u.role_id = r.role_id AND u.user_status_id = us.id')
    return exec_get_all(
        'SELECT user_id,first_name,last_name,username,password,date_of_birth,address,phone_number,email,role_id,user_status_id,user_image_url,session_key FROM Users')

    # return exec_get_all(
    #     'SELECT user_id,first_name,last_name,username,password,date_of_birth,address,phone_number,email,role_id,user_status_id,user_image_url,session_key FROM Users')


def getUserID(username):
    """Return the id of users from user table"""
    sql_query = 'SELECT user_id FROM Users WHERE username=%s'
    result = exec_get_one(sql_query, (username,))
    if result is not None:
        return result
    else:
        return False


def getRoleID(name):
    """Return the id of  roles"""
    sql_query = 'SELECT role_id from Roles WHERE name=%s'
    result = exec_get_one(sql_query, (name,))
    if result is not None:
        return result
    else:
        return False


def getRoleName(role_id):
    """Return name of roles given role_id"""
    sql_query = 'SELECT name from Roles WHERE role_id=%s'
    result = exec_get_one(sql_query, (role_id,))
    if result is not None:
        return result
    else:
        return False


def add_admin_register(first_name, last_name, username, password, phone_number, email, user_image_url):
    """Add admin user"""

    # Check if any of the required fields are empty
    if not all([first_name, last_name, username, password, phone_number, email]):
        return json.dumps({"success": False, "message": "Please provide all required fields"})

    local_user_id = getUserID(username)
    role_id = getRoleID('admin')
    if local_user_id:
        return json.dumps({"success": False, "message": "User already exists"})
        # return False
    else:

        try:
            sql = """INSERT INTO user_status (status_value) VALUES (False)
                    RETURNING id"""

            encode_password = password.encode('utf-8')
            hashed_password = hashlib.sha512(encode_password).hexdigest()
            sql_query = """INSERT INTO users(first_name, last_name, username, password, phone_number, email,user_image_url,user_status_id,role_id)
                                    VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
            locked = exec_commit_return(sql)
            exec_commit(sql_query, (
                first_name, last_name, username, hashed_password, phone_number,
                email, user_image_url, locked, role_id))
            return json.dumps({"success": True, "message": "User added successfully"})
            # return True
        except Exception as e:
            return json.dumps({"success": False, "message": "An error occurred"})


def add_users(first_name, last_name, date_of_birth, username, password, address, phone_number, email,
              user_image_url, role_name):
    """Add users to database"""
    try:
        local_user_id = getUserID(username)
        role_id = getRoleID(role_name)
        if not role_id:
            data = {"success": False, "message": "Please fill out this fields"}
            return data
        STUDENT_ROLE_ID = getRoleName(role_id)
        LIBRARIAN_ROLE_ID = getRoleName(role_id)
        # Check if any of the required fields are empty
        if not all([first_name, last_name, date_of_birth, username, password, phone_number, email]):
            data = {"success": False, "message": "Please fill out this fields"}
            return data

        if local_user_id:
            data = {"success": False, "message": "User already exists"}
            return data
        # Check if the role is valid (student or librarian)

        # if role_id not in [STUDENT_ROLE_ID, LIBRARIAN_ROLE_ID]:
        #     data = {"success": False, "message": "Invalid role. Please provide a valid role (student or librarian)"}
        #     return data

        else:
            encode_password = password.encode('utf-8')
            hashed_password = hashlib.sha512(encode_password).hexdigest()
            sql_lock = """
                      INSERT INTO user_status (status_value)
                      VALUES (False) RETURNING id ;
                    """
            locked = exec_commit_return(sql_lock)

            sql_query = """INSERT INTO users(first_name,last_name,username,password,date_of_birth,address,phone_number,email,user_image_url,user_status_id,role_id)
                            VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
            exec_commit(sql_query, (
                first_name, last_name, username, hashed_password, date_of_birth, address, phone_number,
                email, user_image_url, locked,
                role_id))
            data = {"success": True, "message": "User added successfully"}
            return data

    except Exception as e:
        data = {"success": False, "message": "An error occurred"}
        return data


def login_users(email, password):
    """Return session key if user exist and make login successfully
    otherWise return error message
    """
    if email is None or password is None:
        data = {"success": False, 'error': "Email or password is missing"}
        return data

    if len(email) == 0 or len(password) == 0:
        data = {"success": False, 'error': "Please fill in both the email and password"}
        return data

    if len(email) > 0 and len(password) > 0:
        encode_password = password.encode('utf-8')
        hashed_password = hashlib.sha512(encode_password).hexdigest()
        sql_query = 'SELECT user_id,first_name,last_name,username,password,date_of_birth,address,phone_number,email,role_id FROM users WHERE email=%s AND password=%s'
        result = exec_get_all(sql_query, (email, hashed_password))
        if len(result) > 0:
            user_id, first_name, last_name, username, _, _, _, _, _, role_id = result[0]
            role_name = getRoleName(role_id)[0]
            session_key = secrets.token_hex(512)
            sql_update = 'UPDATE users SET session_key = %s WHERE email=%s'
            exec_commit(sql_update, (session_key, username))
            data = {'success': True, 'session_key': session_key, 'message': 'login successfully', 'user': {
                'user_id': user_id, 'username': username, 'user_role': role_name
            }}
            return data
        else:
            data = {"success": False, 'error': 'login failed'}
            return data
    else:
        data = {"success": False, 'error': 'login failed'}
        return data


def validate_session_key(session_key):
    "Given session key return true if session key exist in database"
    sql_query = ('SELECT * FROM users WHERE session_key=%s')
    result = exec_get_all(sql_query, (session_key,))
    if len(result) > 0:
        return True
    else:
        return False


def check_user_role(username):
    """Check role of the user"""
    sql_query = "SELECT users.username, roles.name FROM users JOIN roles ON users.role_id=roles.role_id WHERE users.username=%s;"
    return exec_get_one(sql_query, (username,))[1]


def edit_user(user_id, first_name, username, last_name, date_of_birth, address, phone_number, email, session_key):
    """edit user information"""
    role = check_user_role(username)
    if validate_session_key(session_key) is False:
        return False
    # elif role == 'admin':
    sql_query = (
        'UPDATE users SET first_name=%s,username=%s, last_name = %s,date_of_birth=%s,phone_number=%s,address=%s,email=%s, WHERE id= %s  ')
    exec_commit(sql_query, (first_name, username, last_name, date_of_birth, address, phone_number, email, user_id))
    data = {'message': 'edit success'}
    return jsonify(data)


def remove_user_account(user_id):
    """Remove user from database table"""
    # if validate_session_key(session_key) is False:
    #     return False
    sql_query = """DELETE FROM users WHERE users.user_id =%s"""
    exec_commit(sql_query, (user_id,))
    data = {'message': 'remove user account successfully'}
    return jsonify(data)


def getBookID(book_name):
    """Get the id of book if book title exist in table
       book_name--title of book
       Return id of book if exist otherwise false"""
    sql_query = """SELECT book_id from books where title = %s"""
    result = exec_get_one(sql_query, (book_name,))
    if result is not None:
        return result
    else:
        return False


def getStudentID():
    """Return the id of student from student table"""
    sql_query = 'SELECT student_id FROM Student,Users WHERE Users.user_id=Student.user_id'
    result = exec_get_one(sql_query)
    if result is not None:
        return result
    else:
        return False


def getLibrarianID(librarian_id):
    """Return the id of librarian from librarian table"""
    sql_query = 'SELECT librarian_id FROM Librarian WHERE librarian_id=%s'
    result = exec_get_one(sql_query, (librarian_id,))
    if result is not None:
        return result
    else:
        return False


def checkAvailableCopies(book_title):
    """Check number of copies available for specific book
        book_name--name of book
        Return total copies of a book"""
    bookId = getBookID(book_title)[0]
    sql_query = """SELECT total_copies FROM books WHERE book_id=%s"""
    return exec_get_one(sql_query, (bookId,))[0]


def returnDifferenceBetweenDates(checkout_date, return_date):
    """This will find differences between checkout_date and return_date
        and return none if user do not return book yet
       checkout_date -- date user checkout
       return_Date -- date user return book"""
    if return_date is not None:
        checkout_date = datetime.strptime(checkout_date, '%Y-%m-%d').date()
        return_date = datetime.strptime(return_date, '%Y-%m-%d').date()
        delta = return_date - checkout_date
    else:
        return None

    return delta.days

def lateFeePenalty(checkout_date, return_date):
    """This return a late fees base on late days.
       If book is return exact after 14 days, no late fee is added.
       if book is return 7 days after due date pass, .25 late fee will apply
       if book is return after 21 days, 2 late fee will apply each day
       return 0 if no fee apply
       checkout_date: date user checkout
       return_date: date user return"""
    daysDifference = returnDifferenceBetweenDates(checkout_date, return_date)
    weekFees = 0
    afterWeekFees = 0
    totalFees = 0
    if daysDifference is not None:
        fees = daysDifference - 14
        if daysDifference<0:
            totalFees=0
        totalFees += fees*1.5
    else:
        return 0
    return totalFees



def checkout_book(title, checkout_date, due_date):
    "Checkout book"
    # librarian_id = getLibrarianID(librarian_id)
    try:
        student_id = getStudentID()
        book_id = getBookID(title)[0]
        copies_available = checkAvailableCopies(title)
        if not book_id:
            data = {"success": False, "message": "Book not found"}
            return data

        if copies_available <= 0:
            data = {'success': False, 'message': 'Book is not available for checkout'}
            return data
        # Check if a checkout record already exists for the same book and student
        existing_checkout_query = "SELECT checkout_id FROM Checkout WHERE book_id = %s AND student_id = %s"
        existing_checkout_result = exec_commit(existing_checkout_query, (book_id, student_id))
        if existing_checkout_result:
            data = {'success': False, 'message': 'Book has already been checked out by the same student'}
            return data

        sql_query = "INSERT INTO checkout(book_id,student_id,checkout_date,due_date)" \
                    "VALUES (%s,%s,%s,%s)"
        exec_commit(sql_query, (book_id, student_id,checkout_date, due_date))
        days_delay = returnDifferenceBetweenDates(checkout_date,due_date)
        late_fees = lateFeePenalty(checkout_date,due_date)
        return True
    except Exception as e:
        print(e.message)

# def return_book(username):
#     user_id = getUserID(username)




    # when user return
