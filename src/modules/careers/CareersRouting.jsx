
import React from "react";
import { Route, Routes } from "react-router-dom";
import CareersComponent from "./CareersComponent";
import CareersIndex from "./pages/CareersIndex";
import CareersUpdate from "./pages/CareersUpdate";
import CareersView from "./pages/CareersView";
import CareersCreate from "./pages/CareersCreate";

const CareersRouting = () => {
  return (
    <Routes>
      <Route element={<CareersComponent />}>
        <Route path="/" element={<CareersIndex />} />
        <Route path="/update/:id" element={<CareersUpdate />} />
        <Route path="/view/:id" element={<CareersView />} />
        <Route path="/create" element={<CareersCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default CareersRouting;
