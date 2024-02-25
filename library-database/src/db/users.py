from builtins import len

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
        'SELECT user_id,first_name,last_name,username,password,date_of_birth,address,phone_number,email,role_id,user_status_id,session_key FROM Users')


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


def add_users(user_id, first_name, last_name, date_of_birth, username, password, address, phone_number, email, role_id):
    """Add users to database"""
    local_user_id = getUserID(username)
    ##check if admin
    check_admin_sql_query = """SELECT Roles.name FROM users, Roles WHERE users.user_id = Roles.role_id """
    admin = exec_get_all(check_admin_sql_query)
    # if admin:
    if local_user_id:
        return "user already exist"
    else:
        encode_password = password.encode('utf-8')
        hashed_password = hashlib.sha512(encode_password).hexdigest()
        sql = """INSERT INTO user_status(status_value) VALUES (FALSE)
        RETURNING id"""
        sql_query = """INSERT INTO users(user_id,first_name,last_name,username,password,date_of_birth,address,phone_number,email,user_status_id,role_id)
                        VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
        locked = exec_commit(sql)
        exec_commit(sql_query, (user_id,first_name,last_name,username,hashed_password,date_of_birth,address,phone_number,email,locked,role_id))
        return True



def login_users(username, password, role_name):
    """Return session key if user exist and make login successfully
    otherWise return error message
    """
    role_id = getRoleID(role_name)
    encode_password = password.encode('utf-8')
    hashed_password = hashlib.sha512(encode_password).hexdigest()
    sql_query = 'SELECT user_id,first_name,last_name,username,password,date_of_birth,address,phone_number,email,role_id FROM Users'
    result = exec_get_all(sql_query, (username, hashed_password, role_id))
    if len(result) > 0:
        session_key = secrets.token_hex(512)
        sql_update = 'UPDATE users SET session_key = %s WHERE username=%s'
        exec_commit(sql_update, (session_key, username))
        return [session_key, 'login successfully']
    else:
        return [0, 'login failed']
