import React, {useEffect, useState} from "react";
import book1 from "../../images/book.png"
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import "./ViewCheckoutBook.css"
import axios from '../../API/axios'
import { bookCheckout } from "../../redux/action/booksAction";
import Modal from "../../modal/Modal";

/**
 * View all checkout book in table.
 */
function ViewCheckoutBook(){
    const dispatch = useDispatch();
    const  {checkoutBook}  = useSelector((state) => state.checkoutBooks);
    const  {payment}  = useSelector((state) => state.getPayment);


    const [checkoutBooks, setCheckoutBooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[return_date, setReturnDate] = useState(new Date())
    const [selectedFine, setSelectedFine] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10); 
    const [isPaymentApprove, setIsPaymentApprove] = useState(false);



    useEffect(()=>{
        setCheckoutBooks(checkoutBook)
    },[checkoutBook])

    // useEffect(()=>{
    //     dispatch(bookCheckout())
    // },[dispatch])
    useEffect(()=>{
        payment?.map(pay=>{
            setIsPaymentApprove(pay?.is_approved)
        })
    })

    
    /**
     * search book in checkout table by name.
     */
    const searchCheckoutBookByUserName=(searchTerm)=>{
        const lowerCaseSearchTerm = searchTerm.toUpperCase();
        const newData=_.filter(checkoutBook, (usr) => {
            return (
                usr.student.user.first_name.toUpperCase().includes(lowerCaseSearchTerm) ||
                usr.student.user.last_name.toUpperCase().includes(lowerCaseSearchTerm)
            )
          });
        setCheckoutBooks(newData)
        setSearchTerm(searchTerm)
    }

    /**
     * display modal with fine and date.
     */
    const handleToggleModal = (fine) => {
        setSelectedFine(fine)
        setIsModalOpen(!isModalOpen);
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooksCheckout = checkoutBooks?.slice(indexOfFirstBook, indexOfLastBook);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(
        <div className="reserved___container">
            <div className="heading___title">
                <h1>Reserved Book List</h1>
            </div>
            <div className="card">
                <div className="card___body">
                <div className="search___box">
                <div className="user___search">
                  <div className="input___user">
                    <span className="input-group-text ">Search User</span>
                    <input
                      id="user_autocomplete"
                      placeholder="Type to search."
                      type="text"
                      className="form-control ui-autocomplete-input"
                      autoComplete="off"
                      value={searchTerm}
                      onChange={(event) => searchCheckoutBookByUserName(event.target.value)}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="reserved___row" style={{overflowX:"auto",overflow:"auto"}}>
                <div className="reservedbook___info">
                    {checkoutBooks?.length>0&&(
                        <table className="reservedbook___table">
                            <thead>
                                <tr>
                                    <th>Book ID</th>
                                    <th>User Image</th>
                                    <th>Book Image</th>
                                    <th>Issue Date</th>
                                    <th>Due date</th>
                                    <th>Borrow days</th>
                                    <th>Fine</th>
                                    <th>Recieved</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        <tbody>
                            {currentBooksCheckout?.map(checkout=>(
                                <tr key={checkout.checkout_id}>
                                    <td>{checkout.books.book_id}</td>
                                    <td>
                                        {checkout.student.user.first_name}<br></br>{checkout.student.user.last_name}
                                    </td>
                                    <td>
                                        <img
                                        src={checkout.books.cover_image_url?checkout.books.cover_image_url:book1}
                                        alt="Book Cover"
                                        className="book-cover"
                                        />
                                    </td>
                                    <td>{checkout.checkout_date}</td>
                                    <td>{checkout.due_date}</td>
                                    <td>
                                        {checkout.borrow_days}
                                    </td>
                                    <td>
                                        ${checkout.student.fine_balance}
                                    </td>
                                    <td>
                                        {isPaymentApprove?'Recieved':'Pending'}
                                    </td>
                                    <td>
                                        <button onClick={() => handleToggleModal(checkout.student.fine_balance)} className="fine___button">
                                            <i style={{width:"30px",fontSize:"20px"}}className='bx bx-wallet'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
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
                            className={currentBooksCheckout?.length < booksPerPage?"pagination-button disabled":"pagination-button"}
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentBooksCheckout?.length < booksPerPage}
                            >
                                Next
                            </li>
                        </ul>
                        {currentBooksCheckout?.length === 0 && (
                            <p>No book checkout.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
            {isModalOpen && <Modal fine={selectedFine} onClose={handleToggleModal} setFine={setSelectedFine} return_date={return_date} setReturnDate={setReturnDate}/>}
    </div>
    )
}
export default ViewCheckoutBook;