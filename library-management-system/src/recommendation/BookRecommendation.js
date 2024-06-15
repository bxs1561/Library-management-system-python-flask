import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookRecommendation } from "../redux/action/booksAction";
import "./BookRecommendation.css";
import BookAvatar from "../images/book.png"

/**
 * Display book Recomendation based on genre and checkout history.
 */
function BookRecommendation() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const { recommendation } = useSelector((state) => state.getBookRecommendation);
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");



  

  useEffect(() => {
    if (user?.user_id) {
      dispatch(fetchBookRecommendation(user?.user_id));
    }
  }, [dispatch,user?.user_id]);

  // useEffect(() => {
  //   setBooks(recommendation);
  // }, [recommendation]);

  useEffect(() => {
    if (recommendation?.success === false) {
      setErrorMessage(recommendation.message);
    } else if (recommendation?.books) {
      setBooks(recommendation.books);
      setErrorMessage("");
    }
  }, [recommendation]);



  return (
    <div className="book-recommendation-container">
      <div className="book-recommendation">
        <div className="book-recommendation-title">
        <h2 className="rececommendation-title">Book Recommendations</h2>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="book-row">
         
          {books?.map((book) => (
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
