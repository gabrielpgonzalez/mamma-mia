import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PublicOnlyRoute = ({ children }) => {
  const { token } = useUser();
  if (token) return <Navigate to="/" replace />;
  return children;
};

export default PublicOnlyRoute;
