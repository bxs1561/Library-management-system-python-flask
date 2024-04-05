import React, {useEffect, useState} from "react";
import "./ViewBook.css"
import book1 from "../../images/book1.jpg"


function ViewBook(){
    const [searchQuery, setSearchQuery] = useState("");
  
//   const filteredData = yourDataArray.filter((item) =>
//     item.isbn.includes(searchQuery)
//   );
  
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
      class="form-control ui-autocomplete-input"
      autocomplete="off"
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
      class="form-control ui-autocomplete-input"
      autocomplete="off"
    ></input>
  </div>
</div>

        </div>

                <table className="book___info">
                    <thead>
                        <tr>
                            <th>ISBN</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Genre</th>
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
                                src={book1}
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>Fiction</td>
                            <td>Romance</td>
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
                                src="book_image_url.jpg"
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>Fiction</td>
                            <td>Romance</td>
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
                                src="book_image_url.jpg"
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>Fiction</td>
                            <td>Romance</td>
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
                                src="book_image_url.jpg"
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>Fiction</td>
                            <td>Romance</td>
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
                                src="book_image_url.jpg"
                                alt="Book Cover"
                                className="book-cover"
                                />
                            </td>
                            <td>Fiction</td>
                            <td>Romance</td>
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
    )
}
export default ViewBook