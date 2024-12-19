import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (!token) {
    // Redirect to login while saving the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If we're on login page and have token, redirect to home
  if (location.pathname === '/login' && token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 