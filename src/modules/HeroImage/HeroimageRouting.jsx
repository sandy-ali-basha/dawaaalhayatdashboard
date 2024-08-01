import React from "react";
import { Route, Routes } from "react-router-dom";
import HeroimageComponent from "./HeroimageComponent";
import HeroimageIndex from "./pages/HeroimageIndex";
import HeroimageCreate from "./pages/HeroimageCreate";
import NotFound from "components/NotFound";

const HeroimageRouting = () => {
  return (
    <Routes>
      <Route element={<HeroimageComponent />}>
        <Route path="/" element={<HeroimageIndex />} />
        <Route path="/create" element={<HeroimageCreate />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default HeroimageRouting;
