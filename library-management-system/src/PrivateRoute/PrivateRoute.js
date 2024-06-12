import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  // return isAuthenticated  ? children : <Navigate to="/" />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.user_role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};
export default PrivateRoute;
