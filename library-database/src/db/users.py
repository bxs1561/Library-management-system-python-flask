from builtins import len

from .db_utils import *
import hashlib
import secrets
from flask import jsonify
import json


def rebuild_tables():
    """re-build the tables"""
    exec_sql_file('src/db/schema.sql')
    # exec_sql_file('src/db/data.sql')


def list_admin():
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


def add_admin_register(first_name, last_name, username, password, phone_number, email,user_image_url):
    """Add admin user"""
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
            locked = exec_commit(sql)
            exec_commit(sql_query, (
                                    first_name, last_name, username, hashed_password, phone_number,
                                    email,user_image_url, locked, role_id))
            return json.dumps({"success": True, "message": "User added successfully"})
            # return True
        except Exception as e:
            return {"success": False, "message": "An error occurred"}

def add_users(user_id, first_name, last_name, date_of_birth, username, password, address, phone_number, email,
              role_name):
    """Add users to database"""
    local_user_id = getUserID(username)
    role_id = getRoleID(role_name)
    if local_user_id:
        return False
        # return "user already exist"
    else:
        encode_password = password.encode('utf-8')
        hashed_password = hashlib.sha512(encode_password).hexdigest()
        sql_lock = """
                  INSERT INTO user_status (status_value)
                  VALUES (False) RETURNING id ;
                """
        locked = exec_commit_return(sql_lock)

        sql_query = """INSERT INTO users(user_id,first_name,last_name,username,password,date_of_birth,address,phone_number,email,user_status_id,role_id)
                        VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
        exec_commit(sql_query, (user_id,
                                first_name, last_name, username, hashed_password, date_of_birth, address, phone_number,
                                email, locked,
                                role_id))
        return True


def login_users(username, password):
    """Return session key if user exist and make login successfully
    otherWise return error message
    """

    if len(username) > 0 and len(password) > 0:
        encode_password = password.encode('utf-8')
        hashed_password = hashlib.sha512(encode_password).hexdigest()
        sql_query = 'SELECT user_id,first_name,last_name,username,password,date_of_birth,address,phone_number,email,role_id FROM users WHERE username=%s AND password=%s'
        result = exec_get_all(sql_query, (username, hashed_password))
        if len(result) > 0:
            user_id, first_name, last_name, username, _, _, _, _, _, role_id = result[0]
            role_name = getRoleName(role_id)
            session_key = secrets.token_hex(512)
            sql_update = 'UPDATE users SET session_key = %s WHERE username=%s'
            exec_commit(sql_update, (session_key, username))
            data = {'session_key': session_key, 'message': 'login successfully', 'user': {
                'user_id': user_id, 'username': username, 'user_role': role_name
            }}
            return jsonify(data)
        else:
            data = {'error': 'login failed'}
            return jsonify(data)

    elif len(username) <= 0 or len(password) <= 0:
        data = {'error': "Please fill in the email or password"}
        return jsonify(data)


    else:
        data = {'error': 'login failed'}
        return jsonify(data)


def validate_session_key(session_key):
    "Given session key return true if session key exist in database"
    sql_query = ('SELECT * FROM users WHERE session_key=%s')
    result = exec_get_all(sql_query, (session_key,))
    print(result)
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


def remove_user_account(user_id, session_key):
    """Remove user from database table"""
    if validate_session_key(session_key) is False:
        return False
    sql_query = """DELETE FROM users WHERE users.user_id =%s"""
    exec_commit(sql_query, (user_id,))
    data={'message':'remove user account successfully'}
    return jsonify(data)


def get_all_checkout_book(session_key):
    """List all the book checkout by user"""
    if validate_session_key(session_key) is False:
        return False

    sql_query = """
        SELECT checkout.checkout_id, checkout.student_id, checkout.book_id, checkout.checkout_date, 
               checkout.due_date, checkout.return_date, checkout.borrow_days 
        FROM checkout
        ORDER BY checkout.checkout_id
    """
    return exec_get_all(sql_query)


def get_user_checkout_books(username, session_key):
    """List the number of book checkout by user"""
    if validate_session_key(session_key) is False:
        return False
    user = getUserID(username)[0]
    sql_query = """ SELECT checkout.checkout_id,checkout.student_id,checkout.book_id,checkout.checkout_date,checkout.due_date,checkout.return_date,checkout.borrow_days FROM checkout,books
                    WHERE checkout.student_id=%s and checkout.book_id=books.book_id ORDER BY checkout.checkout_id"""
    return exec_get_all(sql_query, (user,))




