# from builtins import len

from .db_utils import *
import hashlib
import secrets
from flask import jsonify
import json


def rebuild_tables():
    """re-build the tables"""
    exec_sql_file('src/db/schema.sql')


def list_all_books():
    """Get the list of all books information from database order by book_id"""
    sql_query = "SELECT book_id, ISBN, title, genre, publication_year, publisher,language, copies_available, total_copies, location, cover_image_url, availability_status, rating, review, author FROM Books "
    return exec_get_all(sql_query)


def check_book_exist(ISBN):
    """Check if book already exist in database"""
    sql_query = "SELECT * FROM Books WHERE ISBN = %s"
    result = exec_get_all(sql_query, (ISBN,))
    if len(result) > 0:
        return True
    return False


def add_book(ISBN, title, genre, total_copies, copies_available, cover_image_url, author, publisher):
    """add book into database"""
    book_exist = check_book_exist(ISBN)
    if not all([ISBN, title, genre]):
        data = {"success": False, "message": "Please fill out this fields"}
        return data
    try:
        if book_exist:
            update_query = "UPDATE Books SET total_copies = total_copies + %s WHERE ISBN = %s"
            exec_commit(update_query, (total_copies, ISBN))
            data = {"success": True, "message": "book update successfully"}
            return data

        else:
            sql_query = "INSERT INTO Books(ISBN,title,genre,total_copies,copies_available,cover_image_url,author,publisher)VALUES" \
                        "(%s,%s,%s,%s,%s,%s,%s,%s)"
            exec_commit(sql_query,
                        (ISBN, title, genre, total_copies, copies_available, cover_image_url, author, publisher))
            data = {"success": True, "message": "book added successfully"}
            return data
    except Exception as e:
        print(e)
