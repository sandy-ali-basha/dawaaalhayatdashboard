import { _AuthApi } from "api/auth";
import { Navigate } from "react-router-dom";

const ShouldNotBeLogged = ({ children }) => {
  if (_AuthApi.getToken()) {
    return <Navigate to="/dashboard/anylatics" />;
  }

  return children;
};

export default ShouldNotBeLogged;
