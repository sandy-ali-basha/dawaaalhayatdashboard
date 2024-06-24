import React from "react";
import { Outlet } from "react-router-dom";

const AdminComponent = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminComponent;
