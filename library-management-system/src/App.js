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
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


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
import BookRecommendation from './recommendation/BookRecommendation';
import EditBook from './Book/EditBook/EditBook';
import EditUser from './User/Managed User/EditUser';
import Footer from './footer/Footer';
import ViewSingleReservedBook from './Book/ViewReservedBook/ViewSingleReservedBook';
import Fine from './fine/Fine';
import StripePayment from './fine/StripePayment';
import StripeComponent from './fine/StripePayment';


function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const stripePromise = loadStripe(process.env.REACT_APP_PUBLISH_KEY)


  useEffect(()=>{

  },[user])


  
  return (
    <>
          {/* <Navbar/> */}
          {/* <Sidebar /> */}


    <div className="App">
      {/* <Chatbot/> */}
      {/* <BookRecommendation/> */}
      <Router>
        <Routes>
            <Route exact path="/" element={<Login />} />
          {/* {user?.user_role==="admin"&&( */}
            {/* <> */}
              <Route path="/dashboard" element={<PrivateRoute><Navbar/><Dashboard /></PrivateRoute>} />  
              <Route path="/add-book" element={<PrivateRoute><Navbar/><AddBook /></PrivateRoute>} />
              <Route path="/view-book" element={<PrivateRoute><Navbar/><ViewBook /></PrivateRoute>} />
              <Route path="/book-checkout" element={<PrivateRoute><Navbar/><BookReservation /></PrivateRoute>} />
              <Route path="/book/edit/:id" element={<PrivateRoute><Navbar/><EditBook /></PrivateRoute>} />
              <Route path="/checkout" element={<PrivateRoute><Navbar/><ViewReservedBook /></PrivateRoute>} />
              <Route path="/add-user" element={<PrivateRoute><Navbar/><AddUser /></PrivateRoute>} />
              <Route path="/view-user" element={<PrivateRoute><Navbar/><ViewUser /></PrivateRoute>} />
              <Route path="/library-card/:user_id" element={<PrivateRoute><LibraryCard /></PrivateRoute>} />
              <Route path="/user/:id" element={<PrivateRoute><Navbar/><EditUser /></PrivateRoute>} />

              <Route path="/checkout/:1" element={<PrivateRoute><Navbar/><ViewSingleReservedBook /></PrivateRoute>} />  
              <Route path="/fine" element={<PrivateRoute><Navbar/><Fine /></PrivateRoute>} />  
              <Route path="/payment" element={<PrivateRoute><Navbar/><StripeComponent/></PrivateRoute>} />
                
            





              <Route path="/register" element={<Registration />} /> 
            {/* </> */}
            
            {/* )} */}
          {/* {user && user?.user_role==="student"&&( */}
            {/* <> */}
            <Route path="/recommendations" element={<PrivateRoute ><Navbar/><BookRecommendation /></PrivateRoute>} />

            <Route path="/view-book" element={<PrivateRoute><Navbar/><ViewBook /><Footer/><Chatbot/></PrivateRoute>} />
            
            {/* </> */}
            
              
            {/* )} */}



          

         </Routes>
      </Router>

    </div>
    </>
  );
}

export default App;
