
import React from "react";
import { Route, Routes } from "react-router-dom";
import TaxComponent from "./TaxComponent";
import TaxIndex from "./pages/TaxIndex";
import TaxUpdate from "./pages/TaxUpdate";
import TaxView from "./pages/TaxView";
import TaxCreate from "./pages/TaxCreate";

const TaxRouting = () => {
  return (
    <Routes>
      <Route element={<TaxComponent />}>
        <Route path="/" element={<TaxIndex />} />
        <Route path="/update/:id" element={<TaxUpdate />} />
        <Route path="/view/:id" element={<TaxView />} />
        <Route path="/create" element={<TaxCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default TaxRouting;
