from builtins import len
from .db_utils import *
import hashlib
import secrets
from flask import jsonify
import json
from datetime import datetime, timedelta
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def rebuild_tables():
    """re-build the tables"""
    exec_sql_file('src/db/schema.sql')
    # exec_sql_file('src/db/data.sql')


# Convert checkout history into a dictionary of ugenre lists
def create_user_genre_dict(borrowing_history):
    user_genre_dict = {}
    for user_id, genre in borrowing_history:
        if user_id not in user_genre_dict:
            user_genre_dict[user_id] = []
        user_genre_dict[user_id].append(genre)
    return user_genre_dict


def recomendation(user_id):
    "Books recomendation to user based on genre"
    count_vectorizer = CountVectorizer()
    sql_query = "SELECT s.user_id, b.genre FROM Checkout c JOIN Books b ON " \
                "c.book_id = b.book_id JOIN Student s ON c.student_id = s.student_id WHERE s.user_id =%s "

    result = exec_get_all(sql_query,(user_id,))
    if result is None:
        print("No data fetched from database")
        return []
    borrowing_history = create_user_genre_dict(result)
    genres_documents = [' '.join(genres) for genres in borrowing_history.values()]
    user_item_matrix = count_vectorizer.fit_transform(genres_documents)
    cosine_sim = cosine_similarity(user_item_matrix, user_item_matrix)

    # Get top 5 recommendations
    user_id = int(user_id)
    user_index = list(borrowing_history.keys()).index(user_id)
    similar_items = cosine_sim[user_index]
    top_recommendations = similar_items.argsort()[::-1][:5]

    recommended_books = []
    for index in top_recommendations:
        recommended_book_id = list(borrowing_history.keys())[index]
        sql_query = "SELECT * FROM Books WHERE book_id = %s"
        book_data = exec_get_one(sql_query, (recommended_book_id,))
        recommended_books.append(book_data)
    return recommended_books

