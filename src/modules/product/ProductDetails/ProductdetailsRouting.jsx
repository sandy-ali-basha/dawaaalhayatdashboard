import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductdetailsComponent from "./ProductdetailsComponent";
import ProductdetailsIndex from "./pages/ProductdetailsIndex";
import ProductdetailsUpdate from "./pages/ProductdetailsUpdate";
import ProductdetailsCreate from "./pages/ProductdetailsCreate";

const ProductdetailsRouting = () => {
  return (
    <Routes>
      <Route element={<ProductdetailsComponent />}>
        <Route path="/" element={<ProductdetailsIndex />} />
        <Route path="/update" element={<ProductdetailsUpdate />} />
        <Route path="/create" element={<ProductdetailsCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default ProductdetailsRouting;
