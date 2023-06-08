import React from "react";
import Login from "../components/Login/Login.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useSelector((state) => state.pegawai);
  
  useEffect(() => {
    if (isAuthenticated === true && role === 2){
      navigate("/dashboard");
    }
    else if (isAuthenticated === true && role === 1){
      navigate("/manager-dashboard");
    }
  // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
