
import React from "react";
import { Route, Routes } from "react-router-dom";
import CareerscategoryComponent from "./CareerscategoryComponent";
import CareerscategoryIndex from "./pages/CareerscategoryIndex";
import CareerscategoryUpdate from "./pages/CareerscategoryUpdate";
import CareerscategoryView from "./pages/CareerscategoryView";
import CareerscategoryCreate from "./pages/CareerscategoryCreate";

const CareerscategoryRouting = () => {
  return (
    <Routes>
      <Route element={<CareerscategoryComponent />}>
        <Route path="/" element={<CareerscategoryIndex />} />
        <Route path="/update/:id" element={<CareerscategoryUpdate />} />
        <Route path="/view/:id" element={<CareerscategoryView />} />
        <Route path="/create" element={<CareerscategoryCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default CareerscategoryRouting;
