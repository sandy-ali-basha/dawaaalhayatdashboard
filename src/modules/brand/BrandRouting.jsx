
import React from "react";
import { Route, Routes } from "react-router-dom";
import BrandComponent from "./BrandComponent";
import BrandIndex from "./pages/BrandIndex";
import BrandUpdate from "./pages/BrandUpdate";
import BrandView from "./pages/BrandView";
import BrandCreate from "./pages/BrandCreate";

const BrandRouting = () => {
  return (
    <Routes>
      <Route element={<BrandComponent />}>
        <Route path="/" element={<BrandIndex />} />
        <Route path="/update/:id" element={<BrandUpdate />} />
        <Route path="/view/:id" element={<BrandView />} />
        <Route path="/create" element={<BrandCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default BrandRouting;
