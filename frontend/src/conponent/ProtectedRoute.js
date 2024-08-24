import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Mock authentication check function
const isAuthenticated = () => {
  // This should be replaced with real authentication logic
  // For example, checking if a token is stored in localStorage
  return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ element: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated() ? (
          Component
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
