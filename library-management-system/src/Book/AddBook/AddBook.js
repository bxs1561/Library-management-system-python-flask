import React, {useEffect, useState} from "react";
import "./AddBook.css"
import book from '../../images/book.png'
import { addBook } from "../../redux/action/booksAction";
import { useSelector, useDispatch } from 'react-redux'
import MessageBox from "../../error/MessageBox";
import {BrowserRouter as Router,useNavigate} from "react-router-dom";

/**
 * Add book into database
 */
function AddBook() {
  const navigate = useNavigate();

  const {error} = useSelector(state => state.addBook);
  const {books} = useSelector(state => state.addBook);

  const [isbn, setIsbn] = useState('');
  const [image, setImage] = useState(null)
  const [title,setTitle] = useState('');
  const [genre,setGenre] = useState('')
  const[totalCopies, setTotalCopies] = useState('')
  const[author, setAuthor] =useState('')
  const[publisher,setPublisher] = useState('')
  const dispatch = useDispatch();

  
  /**
   * Handles file input change event, sets the image preview URL or clears it.
   * @param {Object} event - The event object from the file input change.
   */
  const loadFile = async(event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    else{
      setImage(null);
    }
  }

  /**
   * Validate if input field is empty or not.
   */
  const validateBookData = () => {
    if (
      !isbn ||
      !title ||
      !genre ||
      !totalCopies ||
      !author ||
      !publisher 
    ) {
      return false;
    }
    return true;
  };

  /**
   * Handles the form submission for adding a new book.
   * @param {Object} event - The event object from the form submission.
   */
  const handleAddBook=(event)=>{
    event.preventDefault();
    let bookData={
      ISBN:isbn,
      cover_image_url:image,
      title:title,
      genre:genre,
      total_copies:totalCopies || 0,
      author:author,
      publisher: publisher,
    }
    dispatch(addBook(bookData));
    if (validateBookData()) {
      navigate("/dashboard")
    }
  }
  return (
    <div className="addbook___container">
      <div className="book___container">
        <div className="heading">
          <strong>Add Book</strong>
        </div>
        {error && <MessageBox variant="danger">{error?.error}</MessageBox>}
          <div className="book___body">
            <div className="book___information">
              <div className="book___isbn">
                <label>ISBN *</label>
                <input
                  placeholder="Enter ISBN"
                  type="text"
                  value={isbn}
                  onChange={(event) => setIsbn(event.target.value)}
                />
              </div>
              <div className="book___author">
                <label>Author Name</label>
                <input
                  placeholder="Enter Author Name"
                  type="text"
                  value={author} 
                  onChange={(event) => setAuthor(event.target.value)}
                />
              </div>
              <div className="book___title">
                <label>Book Title</label>
                <input
                  placeholder="Enter Book Title"
                  type="text"
                  value={title} 
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="book___category">
                <label>Book Category</label>
                <input
                  placeholder="Enter Book Category"
                  type="text"
                  value={genre} 
                  onChange={(event) => setGenre(event.target.value)}
                />
              </div>
              <div className="book___publisher">
                <label>Book publisher</label>
                <input
                  placeholder="Enter Book Genre"
                  type="text"
                  value={publisher} 
                  onChange={(event) => setPublisher(event.target.value)}
                />
              </div>
              <div className="book___image">
              <img src={image?image:book} className="image___thumbnail" />
              <div className="file">
                <input  type="file" onChange={loadFile} />
              </div>
            </div>
            <div className="book___quantity">
              <label>Book quantity</label>
              <input
                placeholder="Enter Book quantity"
                type="text"
                value={totalCopies} 
                onChange={(event) => setTotalCopies(event.target.value)}
              />
            </div>
            <div className="book___description">
              <label>Book description</label>
              <textarea
                rows="4"
                placeholder="Enter Book description"
                type="text"
                value={title} 
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="button">
            <button style={{width:"168px"}} className="primary-button" onClick={handleAddBook} >Submit</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
export default AddBook;