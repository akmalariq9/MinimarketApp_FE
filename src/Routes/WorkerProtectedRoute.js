import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const WorkerProtectedRoute = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.pegawai);

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    else if(isAuthenticated && role !== 2){
      return <Navigate to="/login" replace />;
    }
    return children;
  };

export default WorkerProtectedRoute;