import React, {useEffect, useState} from "react";
import person1 from "../../images/person1.jpg"
import book1 from "../../images/book1.jpg"
import "./ViewReservedBook.css"


function ViewReservedBook(){
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
                      class="form-control ui-autocomplete-input"
                      autocomplete="off"
                    ></input>
                  </div>
                </div>
              </div>
                    <div className="reserved___row">
                        <div className="reservedbook___info">
                            <table className="reservedbook___table">
                            <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>User Image</th>
                            <th>Book Image</th>
                            <th>Reserved Date</th>
                            <th>Return Date</th>
                            <th>Quanitiy</th>
                            <th>Description</th>
                            <th>Borrow</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>123456789</td>
                            <td>
                                <img
                                src={person1}
                                alt="user Cover"
                                className="user-cover"
                                />
                            </td>
                            <td>
                                <img
                                src={book1}
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>9/10/2023</td>
                            <td>9/15/2023</td>
                            <td>5</td>
                            <td>
                                A captivating novel about love and adventure.
                            </td>
                            <td>
                                0
                            </td>
                            <td>
                                <button className="action-button">Edit</button>
                                <button className="action-button">Delete</button>
                            </td>
                            </tr>
                            <tr>
                            <td>123456789</td>
                            
                            <td>
                                <img
                                src={person1}
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>
                                <img
                                src={book1}
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>9/10/2023</td>
                            <td>9/15/2023</td>
                            <td>5</td>
                            <td>
                                A captivating novel about love and adventure.
                            </td>
                            <td>
                                0
                            </td>
                            <td>
                                <button className="action-button">Edit</button>
                                <button className="action-button">Delete</button>
                            </td>
                            </tr>
                            <tr>
                            <td>123456789</td>
                            <td>
                                <img
                                src={person1}
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>
                                <img
                                src={book1}
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>9/10/2023</td>
                            <td>9/15/2023</td>
                            <td>5</td>
                            <td>
                                A captivating novel about love and adventure.
                            </td>
                            <td>
                                0
                            </td>
                            <td>
                                <button className="action-button">Edit</button>
                                <button className="action-button">Delete</button>
                            </td>
                            </tr>
                            <tr>
                            <td>123456789</td>
                            
                            <td>
                                <img
                                src={person1}
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>
                                <img
                                src={book1}
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>9/10/2023</td>
                            <td>9/15/2023</td>
                            <td>5</td>
                            <td>
                                A captivating novel about love and adventure.
                            </td>
                            <td>
                                0
                            </td>
                            <td>
                                <button className="action-button">Edit</button>
                                <button className="action-button">Delete</button>
                            </td>
                            </tr>
                            <tr>
                            <td>123456789</td>
                            <td>
                                <img
                                src={person1}
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>
                                <img
                                src={book1}
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>9/10/2023</td>
                            <td>9/15/2023</td>
                            <td>5</td>
                            <td>
                                A captivating novel about love and adventure.
                            </td>
                            <td>
                                0
                            </td>
                            <td>
                                <button className="action-button">Edit</button>
                                <button className="action-button">Delete</button>
                            </td>
                            </tr>
                            </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewReservedBook;