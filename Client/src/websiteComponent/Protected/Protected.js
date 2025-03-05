import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading} = useAuth();

  if (loading) return <div>loading</div>

  if (!user) {
    return <Navigate to="/login"/>;
  }

  return <Outlet name='dashboard' />;
};

export default ProtectedRoute;