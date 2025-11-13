
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import HomeIndex from "./pages/HomeIndex";
import HomeCreateSlider from "./pages/slider/HomeCreateSlider";
import HomeUpdateSlider from "./pages/slider/HomeUpdateSlider";

const HomeRouting = () => {
  return (
    <Routes>
      <Route element={<HomeComponent />}>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/addSlider" element={<HomeCreateSlider />} />
        <Route path="/editSlide/:id" element={<HomeUpdateSlider />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default HomeRouting;
