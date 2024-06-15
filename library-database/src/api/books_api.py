from flask_restful import Resource, reqparse, request
import json
from flask import json, jsonify
from datetime import datetime, timedelta
from db import books

parser = reqparse.RequestParser()

from flask import Flask, jsonify


class BookApiGet(Resource):
    def get(self):
        books_data = []
        for data in books.list_all_books():
            dictionary = dict()
            dictionary['book_id'] = data[0]
            dictionary['ISBN'] = data[1]
            dictionary['title'] = data[2]
            dictionary['genre'] = data[3]
            dictionary['publication_year'] = data[4]
            dictionary['publisher'] = data[5]
            dictionary['language'] = data[6]
            dictionary['copies_available'] = data[7]

            dictionary['total_copies'] = data[8]
            dictionary['location'] = data[9]
            dictionary['cover_image_url'] = data[10]
            dictionary['availability_status'] = data[11]

            dictionary['rating'] = data[12]
            dictionary['review'] = data[13]
            dictionary['author'] = data[14]

            books_data.append(dictionary)

        return books_data


class BookApiPost(Resource):
    def post(self):
        parser.add_argument('ISBN', type=str)
        parser.add_argument('title', type=str)
        parser.add_argument('genre', type=str)
        parser.add_argument('total_copies', type=int)
        parser.add_argument('copies_available', type=int) #total book borrow
        parser.add_argument('cover_image_url', type=str)
        parser.add_argument('author', type=str)
        parser.add_argument('publisher', type=str)

        args = parser.parse_args()
        ISBN = args['ISBN']
        title = args['title']
        genre = args['genre']
        total_copies = args['total_copies']
        copies_available = args['copies_available']
        cover_image_url = args['cover_image_url']
        author = args['author']
        publisher = args['publisher']
        books_add = books.add_book(ISBN, title, genre, total_copies, cover_image_url, author,
                                   publisher,copies_available)
        return jsonify(books_add)


class BooksApiEdit(Resource):
    def put(self, book_id):
        """Edit users information"""
        parser.add_argument('ISBN', type=str)
        parser.add_argument('title', type=str)
        parser.add_argument('genre', type=str)
        parser.add_argument('total_copies', type=int)
        parser.add_argument('copies_available', type=int)
        parser.add_argument('cover_image_url', type=str)
        parser.add_argument('author', type=str)
        parser.add_argument('publisher', type=str)

        args = parser.parse_args()
        ISBN = args['ISBN']
        title = args['title']
        genre = args['genre']
        total_copies = args['total_copies']
        copies_available = args['copies_available']
        cover_image_url = args['cover_image_url']
        author = args['author']
        publisher = args['publisher']

        user_edit = books.edit_book(book_id, ISBN, title, genre, total_copies, copies_available, cover_image_url,
                                    author, publisher)
        return user_edit


class RemoveBookApi(Resource):
    def delete(self, book_id):
        """Delete user information"""
        delete_user = books.remove_book(book_id)
        return delete_user


class PopulateBookApi(Resource):
    def get(self):
        popular = books.popular_book()
        books_data = []
        for data in popular:
            dictionary = dict()
            dictionary['title'] = data[0]
            dictionary['checkout_count'] = data[1]
            books_data.append(dictionary)
        return books_data
