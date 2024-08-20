import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element }) => {
  const { user } = useAuth(); // Obtenez l'état de l'utilisateur depuis le contexte d'authentification

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
