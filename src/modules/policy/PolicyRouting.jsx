import React from "react";
import { Route, Routes } from "react-router-dom";
import PolicyIndex from "./pages/PolicyIndex";
import PolicyCreate from "./pages/PolicyCreate";
import PolicyComponent from "./PolicyComponent";
import NotFound from "components/NotFound";

const PolicyRouting = () => {
  return (
    <Routes>
      <Route element={<PolicyComponent />}>
        <Route path="/" element={<PolicyIndex />} />
        <Route path="/create" element={<PolicyCreate />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PolicyRouting;
