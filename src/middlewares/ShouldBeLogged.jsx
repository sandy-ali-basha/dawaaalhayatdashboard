import { _AuthApi } from "api/auth";
import { Navigate, useLocation } from "react-router-dom";

const ShouldBeLogged = ({ children }) => {
  let location = useLocation();
  //todo uncomment this
  // if (!_AuthApi.getToken()) {
  //   // if (false) {
  //   // Redirect them to the /login page, but save the current location they were
  //   // trying to go to when they were redirected. This allows us to send them
  //   // along to that page after they login, which is a nicer user experience
  //   // than dropping them off on the home page.
  //   return <Navigate to="/" state={location.pathname} replace />;
  //   // return <Navigate to="/home" />;
  // }

  return children;
};

export default ShouldBeLogged;
