import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';

const AuthRoute = ({ element: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return !user ? (
    Component
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AuthRoute;