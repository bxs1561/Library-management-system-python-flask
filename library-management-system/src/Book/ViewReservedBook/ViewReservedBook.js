import React, {useEffect, useState} from "react";
import person1 from "../../images/person1.jpg"
import book1 from "../../images/book1.jpg"
import { useSelector, useDispatch } from 'react-redux'

import "./ViewReservedBook.css"

import axios from '../../API/axios'
import { getChceckoutBookFailure, getChceckoutBookRequest, getChceckoutBookSuccess } from "../../Redux/action";


function ViewReservedBook(){
    const dispatch = useDispatch();
    const  {checkoutBook}  = useSelector((state) => state.checkoutBooks);


    const getCheckout=async()=>{
        dispatch(getChceckoutBookRequest())
        try{
            const response = await axios.get('/books/checkout')
            const responseData = response.data
            dispatch(getChceckoutBookSuccess(responseData));

        }catch(error){
            dispatch(getChceckoutBookFailure(error))

        }
    }
    useEffect(()=>{
        getCheckout()
    },[])
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
                    ></input>
                  </div>
                </div>
              </div>
                    <div className="reserved___row">
                        <div className="reservedbook___info">
                            {checkoutBook?.length>0&&(
                            <table className="reservedbook___table">
                            <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>User Image</th>
                            <th>Book Image</th>
                            <th>Reserved Date</th>
                            <th>Expected Return Date</th>
                            <th>Return date</th>
                            <th>Borrow days</th>
                            <th>Fine</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkoutBook?.map(checkout=>(
                        <tr>
                            <td>{checkout.books.book_id}</td>
                            <td>
                                <img
                                src={checkout.student.user.user_image_url}
                                alt="user Cover"
                                className="user-cover"
                                />
                            </td>
                            <td>
                                <img
                                src={checkout.books.cover_image_url}
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>{checkout.checkout_date}</td>
                            <td>{checkout.due_date}</td>
                            <td>{checkout.return_date}</td>
                            <td>
                                {checkout.borrow_days}
                            </td>
                            <td>
                                ${checkout.student.fine_balance}
                            </td>
                            <td>
                                <button className="action-button">Edit</button>
                                <button className="action-button">Delete</button>
                            </td>
                            </tr>
                            ))}
                            
                            </tbody>

                            </table>
                            )}
                            {checkoutBook?.length === 0 && (
                                    <p>No book checkout.</p>
                                )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewReservedBook;