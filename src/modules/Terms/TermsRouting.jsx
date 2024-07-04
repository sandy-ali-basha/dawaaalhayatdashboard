
import React from "react";
import { Route, Routes } from "react-router-dom";
import TermsComponent from "./TermsComponent";
import TermsIndex from "./pages/TermsIndex";
import TermsCreate from "./pages/TermsCreate";
import TermsView from "./pages/TermsView";

const TermsRouting = () => {
  return (
    <Routes>
      <Route element={<TermsComponent />}>
        <Route path="/" element={<TermsIndex />} />
        <Route path="/create" element={<TermsCreate />} />
        <Route path="/view/:id" element={<TermsView />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default TermsRouting;