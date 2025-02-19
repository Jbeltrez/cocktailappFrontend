import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log('Token in ProtectedRoute:', token); // Debug log

  if (!token) {
    console.log('No token found, redirecting to login'); // Debug log
    return <Navigate to="/login" />;
  }

  console.log('Token found, rendering protected content'); // Debug log
  return children;
};

export default ProtectedRoute; 