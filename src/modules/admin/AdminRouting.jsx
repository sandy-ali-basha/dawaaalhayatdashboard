import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminComponent from "./AdminComponent";
import AdminIndex from "./pages/AdminIndex";
import AdminUpdate from "./pages/AdminUpdate";
import AdminCreate from "./pages/AdminCreate";
import AdminView from "./pages/AdminView";
import NotFound from "components/NotFound";

const AdminRouting = () => {
  return (
    <Routes>
      <Route element={<AdminComponent />}>
        <Route path="/" element={<AdminIndex />} />
        <Route path="/update/:id" element={<AdminUpdate />} />
        <Route path="/view/:id" element={<AdminView />} />
        <Route path="/create" element={<AdminCreate />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRouting;
