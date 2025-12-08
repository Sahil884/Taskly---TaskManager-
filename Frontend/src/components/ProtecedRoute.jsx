import { Navigate } from "react-router-dom";

const ProtecedRoute = ({ children, authenticated }) => {
  return authenticated ? children : <Navigate to="/" replace />;
};

export default ProtecedRoute;
