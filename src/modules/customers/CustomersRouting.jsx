
import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomersComponent from "./CustomersComponent";
import CustomersIndex from "./pages/CustomersIndex";
import CustomersUpdate from "./pages/CustomersUpdate";
import CustomersView from "./pages/CustomersView";
import CustomersCreate from "./pages/CustomersCreate";

const CustomersRouting = () => {
  return (
    <Routes>
      <Route element={<CustomersComponent />}>
        <Route path="/" element={<CustomersIndex />} />
        <Route path="/update/:id" element={<CustomersUpdate />} />
        <Route path="/view/:id" element={<CustomersView />} />
        <Route path="/create" element={<CustomersCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default CustomersRouting;
