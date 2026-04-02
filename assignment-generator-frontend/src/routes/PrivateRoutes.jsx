import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(Auth);

  if (loading) return null;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;