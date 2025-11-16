/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Route, Routes } from "react-router-dom";
import Product_attributes_sub_valuesComponent from "./Product_attributes_sub_valuesComponent";
import Product_attributes_sub_valuesIndex from "./pages/Product_attributes_sub_valuesIndex";
import Product_attributes_sub_valuesUpdate from "./pages/Product_attributes_sub_valuesUpdate";
import Product_attributes_sub_valuesCreate from "./pages/Product_attributes_sub_valuesCreate";
import NotFound from "components/NotFound";

const Product_attributes_sub_valuesRouting = () => {
  return (
    <Routes>
      <Route element={<Product_attributes_sub_valuesComponent />}>
        <Route path="/:id" element={<Product_attributes_sub_valuesIndex />} />
        <Route
          path="/update/:id"
          element={<Product_attributes_sub_valuesUpdate />}
        />
        <Route
          path=":id/create"
          element={<Product_attributes_sub_valuesCreate />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Product_attributes_sub_valuesRouting;
