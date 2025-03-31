import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRouteGuard = ({ element: Component, ...rest }) => {
    
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Component {...rest} />; // Si no tiene acceso, muestra "NotFound"
  }

  return <Navigate to="/auth/login" />;
};
