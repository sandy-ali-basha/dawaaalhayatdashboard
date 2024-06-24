
import React from "react";
import { Route, Routes } from "react-router-dom";
import HeroimageComponent from "./HeroimageComponent";
import HeroimageIndex from "./pages/HeroimageIndex";
import HeroimageCreate from "./pages/HeroimageCreate";

const HeroimageRouting = () => {
  return (
    <Routes>
      <Route element={<HeroimageComponent />}>
        <Route path="/" element={<HeroimageIndex />} />
        <Route path="/create" element={<HeroimageCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default HeroimageRouting;
