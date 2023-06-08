import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const HomeProtectedRoute = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.pegawai);

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if(isAuthenticated && role !== 1){
      return <Navigate to="/manager-dashboard" replace />;
    }
    if(isAuthenticated && role !== 2){
        return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

export default HomeProtectedRoute;