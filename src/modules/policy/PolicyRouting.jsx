
import React from "react";
import { Route, Routes } from "react-router-dom";
import PolicyIndex from "./pages/PolicyIndex";
import PolicyCreate from "./pages/PolicyCreate";
import PolicyComponent from "./PolicyComponent";

const PolicyRouting = () => {
  return (
    <Routes>
      <Route element={<PolicyComponent />}>
        <Route path="/" element={<PolicyIndex />} />
        <Route path="/create" element={<PolicyCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default PolicyRouting;
