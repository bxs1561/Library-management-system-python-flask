from builtins import len

from .db_utils import *
import hashlib
import secrets
from flask import jsonify
import json
from datetime import datetime, timedelta, date
from flask import Flask, request, jsonify
import time
import stripe
from dotenv import load_dotenv


def rebuild_tables():
    """re-build the tables"""
    exec_sql_file('src/db/schema.sql')
    # exec_sql_file('src/tests/data.sql')


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
        return result[0]
    else:
        return False


def getUserEmail(email):
    """Return the id of users from user table"""
    sql_query = 'SELECT email FROM Users WHERE email=%s'
    result = exec_get_one(sql_query, (email,))
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
        data = {"success": False, "error": "Please provide all required fields"}
        return data

    local_user_id = getUserID(username)
    role_id = getRoleID('admin')
    role_name = getRoleName(role_id)[0]

    if local_user_id:
        data = {"success": False, "error": "User already exists"}
        return data
    else:
        try:
            sql = """INSERT INTO user_status (status_value) VALUES (False)
                    RETURNING id"""
            encode_password = password.encode('utf-8')
            hashed_password = hashlib.sha512(encode_password).hexdigest()
            sql_query = """INSERT INTO users(first_name, last_name, username, password, phone_number, email,user_image_url,user_status_id,role_id)
                                    VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING user_id;"""
            locked = exec_commit_return(sql)
            user_id = exec_commit_return(sql_query, (
                first_name, last_name, username, hashed_password, phone_number,
                email, user_image_url, locked, role_id))
            if role_name.lower() == 'admin':
                sql_admin = """INSERT INTO admin (user_id) VALUES (%s);"""
                exec_commit(sql_admin, (user_id,))

            data = {"success": True, "error": "User added successfully"}
            return data
            # return True
        except Exception as e:
            data = {"success": False, "error": "An error occurred"}
            return data


