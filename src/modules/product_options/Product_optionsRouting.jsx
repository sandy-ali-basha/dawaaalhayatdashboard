
import React from "react";
import { Route, Routes } from "react-router-dom";
import Product_optionsComponent from "./Product_optionsComponent";
import Product_optionsIndex from "./pages/Product_optionsIndex";
import Product_optionsUpdate from "./pages/Product_optionsUpdate";
import Product_optionsView from "./pages/Product_optionsView";
import Product_optionsCreate from "./pages/Product_optionsCreate";
import Product_medicalFormRouting from "../Product_medicalForm/Product_medicalFormRouting";

const Product_optionsRouting = () => {
  return (
    <Routes>
      <Route element={<Product_optionsComponent />}>
        <Route path="/" element={<Product_optionsIndex />} />
        <Route path="/update/:id" element={<Product_optionsUpdate />} />
        <Route path="/view/:id" element={<Product_optionsView />} />
        <Route path="/create" element={<Product_optionsCreate />} />
        <Route path="/value/*" element={<Product_medicalFormRouting />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default Product_optionsRouting;
