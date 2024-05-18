import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookRecommendation } from "../Redux/Action/BooksAction";
import "./BookRecommendation.css";
import BookAvatar from "../images/book.png"
import { bookData } from "../data/UserData";

function BookRecommendation() {
  const [books, setBooks] = useState([]);
  const userJson = localStorage.getItem("user");
  const users = JSON.parse(userJson);
  const { recommendation } = useSelector((state) => state.getBookRecommendation);

  const dispatch = useDispatch();
  const student_id = users?.user_id;
  console.log(student_id)
  

  useEffect(() => {
    dispatch(fetchBookRecommendation(1));
  }, [dispatch,student_id]);

  useEffect(() => {
    setBooks(recommendation);
  }, [recommendation]);


  return (
    <div className="book-recommendation-container">
    <div className="book-recommendation">
      <h2 className="rececommendation-title">Book Recommendations</h2>
      <div className="book-row">
        {books.map((book) => (
          <div key={book.book_id} className="book-card">
            <img src={book.cover_image_url?book.cover_image_url:BookAvatar} alt={book.title} />
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Rating: {book.rating}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default BookRecommendation;
