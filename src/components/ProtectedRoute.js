import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ logged_in, children }) => {
    if (!logged_in) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

export default ProtectedRoute