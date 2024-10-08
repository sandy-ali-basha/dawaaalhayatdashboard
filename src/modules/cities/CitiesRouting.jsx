
import React from "react";
import { Route, Routes } from "react-router-dom";
import CitiesComponent from "./CitiesComponent";
import CitiesIndex from "./pages/CitiesIndex";
import CitiesUpdate from "./pages/CitiesUpdate";
import CitiesView from "./pages/CitiesView";
import CitiesCreate from "./pages/CitiesCreate";

const CitiesRouting = () => {
  return (
    <Routes>
      <Route element={<CitiesComponent />}>
        <Route path="/" element={<CitiesIndex />} />
        <Route path="/update/:id" element={<CitiesUpdate />} />
        <Route path="/view/:id" element={<CitiesView />} />
        <Route path="/create" element={<CitiesCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default CitiesRouting;
