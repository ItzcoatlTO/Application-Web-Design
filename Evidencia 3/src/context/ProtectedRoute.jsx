// /src/context/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Usamos el contexto de autenticación

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();  // Obtener el usuario logueado desde el contexto
  
  if (!user) {
    return <Navigate to="/" />;  // Redirige a la página de inicio si no hay usuario
  }

  return children;  // Muestra la vista protegida si el usuario está logueado
};

export default ProtectedRoute;
