
import React from "react";
import { Route, Routes } from "react-router-dom";
import Product_typeComponent from "./Product_typeComponent";
import Product_typeIndex from "./pages/Product_typeIndex";
import Product_typeUpdate from "./pages/Product_typeUpdate";
import Product_typeView from "./pages/Product_typeView";
import Product_typeCreate from "./pages/Product_typeCreate";

const Product_typeRouting = () => {
  return (
    <Routes>
      <Route element={<Product_typeComponent />}>
        <Route path="/" element={<Product_typeIndex />} />
        <Route path="/update/:id" element={<Product_typeUpdate />} />
        <Route path="/view/:id" element={<Product_typeView />} />
        <Route path="/create" element={<Product_typeCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default Product_typeRouting;
