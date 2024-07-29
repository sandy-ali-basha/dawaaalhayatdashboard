import React from "react";
import { Route, Routes } from "react-router-dom";
import Product_attributes_valuesComponent from "./Product_attributes_valuesComponent";
import Product_attributes_valuesIndex from "./pages/Product_attributes_valuesIndex";
import Product_attributes_valuesUpdate from "./pages/Product_attributes_valuesUpdate";
import Product_attributes_valuesCreate from "./pages/Product_attributes_valuesCreate";

const Product_attributes_valuesRouting = () => {
  return (
    <Routes>
      <Route element={<Product_attributes_valuesComponent />}>
        <Route path="/:id" element={<Product_attributes_valuesIndex />} />
        <Route
          path="/update/:id"
          element={<Product_attributes_valuesUpdate />}
        />
        <Route
          path=":id/create"
          element={<Product_attributes_valuesCreate />}
        />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default Product_attributes_valuesRouting;
