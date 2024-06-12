import Login from "./login/Login";
import ViewBook from './Book/viewBook/ViewBook';
import AddBook from './Book/addBook/AddBook';
import BookReservation from './Book/checkoutBook/CheckoutBook';
import ViewReservedBook from './Book/viewCheckoutBook/ViewCheckoutBook';
import AddUser from './User/Managed User/AddUser';
import ViewUser from './User/Managed User/ViewUser';
import LibraryCard from './User/Managed User/LibraryCard';
import Dashboard from './dashboard/Dashboard';
import VisitorStats from './Visitor/VisitorStats'
import PopularBooks from './Book/popularBook/PopularBook'
import Registration from './Registration/Registration'
import React, {useEffect, useState} from "react";


import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import Navbar from './navbar/Navbar';
import PrivateRoute from './privateRoute/PrivateRoute'
import Chatbot from './chatbot/Chatbot';
import BookRecommendation from './recommendation/BookRecommendation';
import EditBook from './Book/editBook/EditBook';
import EditUser from './User/Managed User/EditUser';
import Footer from './footer/Footer';
import ViewSingleReservedBook from './Book/viewCheckoutBook/ViewSingleCheckoutBook';


function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>


    <div className="App">
      {/* <Chatbot/> */}
      {/* <BookRecommendation/> */}
      <Router>
        <Routes>
            <Route exact path="/" element={<Login />} />
          {/* {user?.user_role==="admin"&&( */}
            {/* <> */}
              <Route path="/dashboard" element={<PrivateRoute><Navbar/><Dashboard /></PrivateRoute>} />  
              <Route path="/add-book" element={<PrivateRoute requiredRole="admin"><Navbar/><AddBook /></PrivateRoute>} />
              <Route path="/view-book" element={<PrivateRoute ><Navbar/><ViewBook /></PrivateRoute>} />
              <Route path="/book-checkout" element={<PrivateRoute requiredRole="admin"><Navbar/><BookReservation /></PrivateRoute>} />
              <Route path="/book/edit/:id" element={<PrivateRoute requiredRole="admin"><Navbar/><EditBook /></PrivateRoute>} />
              <Route path="/checkout" element={<PrivateRoute requiredRole="admin"><Navbar/><ViewReservedBook /></PrivateRoute>} />
              <Route path="/add-user" element={<PrivateRoute requiredRole="admin"><Navbar/><AddUser /></PrivateRoute>} />
              <Route path="/view-user" element={<PrivateRoute requiredRole="admin"><Navbar/><ViewUser /></PrivateRoute>} />
              <Route path="/library-card/:user_id" element={<PrivateRoute requiredRole="admin"><LibraryCard /></PrivateRoute>} />
              <Route path="/user/:id" element={<PrivateRoute requiredRole="admin"><Navbar/><EditUser /></PrivateRoute>} />

              <Route path="/checkout/:student_id" element={<PrivateRoute requiredRole="student"><Navbar/><ViewSingleReservedBook /></PrivateRoute>} />  
              {/* <Route path="/payment" element={<PrivateRoute><Navbar/><StripeComponent/></PrivateRoute>} /> */}
              <Route path="/unauthorized" element={<Unauthorized />} />

                
            





              <Route path="/register" element={<Registration />} /> 
            {/* </> */}
            
            {/* )} */}
          {/* {user && user?.user_role==="student"&&( */}
            {/* <> */}
            <Route path="/recommendations" element={<PrivateRoute requiredRole="student"><Navbar/><BookRecommendation /></PrivateRoute>} />

            <Route path="/view-book" element={<PrivateRoute requiredRole="student"><Navbar/><ViewBook /><Footer/><Chatbot/></PrivateRoute>} />
            
            {/* </> */}
            
              
            {/* )} */}



          

         </Routes>
      </Router>

    </div>
    </>
  );

}
const Unauthorized = () => {
  return <h1>You are not authorized to view this page</h1>;
};

export default App;
