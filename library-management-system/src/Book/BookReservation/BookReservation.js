import React, {useEffect, useState} from "react";
import "./BookReservation.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookReservation(){
    const [selectedDate, setSelectedDate] = useState(new Date());

    return(
    <div className="reservation___container">
  <div className="reserve___header">
    <h1>Issue Book</h1>
  </div>
  <div className="reservation___page">
    <div className="reservation___box">
      <form id="ReserveBook">
        <div className="card">
          <div className="card___header">
            <span className="header___title">Issue book</span>
          </div>
          <div className="card___body">
              <div className="card___container">
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
              <UserSearch/>
              </div>
              <div className="search___box">

                <div className="user___search">
                  <div className="input___user">
                    <span className="input-group-text ">Search book</span>
                    <input
                      id="book_autocomplete"
                      placeholder="Type to search."
                      type="text"
                      class="form-control ui-autocomplete-input"
                      autocomplete="off"
                    ></input>
                  </div>
                </div>
              <BookSearch/>
            </div>
            <div>

            </div>
            </div>
            <div className="card___container">
                <div className="date___wrapper">
                <div className="date">
                    <div className="issue___text">
                    <span className="issue___date">Issue Date</span>

                    </div>
                    <div className="date-picker">
  <DatePicker
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
    dateFormat="MM/dd/yyyy" 
  />
</div>

                </div>
                <div className="date">
                    <div className="issue___text">
                    <span className="issue___date">Expected Return Date</span>

                    </div>
                    <div className="date-picker">
  <DatePicker
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
    dateFormat="MM/dd/yyyy" 
  />
</div>

                </div>
                <div className="button">
                <button >Issue Book</button>
                </div>

            
            </div>
            </div>
            </div>
            </div>
            </form>
            </div>
        </div>
        </div>

    )
}
const UserSearch=()=>{
    return(
        <div className="user___result">
              <div className="result___image">
                <img
                  src="https://via.placeholder.com/400X400"
                  alt="img"
                  class="ui-state-default img-thumbnail"
                />
              </div>
              <div className="user___right">
                <input type="hidden" id="user_id" />
                <input type="hidden" id="user_id" />
                <input type="hidden" id="user_id" />
                <table className="user___listTable">
                  <thead>
                    <tr>
                      <th>User ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>User ID :</td>
                    </tr>
                    <tr>
                      <td>User ID :</td>
                    </tr>
                    <tr>
                      <td>User ID :</td>
                    </tr>
                    <tr>
                      <td>User ID :</td>
                    </tr>
                    <tr>
                      <td>User ID :</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
    )
}

const BookSearch=()=>{
    return(
        <div className="user___result">
        <div className="result___image">
          <img
            src="https://via.placeholder.com/400X400"
            alt="img"
            className="ui-state-default img-thumbnail"
          />
        </div>
        <div className="user___right">
          <input type="hidden" id="book_id" />
          <input type="hidden" id="book_id" />
          <input type="hidden" id="book_id" />
          <table className="user___listTable">
            <thead>
              <tr>
                <th>book ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>book ID :</td>
              </tr>
              <tr>
                <td>book ID :</td>
              </tr>
              <tr>
                <td>book ID :</td>
              </tr>
              <tr>
                <td>book ID :</td>
              </tr>
              <tr>
                <td>book ID :</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}
export default BookReservation

