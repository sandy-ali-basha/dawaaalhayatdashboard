/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Route, Routes } from "react-router-dom";
import Product_attributes_valuesComponent from "./Product_attributes_sub_valuesComponent";
import Product_attributes_valuesIndex from "./pages/Product_attributes_valuesIndex";
import Product_attributes_valuesUpdate from "./pages/Product_attributes_valuesUpdate";
import Product_attributes_valuesCreate from "./pages/Product_attributes_valuesCreate";
import NotFound from "components/NotFound";
import Product_attributes_sub_valuesRouting from "./product_attributes_sub_values/Product_attributes_sub_valuesRouting";

const Product_attributes_valuesRouting = () => {
  return (
    <Routes>
      <Route element={<Product_attributes_valuesComponent />}>
        <Route path="/:id" element={<Product_attributes_valuesIndex />} />
        <Route path="/:id/*" element={<Product_attributes_sub_valuesRouting />} />
        <Route
          path="/update/:id"
          element={<Product_attributes_valuesUpdate />}
        />
        <Route
          path=":id/create"
          element={<Product_attributes_valuesCreate />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Product_attributes_valuesRouting;
