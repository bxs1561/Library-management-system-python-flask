import React, {useEffect, useState} from "react";
import "./ViewBook.css"
import book1 from "../../images/book1.jpg"
import { fetchBook,deleteBook } from "../../Redux/Action/BooksAction";
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../API/axios'
import _ from 'lodash'

function ViewBook(){
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const  {book}  = useSelector((state) => state.getBook);
    const [books, setBooks] = useState([]);



  
//   const filteredData = yourDataArray.filter((item) =>
//     item.isbn.includes(searchQuery)
//   );

// const getViewBook=async()=>{
//     dispatch(getBookRequest())
//     try{
//         const response = await axios.get('/books')
//         const responseData = response.data
//         dispatch(getBookSuccess(responseData));

//     }catch(error){
//         dispatch(getBookFailure(error))

//     }
// }
useEffect(()=>{
    setBooks(book)
},[book])

useEffect(()=>{
    dispatch(fetchBook())
},[dispatch])

const searchBookByTitle=(searchTerm)=>{
    const lowerCaseSearchTerm = searchTerm.toUpperCase();

    

    const newData=_.filter(book, (bok) => {
        return (
          bok.title.toUpperCase().includes(lowerCaseSearchTerm) 
        )
      });
      

    setBooks(newData);
    setSearchQuery(searchTerm)

}

const removeUser=(book_id) => {
    dispatch(deleteBook(book_id))
    setBooks(books.filter(book => book.book_id !== book_id));
  };



  
    return(
        <div className="view___container">
            <div className="viewbook___container">
            <div className="search-bar-container">

<div className="bookname___search">
  <div className="input___bookname">
    <span className="input-group-text-book ">Search book</span>
    <input
      id="book_autocomplete"
      placeholder="Type to search."
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
      placeholder="Type to search."
      type="text"
      className="form-control ui-autocomplete-input"
      autoComplete="off"
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
                        {books?.map(bok=>(
                        <tr key={bok.book_id}>
                            <td>{bok.ISBN}</td>
                            <td>
                                <img
                                src={bok.cover_image_url}
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
                                <button className="action-button">Edit</button>
                                <button className="action-button" onClick={()=>removeUser(bok.book_id)}>Delete</button>
                            </td>
                            </tr>
                            ))}
                            </tbody>




                </table>
        {/* )} */}
        {book?.length === 0 && (
                                    <p>No matching users found.</p>
                                )}
            </div>
        </div>
    )
}
export default ViewBook