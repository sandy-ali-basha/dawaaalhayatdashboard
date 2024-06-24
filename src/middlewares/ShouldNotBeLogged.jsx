import { _AuthApi } from "api/auth";
import { Navigate } from "react-router-dom";

const ShouldNotBeLogged = ({ children }) => {
  //todo un comment this
  // if (_AuthApi.getToken()) {
  //   return <Navigate to="/dashboard" />;
  // }

  return children;
};

export default ShouldNotBeLogged;
