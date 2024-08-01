import React from "react";
import { Route, Routes } from "react-router-dom";
import CareersComponent from "./CareersComponent";
import CareersIndex from "./pages/CareersIndex";
import CareersUpdate from "./pages/CareersUpdate";
import CareersView from "./pages/CareersView";
import CareersCreate from "./pages/CareersCreate";
import NotFound from "components/NotFound";

const CareersRouting = () => {
  return (
    <Routes>
      <Route element={<CareersComponent />}>
        <Route path="/" element={<CareersIndex />} />
        <Route path="/update/:id" element={<CareersUpdate />} />
        <Route path="/view/:id" element={<CareersView />} />
        <Route path="/create" element={<CareersCreate />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CareersRouting;
