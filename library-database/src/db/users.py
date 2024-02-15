from .db_utils import *
import hashlib
import secrets


def rebuild_tables():
    """re-build the tables"""
    exec_sql_file('src/db/schema.sql')
    exec_sql_file('src/db/data.sql')


def list_admin():
    """Get the list of all admin info from database."""
    return exec_get_all(
        'SELECT user_id,first_name,last_name,username,password,date_of_birth,address,phone_number,email,role_id,session_key FROM Users')


def getUserID(username):
    """Return the id of users from user table"""
    sql_query = 'SELECT user_id FROM Users WHERE username=%s'
    result = exec_get_one(sql_query,(username,))
    if result is not None:
        return result
    else:
        return False

def getRoleID(name):
    """Return the id of  roles"""
    sql_query = 'SELECT role_id from Roles WHERE name=%s'
    result = exec_get_one(sql_query,(name,))
    if result is not None:
        return result
    else:
        return False

def login_users(username,password,roles):
    """Return session key if user exist and make login successfully
    otherWise return error message
    """
    encode_password = password.encode('utf-8')
    hashed_password = hashlib.sha512(encode_password).hexdigest()

