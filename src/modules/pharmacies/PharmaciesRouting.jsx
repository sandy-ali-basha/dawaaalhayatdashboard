import React from "react";
import { Route, Routes } from "react-router-dom";
import PharmaciesComponent from "./PharmaciesComponent";
import PharmaciesIndex from "./pages/PharmaciesIndex";
import PharmaciesCreate from "./pages/PharmaciesCreate";
import PharmaciesUpdate from "./pages/PharmaciesUpdate";

const PharmaciesRouting = () => {
  return (
    <Routes>
      <Route element={<PharmaciesComponent />}>
        <Route path="/" element={<PharmaciesIndex />} />
        <Route path="/create" element={<PharmaciesCreate />} />
        <Route path="/update/:id" element={<PharmaciesUpdate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default PharmaciesRouting;
