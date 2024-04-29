import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from "../login/Login";

const PrivateRoute = ({ children, ...rest }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem("user"));
    return isAuthenticated ? children : <Navigate to="/" />;
    
    
  
};
  
export default PrivateRoute;
