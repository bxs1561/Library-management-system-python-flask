import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate, Link
  } from "react-router-dom";
  
import Dashboard from './Dashboard';
import Login from '../login/Login';
import Registration from '../Registration/Registration'
import AddUser from '../User/Managed User/AddUser'
import ViewUser from "../User/Managed User/ViewUser";
import LibraryCard from "../User/Managed User/LibraryCard";
import AddBook from "../Book/AddBook/AddBook"
import { useSelector, useDispatch } from 'react-redux'
import ViewBook from "../Book/ViewBook/ViewBook";
import ViewReservedBook from "../Book/ViewReservedBook/ViewReservedBook";
import BookReservation from "../Book/BookReservation/BookReservation";
import PrivateRoute from "../PrivateRoute/PrivateRoute";



function AdminDashboard(){
 

    return(
      
<div className="board">
<Dashboard />
<Login/>
      </div>
    )
}
export default AdminDashboard