def add_users(first_name, last_name, date_of_birth, username, password, address, phone_number, email,
              user_image_url, role_name):
    """Add users to database"""
    try:
        local_user_id = getUserID(username)
        role_id = getRoleID(role_name)
        existing_email = getUserEmail(email)
        if not role_id:
            data = {"success": False, "error": "Please fill out this fields"}
            return data
        STUDENT_ROLE_ID = getRoleName(role_id)
        LIBRARIAN_ROLE_ID = getRoleName(role_id)
        # Check if any of the required fields are empty
        if not all([first_name, last_name, date_of_birth, username, password, phone_number, email]):
            data = {"success": False, "error": "Please fill out this fields"}
            return data

        if local_user_id or existing_email:
            data = {"success": False, "error": "User already exists"}
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
                            VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING user_id;"""
            user_id = exec_commit_return(sql_query, (
                first_name, last_name, username, hashed_password, date_of_birth, address, phone_number,
                email, user_image_url, locked,
                role_id))
            # Insert into specific role table
            if role_name.lower() == 'student':
                sql_student = """INSERT INTO student (user_id) VALUES (%s);"""
                exec_commit(sql_student, (user_id,))
            elif role_name.lower() == 'librarian':
                sql_librarian = """INSERT INTO librarian (user_id, hire_date) VALUES (%s, NOW());"""
                exec_commit(sql_librarian, (user_id,))

            data = {"success": True, "message": "User added successfully"}

            # data = {"success": True, "message": "User added successfully"}
            return data

    except Exception as e:
        print(e)


def login_users(email, password):
    """Return session key if user exist and make login successfully
    otherWise return error message
    """
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
            try:
                login_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                sql_login_event_query = "INSERT INTO Login_Events(user_id,login_time)VALUES(%s,%s)"
                exec_commit(sql_login_event_query, (user_id, login_time))
            except Exception as e:
                print(e)
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


def weekly_login_report():
    """Get the date and how many times user login on each date on weekly basis"""
    end_date = datetime.now()
    start_date = end_date - timedelta(days=6)
    sql_query = "SELECT login_time FROM login_events WHERE login_time BETWEEN %s AND %s"
    login_events = exec_get_all(sql_query, (start_date, end_date))

    login_counts = {}
    for event in login_events:
        login_date = event[0]
        login_counts[login_date] = login_counts.get(login_date, 0) + 1
    return login_counts


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


def edit_user(user_id, first_name, username, last_name, date_of_birth, address, phone_number, email):
    """edit user information"""
    # role = check_user_role(username)
    # if validate_session_key(session_key) is False:
    #     return False
    # elif role == 'admin':
    try:
        sql_query = (
            'UPDATE users SET first_name=%s,username=%s, last_name = %s,date_of_birth=%s,address=%s,phone_number=%s,email=%s WHERE user_id= %s  ')
        exec_commit(sql_query, (first_name, username, last_name, date_of_birth, address, phone_number, email, user_id))
        data = {'message': 'edit success'}
        return data
    except Exception as e:
        print(e)


def remove_user_account(user_id, session_key):
    """Remove user from database table"""
    if validate_session_key(session_key) is False:
        return False
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
        return result[0]
    else:
        return False


def getStudentID():
    """Return the id of student from student table"""
    # sql_query = 'SELECT Users.user_id FROM Users,Student WHERE Users.user_id=Student.user_id'
    sql_query = 'SELECT student.student_id FROM Users,Student WHERE Users.user_id=Student.user_id'
    result = exec_get_one(sql_query)
    if result is not None:
        return result[0]
    else:
        return False


def getLibrarianID(librarian_id):
    """Return the id of librarian from librarian table"""
    sql_query = 'SELECT librarian_id FROM Librarian WHERE librarian_id=%s'
    result = exec_get_one(sql_query, (librarian_id,))
    if result is not None:
        return result[0]
    else:
        return False


def checkAvailableCopies(book_title):
    """Check number of copies available for specific book
        book_name--name of book
        Return total copies of a book"""
    bookId = getBookID(book_title)
    sql_query = """SELECT total_copies FROM books WHERE book_id=%s"""
    result = exec_get_one(sql_query, (bookId,))
    if result is not None:
        return result[0]
    else:
        return False


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


# def days_late(checkout_date, return_date):
#     if return_date is not None:
#         checkout_date = datetime.strptime(checkout_date, '%Y-%m-%d').date()
#         return_date = datetime.strptime(return_date, '%Y-%m-%d').date()
#         delta =


def checkout_book(title, checkout_date, due_date):
    "Checkout book"
    # librarian_id = getLibrarianID(librarian_id)
    over_due_days = 0
    copies_borrow = 0
    fine = 0
    try:
        student_id = getStudentID()
        book_id = getBookID(title)
        copies_available = checkAvailableCopies(title)
        copies_borrow = get_copies_borrow(title)


        if not book_id:
            data = {"success": False, "error": "Book not found"}
            return data

        if copies_available <= 0:
            data = {'success': False, 'error': 'Book is not available for checkout'}
            return data
        # Automatically set the return date to two weeks from the checkout date
        # checkout_date_obj = datetime.strptime(checkout_date, '%Y-%m-%d')
        # default_due_date = checkout_date_obj + timedelta(weeks=2)

        # Check if a checkout record already exists for the same book and student
        existing_checkout_query = "SELECT checkout_id FROM Checkout WHERE book_id = %s AND student_id = %s"
        existing_checkout_result = exec_get_all(existing_checkout_query, (book_id, student_id))
        # checkout_id = existing_checkout_result[0]
        # print(checkout_id)




        # if existing_checkout_result:
        #     data = {'success': False, 'error': 'Book has already been checked out by the same student'}
        #     return data

        current_date = date.today()




        borrow_days = returnDifferenceBetweenDates(due_date, str(current_date))
        # days_delay = returnDifferenceBetweenDates(checkout_date,due_date)
        # Calculate due date (e.g., 14 days from now)
        # due_date = datetime.now() + timedelta(days=14)


        # borrow_days = 0
        if borrow_days <= 14:
            borrow_days = borrow_days
            fine = 0
        else:
            current_date = date.today()
            borrow_days = returnDifferenceBetweenDates(due_date, str(current_date))
            fine += borrow_days * 1.5
        sql_checkout_update_query = """UPDATE books SET total_copies = %s,copies_available = %s WHERE book_id=%s"""
        # update_fine_query = "UPDATE Student,Books SET fine_balance = fine_balance + %s WHERE student_id = %s AND Books.book_id=%s "
        update_fine_query = "UPDATE Student SET fine_balance = fine_balance + %s FROM  Checkout WHERE Student.student_id = Checkout.student_id AND Checkout.book_id = %s;"
        exec_commit(update_fine_query, (fine,book_id))

        if copies_available > 0:
            sql_query = "INSERT INTO checkout(book_id,student_id,checkout_date,due_date,days_delay)" \
                        "VALUES (%s,%s,%s,%s,%s)"
            exec_commit(sql_query, (book_id, student_id, checkout_date, due_date, borrow_days))
            total_copies = copies_available - 1
            copies_borrow = copies_borrow + 1
            exec_commit(sql_checkout_update_query, (total_copies, copies_borrow, book_id))

        return True
    except Exception as e:
        print(e)


def get_copies_borrow(book_title):
    bookId = getBookID(book_title)
    sql_query = """SELECT copies_available FROM books WHERE book_id=%s"""
    result = exec_get_one(sql_query, (bookId,))
    if result is not None:
        return result[0]
    else:
        return False


# Load environment variables from .env file
# load_dotenv()
#
def create_payment(return_date,username,title,amount):
    stripe.api_key = 'sk_test_51HZVC0GPsXmpEfxIfWGPwePobKmixmk9e4ai2RZTjZF84EdDO2KlT3kGjaBYZB7YlmqyrsCSqwO6Ye2ESrFXGWmd00UvAQs8aR'

    try:
        user_id = getUserID(username)
        amount_in_cents = int(float(amount) * 100)

        # Create a payment request
        payment_request = create_payment_request(user_id,amount,return_date)
        if not payment_request["success"]:
             data={"success": False, "error": payment_request["error"]}
             return data

        payment_id = payment_request["payment_id"]


        # Check if the payment request is approved
        sql_query = "SELECT is_approved FROM Payments WHERE payment_id = %s"
        approved = exec_get_one(sql_query, (payment_id,))
        if not approved or not approved[0]:
            payment_request["is_approved"] = False

        # Proceed with the Stripe payment
        intent = stripe.PaymentIntent.create(
            amount=amount_in_cents,
            currency='usd',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        if not approved or not approved[0]:
            data = {"clientSecret": intent['client_secret']}
            return data

        # record_payment(user_id, amount)
        # return_status = return_checkout_book(username, title, return_date)
        # client_secret = intent['client_secret']
        # if return_status['success']:
        #     data = {"clientSecret": intent['client_secret']}
        #     return data
        #
        #
        # else:
        #     data={"clientSecret": client_secret, "message": "Payment successful but book return failed",
        #                     "error": return_status['error']}
        #     return data

    except Exception as e:
        print(e)





def getStudentIDUsingUserID(user_id):
    """Return the id of student from student table"""
    # sql_query = 'SELECT Users.user_id FROM Users,Student WHERE Users.user_id=Student.user_id'
    sql_query = 'SELECT student_id FROM Student WHERE Student.user_id=%s'
    result = exec_get_one(sql_query,(user_id,))
    if result is not None:
        return result[0]
    else:
        return False


def create_payment_request(user_id,amount,return_date):
    try:
        student_id = getStudentIDUsingUserID(user_id)
        sql_query = """INSERT INTO Payments (student_id, amount, payment_date, is_approved)
                       VALUES (%s, %s, %s, FALSE) RETURNING payment_id;"""
        payment_id = exec_commit_return(sql_query, (student_id, amount, return_date))
        return {"success": True, "message": "Payment request created successfully", "payment_id": payment_id}
    except Exception as e:
        return {"success": False, "error": str(e)}


def getUserIDUsingStudentID(student_id):
    sql_query = "SELECT user_id FROM Student WHERE student_id=%s "
    result = exec_get_one(sql_query,(student_id,))
    if result is not None:
        return result[0]
    else:
        return False


def approve_payment(payment_id, admin_user_id,return_date):
    # return_date, username, title, amount
    try:
        # Check if the admin user ID belongs to an admin
        sql_query = "SELECT role_id FROM Users WHERE user_id = %s"
        role_id = exec_get_one(sql_query, (admin_user_id,))

        if not role_id or role_id[0] != getRoleID('admin')[0]:
            return {"success": False, "error": "User is not an admin"}


        # Approve the payment
        sql_update = "UPDATE Payments SET is_approved = TRUE WHERE payment_id = %s"
        exec_commit(sql_update, (payment_id,))
        # return {"success": True, "message": "Payment approved successfully"}

        # Get the user_id and amount from the payment request
        sql_query = "SELECT student_id, amount FROM Payments WHERE payment_id = %s"
        payment_info = exec_get_one(sql_query, (payment_id,))
        if not payment_info:
            return {"success": False, "error": "Payment not found"}

        student_id, amount = payment_info
        # Record the payment
        user_id = getUserIDUsingStudentID(student_id)  # Assuming a function to get user_id from student_id
        record_payment(user_id, amount)

        sql_query = "SELECT B.title AS book_title,U.username AS user_name FROM Checkout C JOIN Books B ON C.book_id = B.book_id JOIN Student S ON C.student_id = S.student_id JOIN Users U ON S.user_id =U.user_id;"
        user_book_info = exec_get_one(sql_query, ())
        if not user_book_info:
            return {"success": False, "error": "User or book information not found"}
        title, username = user_book_info
        return_date=datetime.fromisoformat(return_date.replace("Z", "+00:00")).date()

        return_status = return_checkout_book(username, title, return_date)
        if not return_status['success']:
            return {"success": False, "message": "Payment approved but book return failed", "error": return_status['error']}

        return {"success": True, "message": "Payment approved and book returned successfully"}


    except Exception as e:
        print(e)
        return {"success": False, "error": str(e)}


def record_payment(user_id, amount):
    """Record a payment and update the fine balance"""
    try:
        update_fine_query = "UPDATE Student SET fine_balance = fine_balance - %s WHERE user_id = %s"
        exec_commit(update_fine_query, (amount, user_id))
        return {"success": True, "message": "Payment recorded successfully"}
    except Exception as e:
        print(e)
        return {"success": False, "error": str(e)}

# def update_payment(amount)
def return_checkout_book(username, title, return_date):
    try:
        user_id = getUserID(username)
        student_id = getStudentID()
        book_id = getBookID(title)

        # Check if the book is checked out by the student
        checkout_query = "SELECT checkout_id, due_date FROM Checkout WHERE book_id = %s AND student_id = %s"
        checkout_record = exec_get_one(checkout_query, (book_id, student_id))

        if not checkout_record:
            return {"success": False, "error": "Book is not checked out by the student"}

        checkout_id, due_date = checkout_record

        # Calculate fine if the book is returned late
        days_delay = (return_date - due_date).days
        fine = max(0, days_delay * 1.5)

        # Update student's fine balance and return the book
        update_fine_query = "UPDATE Student SET fine_balance = fine_balance + %s WHERE student_id = %s"
        delete_checkout_query = "DELETE FROM Checkout WHERE checkout_id = %s"
        exec_commit(update_fine_query, (fine, student_id))
        exec_commit(delete_checkout_query, (checkout_id,))

        # Update copies available
        update_copies_query = "UPDATE books SET copies_available = copies_available + 1 WHERE book_id = %s"
        exec_commit(update_copies_query, (book_id,))

        return {"success": True}

    except Exception as e:
        print(e)
        return {"success": False, "error": str(e)}


