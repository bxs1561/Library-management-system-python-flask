import React, {useEffect, useState} from "react";
import "./EditBook.css";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { editBook } from "../../redux/action/booksAction";
import book from '../../images/book.png'
import {BrowserRouter as Router,useNavigate} from "react-router-dom";

/**
 * Edit Book information.
 */
function EditBook(){
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const books = location.state;

    const [isbn, setIsbn] = useState(books.ISBN);
    const [image, setImage] = useState(books.cover_image_url)
    const [title,setTitle] = useState(books.title);
    const [genre,setGenre] = useState(books.genre)
    const[totalCopies, setTotalCopies] = useState(books.total_copies)
    const[author, setAuthor] =useState(books.author)
    const[publisher,setPublisher] = useState(books.publisher)
    
    /**
     * update book information and store in redux.
     */
    const handleEdit = () => {
      const updatedBook = {
        ...books,
        isbn,
        title,
        genre,
        total_copies: totalCopies,
        author,
        publisher,
        image,
      };
      dispatch(editBook(books.book_id,updatedBook));
      navigate("/view-book")
    }

    /**
     *handles the loading of a file from an input field and sets the image state accordingly.
    */
    const loadFile = async(event) => {
      if (event.target.files && event.target.files[0]) {
        setImage(URL.createObjectURL(event.target.files[0]));
      }
      else{
        setImage(null);
      }
    }
    
    return(
      <div className="addbook___container">
        <div className="book___container">
          <div className="heading">
            <strong>Add Book</strong>
          </div>
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
          <button style={{width:"168px"}} className="primary-button" onClick={handleEdit} >Submit</button>
        </div>
      </div>
    </div>
  </div>
  )
}
export default EditBook