import React from "react";
import { Outlet } from "react-router-dom";
const homeComponent = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default homeComponent
