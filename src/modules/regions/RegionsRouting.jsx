
import React from "react";
import { Route, Routes } from "react-router-dom";
import RegionsComponent from "./RegionsComponent";
import RegionsIndex from "./pages/RegionsIndex";
import RegionsUpdate from "./pages/RegionsUpdate";
import RegionsView from "./pages/RegionsView";
import RegionsCreate from "./pages/RegionsCreate";

const RegionsRouting = () => {
  return (
    <Routes>
      <Route element={<RegionsComponent />}>
        <Route path="/" element={<RegionsIndex />} />
        <Route path="/update/:id" element={<RegionsUpdate />} />
        <Route path="/view/:id" element={<RegionsView />} />
        <Route path="/create" element={<RegionsCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default RegionsRouting;
