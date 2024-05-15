from .db_utils import *
import nltk
import random
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB


def rebuild_tables():
    """re-build the tables"""
    exec_sql_file('src/db/schema.sql')
    # exec_sql_file('src/db/data.sql')


def read_text_from_file(file_name):
    "read the files"
    with open(file_name, "r") as file:
        lines = file.readlines()
    conversations = []
    for line in lines:
        parts = line.replace("(", "").replace(")", "").strip().split(",")
        conversation = (
        parts[0].strip().strip('"'), ",".join(parts[1:]).strip().strip('"').replace('"', "").replace(",", ""))
        conversations.append(conversation)
    return conversations


def agent_response(user_query):
    return "I'm sorry, I couldn't understand that. Please ask a librarian for assistance."


def chatbot_library(user_query):
    "use sklearn and nltk to converse user with chatbot"
    # Download NLTK resources
    nltk.download('punkt')
    nltk.download('stopwords')

    # Sample conversational data
    conversations = read_text_from_file('src/db/conversation.txt')
    X, y = zip(*conversations)

    # Tokenize input text and remove stopwords
    stop_words = set(stopwords.words('english'))
    X_tokenized = [' '.join([word for word in word_tokenize(text.lower()) if word.isalnum() and word not in stop_words])
                   for text in X]

    # Train a TF-IDF vectorizer
    vectorizer = TfidfVectorizer()
    X_vectors = vectorizer.fit_transform(X_tokenized)

    # Train a Naive Bayes classifier
    classifier = MultinomialNB()
    classifier.fit(X_vectors, y)

    user_query_tokenized = ' '.join(
        [word for word in word_tokenize(user_query.lower()) if word.isalnum() and word not in stop_words])
    user_query_vector = vectorizer.transform([user_query_tokenized])
    predicted_response = classifier.predict(user_query_vector)[0]
    return predicted_response
