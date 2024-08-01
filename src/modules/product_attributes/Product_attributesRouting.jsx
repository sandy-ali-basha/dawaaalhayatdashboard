import React from "react";
import { Route, Routes } from "react-router-dom";
import Product_attributesComponent from "./Product_attributesComponent";
import Product_attributesIndex from "./pages/Product_attributesIndex";
import Product_attributesUpdate from "./pages/Product_attributesUpdate";
import Product_attributesCreate from "./pages/Product_attributesCreate";
import Product_attributes_valuesRouting from "./product_attributes_values/Product_attributes_valuesRouting";
import NotFound from "components/NotFound";

const Product_attributesRouting = () => {
  return (
    <Routes>
      <Route element={<Product_attributesComponent />}>
        <Route path="/" element={<Product_attributesIndex />} />
        <Route path="/update/:id" element={<Product_attributesUpdate />} />
        <Route path="/create" element={<Product_attributesCreate />} />
        <Route
          path="/values/*"
          element={<Product_attributes_valuesRouting />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Product_attributesRouting;
