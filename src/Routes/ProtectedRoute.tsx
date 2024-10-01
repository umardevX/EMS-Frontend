import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    isAuthenticated: () => boolean;
    element: React.ReactNode;
  }
  
  export function PrivateRoute({ element, isAuthenticated }: PrivateRouteProps) {
    return isAuthenticated() ? <>{element}</> : <Navigate to="/signin" replace />;
  }