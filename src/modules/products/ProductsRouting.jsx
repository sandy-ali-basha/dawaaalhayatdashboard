
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductsComponent from "./ProductsComponent";
import ProductsIndex from "./pages/ProductsIndex";
import ProductsUpdate from "./pages/ProductsUpdate";
import ProductsView from "./pages/ProductsView";
import ProductsCreate from "./pages/ProductsCreate";

const ProductsRouting = () => {
  return (
    <Routes>
      <Route element={<ProductsComponent />}>
        <Route path="/" element={<ProductsIndex />} />
        <Route path="/update/:id" element={<ProductsUpdate />} />
        <Route path="/view/:id" element={<ProductsView />} />
        <Route path="/create" element={<ProductsCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default ProductsRouting;
