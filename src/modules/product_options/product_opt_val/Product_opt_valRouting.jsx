
import React from "react";
import { Route, Routes } from "react-router-dom";
import Product_opt_valComponent from "./Product_opt_valComponent";
import Product_opt_valIndex from "./pages/Product_opt_valIndex";
import Product_opt_valView from "./pages/Product_opt_valView";
import Product_opt_valCreate from "./pages/Product_opt_valCreate";

const Product_opt_valRouting = () => {
  return (
    <Routes>
      <Route element={<Product_opt_valComponent />}>
        <Route path="/:id" element={<Product_opt_valIndex />} />
        <Route path=":id/view/:id" element={<Product_opt_valView />} />
        <Route path=":id/create" element={<Product_opt_valCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default Product_opt_valRouting;
