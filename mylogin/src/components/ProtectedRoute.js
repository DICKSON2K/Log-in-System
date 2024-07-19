import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, user }) => {
  return user ? <Element /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
