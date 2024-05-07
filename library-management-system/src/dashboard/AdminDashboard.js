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
      
<div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>  
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>  

          <Route path="/add-user" element={<PrivateRoute><AddUser /></PrivateRoute>} />
          <Route path="/view-user" element={<PrivateRoute><ViewUser /></PrivateRoute>} />
          <Route path="/library-card/:user_id" element={<PrivateRoute><LibraryCard /></PrivateRoute>} />
          <Route path="/add-book" element={<PrivateRoute><AddBook /></PrivateRoute>} />
          <Route path="/view-book" element={<PrivateRoute><ViewBook /></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><ViewReservedBook /></PrivateRoute>} />
          <Route path="/book-checkout" element={<PrivateRoute><BookReservation /></PrivateRoute>} />

          



          {/* <Route path="/register" element={<Registration/>} />  */}



          

         </Routes>
      </Router>
      </div>
    )
}
export default AdminDashboard