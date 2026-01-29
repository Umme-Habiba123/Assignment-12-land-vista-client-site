import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (user && user.role === "admin") return children ;

  return <Navigate to="/" replace />;
};

export default AdminRoute ;
