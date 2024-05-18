import React, {useEffect, useState} from "react";
import "./ViewBook.css"
import BookAvatar from '../../images/book.png'
import { fetchBook,deleteBook, editBook } from "../../Redux/Action/BooksAction";
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../API/axios'
import _ from 'lodash'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate, Link,useParams
} from "react-router-dom";
import Chatbot from "../../chatbot/Chatbot";

function ViewBook(){
    const [searchQuery, setSearchQuery] = useState("");
    const [searchISBNQuery, setSearchISBNQuery] = useState("");

    const dispatch = useDispatch();
    const  {books}  = useSelector((state) => state.getBook);
    const [bookData, setBookData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10); 
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();






useEffect(()=>{
    setBookData(books)
},[books])

useEffect(()=>{
    dispatch(fetchBook())
},[dispatch])

const searchBookByTitle=(searchTerm)=>{
    const lowerCaseSearchTerm = searchTerm.toUpperCase();

    

    const newData=_.filter(books, (bok) => {
        return (
          bok.title.toUpperCase().includes(lowerCaseSearchTerm) 
        )
      });
      

    setBookData(newData);
    setSearchQuery(searchTerm)

}
const searchBookByISBN=(searchTerm)=>{
  const lowerCaseSearchTerm = searchTerm

  const newData=_.filter(books, (bok) => {
    return (
      bok.ISBN.includes(lowerCaseSearchTerm) 
    )
  });
    

  setBookData(newData);
  setSearchISBNQuery(searchTerm)

}

const removeUser=(book_id) => {
    dispatch(deleteBook(book_id))
    setBookData(bookData.filter(book => book.book_id !== book_id));
  };

  const handleEdit=(book)=>{
    // setSelectedBook(book);
    navigate(`/book/edit/${book.book_id}`,{state:book});
} 
  

    // Logic for pagination
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = bookData?.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
   





  
    return(
        <div className="view___container">
            <div className="viewbook___container">
            <div className="search-bar-container">

<div className="bookname___search">
  <div className="input___bookname">
    <span className="input-group-text-book ">Search book</span>
    <input
      id="book_autocomplete"
      placeholder="Search Title."
      type="text"
      className="form-control ui-autocomplete-input"
      autoComplete="off"
      value={searchQuery}
      onChange={(event) => searchBookByTitle(event.target.value)}
    ></input>
  </div>
</div>
<div className="isbn___search">
  <div className="input___isbn">
    <span className="input-group-text-book ">Search book</span>
    <input
      id="book_autocomplete"
      placeholder="Search ISBN."
      type="text"
      value={searchISBNQuery}
      className="form-control ui-autocomplete-input"
      autoComplete="off"
      onChange={(event) => searchBookByISBN(event.target.value)}
    ></input>
  </div>
</div>

        </div>
        {/* {book?.lenght>0&&( */}
                <table className="book___info">
                    <thead>
                        <tr>
                            <th>ISBN</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Quanitiy</th>
                            <th>Borrow</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBooks?.map(bok=>(
                        <tr key={bok.book_id}>
                            <td>{bok.ISBN}</td>
                            <td>
                                <img
                                src={bok.cover_image_url?bok.cover_image_url:BookAvatar}
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>{bok.title}</td>
                            <td>{bok.genre}</td>
                            <td>{bok.total_copies}</td>

                            <td>
                                {bok.total_copies - bok.copies_available}
                            </td>
                            <td>
                            <button onClick={()=>handleEdit(bok)} className="edit___button"  >
                                                <i className="uil uil-edit"></i>
                                                </button>
                                                <button  onClick={()=>removeUser(bok.book_id)} className="delete___button">
                                                <i className="uil uil-trash-alt"></i>
                                                </button>
                                {/* <button className="action-button"><i className="uil uil-edit"></i></button>
                                <button className="action-button" onClick={()=>removeUser(bok.book_id)}><i className="uil uil-trash-alt"></i></button> */}
                            </td>
                            </tr>
                            ))}
                            </tbody>




                </table>
                {currentBooks?.length === 0 && (
                                    <p>No matching book found.</p>
                                )}
                <ul className="pagination">
                    <li
                        className= {currentPage===1?"pagination-button disabled":"pagination-button "}
                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </li>
                    <li className="pagination-button">
                        Page {currentPage}
                    </li>
                    <li
                        className="pagination-button"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentBooks?.length < booksPerPage}
                    >
                        Next
                    </li>
                </ul>
        {/* )} */}
       
            </div>
        </div>
    )
}
export default ViewBook