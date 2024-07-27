
import React from "react";
import { Route, Routes } from "react-router-dom";
import Product_medicalFormComponent from "./Product_medicalFormComponent";
import Product_medicalFormIndex from "./pages/Product_medicalFormIndex";
import Product_medicalFormView from "./pages/Product_medicalFormView";
import Product_medicalFormCreate from "./pages/Product_medicalFormCreate";

const Product_medicalFormRouting = () => {
  return (
    <Routes>
      <Route element={<Product_medicalFormComponent />}>
        <Route path="/:id" element={<Product_medicalFormIndex />} />
        <Route path=":id/view/:id" element={<Product_medicalFormView />} />
        <Route path=":id/create" element={<Product_medicalFormCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default Product_medicalFormRouting;
