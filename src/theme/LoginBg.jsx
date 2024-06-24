import React from "react";

import svg from "../assets/images/wave.svg"
const LoginBg = ({ children }) => {

  return (
    <div className="login">
      <img className="wave" src={svg} alt="svg" />
      {children}
    </div>
  );
};

export default LoginBg;
