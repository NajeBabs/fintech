import React from "react";
import { Navigate } from "react-router-dom";

// Wrap protected pages with this
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check login
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
