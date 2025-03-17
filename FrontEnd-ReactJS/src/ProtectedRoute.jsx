import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = sessionStorage.getItem("token"); // Get token from local storage

  return token ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;