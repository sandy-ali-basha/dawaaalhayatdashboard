
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductComponent from "./ProductComponent";
import ProductIndex from "./pages/ProductIndex";
import ProductUpdate from "./pages/ProductUpdate";
import ProductView from "./pages/ProductView";
import ProductCreate from "./pages/ProductCreate";

const ProductRouting = () => {
  return (
    <Routes>
      <Route element={<ProductComponent />}>
        <Route path="/" element={<ProductIndex />} />
        <Route path="/update/:id" element={<ProductUpdate />} />
        <Route path="/view/:id" element={<ProductView />} />
        <Route path="/create" element={<ProductCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default ProductRouting;
