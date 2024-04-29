import React, {useEffect, useState} from "react";
import "./BookReservation.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import avatar from '../../images/avatar.png'
import book1 from "../../images/book.png"
import { fetchBook } from "../../Redux/Action/BooksAction";
import { fetchUser } from "../../Redux/Action/UsersAction";




function BookReservation(){
    const [selectedDate, setSelectedDate] = useState(new Date());
    const  {user}  = useSelector((state) => state.getUser);
    const  {book}  = useSelector((state) => state.getBook);
    const [isbn, setIsbn] = useState('');


    const [userData, setUserData] = useState('');
    const [searchQuery, setSearchQuery] = useState("");
    const[title,setTitle] = useState('')
    const[checkoutDate, setCheckoutDate] = useState(new Date())
    const[dueDate, setDueDate] = useState(new Date())
    const[studentID, setStudentID] = useState('')
    const[librarianID,setLibrarianID] = useState('')

    const [users,setUsers] = useState('');
    const dispatch = useDispatch()

   

  
  useEffect(()=>{
    dispatch(fetchBook())
},[dispatch])

  useEffect(()=>{
    dispatch(fetchUser())

},[dispatch])

    const searchUserByID=(searchID)=>{

  
      const newData=_.filter(user, (usr) => {
          return (
            usr.user_id == searchID
          )
        }); 
        setUserData(newData);
        setUsers(searchID)

  }

  const searchBookByISBN=(searchISBN)=>{

  
    const newData=_.filter(book, (bok) => {

        return (
          bok.ISBN == searchISBN
        )
      }); 
      setIsbn(newData);
      setSearchQuery(searchISBN)   
}


const addCheckoutBook=async(event)=>{
  event.preventDefault();
  {userData?.map(usr=>{
    setStudentID(usr.user_id)
  })}
  {isbn?.map(bok=>{
    setTitle(bok.title)
  })}
  let year = checkoutDate.getFullYear();
  let month = ('0' + (checkoutDate.getMonth() + 1)).slice(-2); 
  let day = ('0' + checkoutDate.getDate()).slice(-2);
  let formattedCheckoutDate = `${year}-${month}-${day}`;

  let year1 = dueDate.getFullYear();
  let month1 = ('0' + (dueDate.getMonth() + 1)).slice(-2); 
  let day1 = ('0' + dueDate.getDate()).slice(-2);
  let formattedDueDate = `${year1}-${month1}-${day1}`;


  
  let checkoutBookData={
    title:title,
    checkout_date:formattedCheckoutDate,
    due_date:formattedDueDate,

  }
  dispatch(addCheckoutBook(checkoutBookData))

  }
  console.log(isbn)


 
  


  useEffect(() => {
    // Trigger initial user search when component mounts
    searchUserByID("");
    searchBookByISBN("")
   

  }, []); // Empty dependency array ensures this effect runs only once
 
 






    return(
    <div className="reservation___container">
  <div className="reserve___header">
    <h1>Issue Book</h1>
  </div>
  <div className="reservation___page">
    <div className="reservation___box">
      <form id="ReserveBook">
        <div className="reservation___card">
          <div className="reservationCard___header">
            <span className="header___title">Issue book</span>
          </div>
          <div className="card___body">
              <div className="card___container">
            <div className="reservationSearch___box">
                <div className="user___search">
                  <div className="reservationInput___user">
                    <span className="input-group-text ">Search User</span>
                    <input
                      id="user_autocomplete"
                      placeholder="Type to search."
                      type="text"
                      className="form-control ui-autocomplete-input"
                      autoComplete="off"
                      value={users}
                      onChange={(event) => searchUserByID(event.target.value)}
                    ></input>
                  </div>
                </div>
                {userData?.length === 0 ? (
                                            <UserSearch user_id={''} first_name={''}
                                                last_name={''} phone_number={''} email={''} status_value={''} user_image_url={'https://via.placeholder.com/400X400'} />
                                        ) : (
                                            userData?.map(result => (
                                                <UserSearch key={result.user_id} 
                                                user_id={result.user_id}
                                                first_name={result.first_name} 
                                                last_name={result.last_name} 
                                                phone_number={result.last_name}
                                                email={result.email} 
                                                status_value={result?.user_status.status_value} 
                                                user_image_url={result.user_image_url} />
                                                    
                                            ))
                                        )}
              </div>
              <div className="reservationSearch___box">

                <div className="user___search">
                  <div className="reservationInput___user">
                    <span className="input-group-text ">Search book</span>
                    <input
                      id="book_autocomplete"
                      placeholder="Type to search."
                      type="text"
                      className="form-control ui-autocomplete-input"
                      autoComplete="off"
                      value={searchQuery}
                      onChange={(event) => searchBookByISBN(event.target.value)}

                    ></input>
                  </div>
                </div>
                {isbn?.length === 0 ? (
                                            <BookSearch book_id={''} title={''} ISBN={''} copies_available={''} cover_image_url={'https://via.placeholder.com/400X400'} />
                                        ) : (
                                            isbn?.map(result => (
                                                <BookSearch key={result.book_id} 
                                                book_id={result.book_id} 
                                                title={result.title} 
                                                ISBN={result.ISBN} 
                                                copies_available={result.copies_available} 
                                                cover_image_url={result.cover_image_url}/>                                                    
                                            ))
                                        )}
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
    selected={checkoutDate}
    onChange={(date) => setCheckoutDate(date)}
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
    selected={dueDate}
    onChange={(date) => setDueDate(date)}
    dateFormat="MM/dd/yyyy" 
  />
</div>

                </div>
                <div className="button">
                <button onClick={addCheckoutBook}>Issue Book</button>
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
const UserSearch=({user_id,first_name,last_name,phone_number,email,status_value,user_image_url})=>{
    return(
        <div className="user___result">
              <div className="result___image">
                <img
                  src={user_image_url?user_image_url:avatar}
                  alt="img"
                  className="ui-state-default img-thumbnail"
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
                      <td>User ID : {user_id}</td>
                    </tr>
                    <tr>
                      <td>Name :{first_name + last_name}</td>
                    </tr>
                    <tr>
                      <td>phone :{phone_number}</td>
                    </tr>
                    <tr>
                      <td>email :{email}</td>
                    </tr>
                    <tr>
                      <td>status: {`${status_value}`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
    )
}

const BookSearch=({book_id,title,ISBN,copies_available,cover_image_url})=>{
    return(
        <div className="user___result">
        <div className="result___image">
          <img
            src={cover_image_url?cover_image_url:avatar}
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
                <td>book ID :{book_id}</td>
              </tr>
              <tr>
                <td>title :{title}</td>
              </tr>
              <tr>
                <td>ISBN :{ISBN}</td>
              </tr>
              <tr>
                <td>copies_available :{copies_available}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}
export default BookReservation

