import logo from './logo.svg';
import Login from "./login/Login";
import ViewBook from './Book/ViewBook/ViewBook';
import AddBook from './Book/AddBook/AddBook';
import BookReservation from './Book/BookReservation/BookReservation';
import ViewReservedBook from './Book/ViewReservedBook/ViewReservedBook';
import AddUser from './User/Managed User/AddUser';
import ViewUser from './User/Managed User/ViewUser';
import LibraryCard from './User/Managed User/LibraryCard';
import Dashboard from './dashboard/Dashboard';
import VisitorStats from './Visitor/VisitorStats'
import PopularBooks from './Book/PopularBook/PopularBook'
import Registration from './Registration/Registration'
import React, {useEffect, useState} from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate, Link
} from "react-router-dom";
import AdminDashboard from './dashboard/AdminDashboard';
import Navbar from './navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import Sidebar from './sidebar/SideBar';
import StudentDashboard from './dashboard/StudentDashboard';
import Chatbot from './chatbot/Chatbot';


function App() {

  
  return (
    <>
          {/* <Navbar/> */}
          {/* <Sidebar /> */}


    <div className="App">
      <Chatbot/>
      {/* <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>  
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>  
          <Route path="/student" element={<PrivateRoute><StudentDashboard /></PrivateRoute>}/>  

          <Route path="/add-user" element={<PrivateRoute><AddUser /></PrivateRoute>} />
          <Route path="/view-user" element={<PrivateRoute><ViewUser /></PrivateRoute>} />
          <Route path="/library-card/:user_id" element={<PrivateRoute><LibraryCard /></PrivateRoute>} />
          <Route path="/add-book" element={<PrivateRoute><AddBook /></PrivateRoute>} />
          <Route path="/view-book" element={<PrivateRoute><ViewBook /></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><ViewReservedBook /></PrivateRoute>} />
          <Route path="/book-checkout" element={<PrivateRoute><BookReservation /></PrivateRoute>} />


          



          <Route path="/register" element={<Registration/>} /> 



          

         </Routes>
      </Router> */}

        {/* <ViewBook/> */}
        {/* <AddBook/> */}
        {/* <BookReservation/> */}
        {/* <ViewReservedBook/> */}
        {/* <AddUser/> */}
        {/* <ViewUser/> */}
        {/* <LibraryCard/> */}
        {/* <Dashboard/> */}
        {/* <VisitorStats/> */}
        {/* <PopularBooks/> */}
        {/* <Registration/> */}
    </div>
    </>
  );
}

export default App;
