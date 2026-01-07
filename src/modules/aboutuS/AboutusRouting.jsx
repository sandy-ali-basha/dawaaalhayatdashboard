
import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutusComponent from "./AboutusComponent";
import AboutusIndex from "./pages/AboutusIndex";
import AboutusUpdate from "./pages/AboutusUpdate";
import AboutusView from "./pages/AboutusView";
import AboutusCreate from "./pages/AboutusCreate";

const AboutusRouting = () => {
  return (
    <Routes>
      <Route element={<AboutusComponent />}>
        <Route path="/" element={<AboutusIndex />} />
        <Route path="/update/:id" element={<AboutusUpdate />} />
        <Route path="/view/:id" element={<AboutusView />} />
        <Route path="/create" element={<AboutusCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default AboutusRouting;
