
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import HomeIndex from "./pages/HomeIndex";
import HomeCreateSlider from "./pages/HomeCreateSlider";

const HomeRouting = () => {
  return (
    <Routes>
      <Route element={<HomeComponent />}>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/addSlider" element={<HomeCreateSlider />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default HomeRouting;
