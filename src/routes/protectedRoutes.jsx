import React, { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


function ProtectedRoutes() {
  const token = JSON.parse(localStorage.getItem('access-token'));
  return token ? <Outlet /> : <Navigate to="login" />;
}

export default ProtectedRoutes;
