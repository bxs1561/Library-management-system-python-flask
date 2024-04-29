import React, {useEffect, useState} from "react";
import "./AddBook.css"
import book from '../../images/book.png'
import axios from '../../API/axios'
import { addBook } from "../../Redux/Action/BooksAction";
import { useSelector, useDispatch } from 'react-redux'


function AddBook() {
    const [isbn, setIsbn] = useState('');
    const [image, setImage] = useState(null)
    const [title,setTitle] = useState('');
    const [genre,setGenre] = useState('')
    const[totalCopies, setTotalCopies] = useState('')
    const[author, setAuthor] =useState('')
    const[publisher,setPublisher] = useState('')
    const dispatch = useDispatch();


    

    const loadFile = (event) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
        }
        else{
          setImage(null);
        }
       }
    const handleAddBook=async(event)=>{
      event.preventDefault();
      let bookData={
        ISBN:isbn,
        cover_image_url:image,
        title:title,
        genre:genre,
        total_copies:totalCopies,
        author:author,
        publisher: publisher,
      }
      dispatch(addBook(bookData))      
    }
       

       return (
          
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
                    value={author} // Replace with the appropriate state variable
                    onChange={(event) => setAuthor(event.target.value)}
                  />
                </div>
                <div className="book___title">
                  <label>Book Title</label>
                  <input
                    placeholder="Enter Book Title"
                    type="text"
                    value={title} // Replace with the appropriate state variable
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="book___category">
                  <label>Book Category</label>
                  <input
                    placeholder="Enter Book Category"
                    type="text"
                    value={genre} // Replace with the appropriate state variable
                    onChange={(event) => setGenre(event.target.value)}
                  />
                </div>
                <div className="book___publisher">
                  <label>Book publisher</label>
                  <input
                    placeholder="Enter Book Genre"
                    type="text"
                    value={publisher} // Replace with the appropriate state variable
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
                    value={totalCopies} // Replace with the appropriate state variable
                    onChange={(event) => setTotalCopies(event.target.value)}
                  />
                </div>
                <div className="book___description">
                  <label>Book description</label>
                  <textarea
                   rows="4"
                    placeholder="Enter Book description"
                    type="text"
                    value={title} // Replace with the appropriate state variable
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>

              </div>
              <div className="button">
              <button class="primary-button" onClick={handleAddBook}>Submit</button>
              </div>

          </div>
        </div>
        </div>
      );
    }
export default AddBook;