
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import HomeIndex from "./pages/HomeIndex";
import HomeUpdate from "./pages/HomeUpdate";
import HomeView from "./pages/HomeView";
import HomeCreate from "./pages/HomeCreate";

const HomeRouting = () => {
  return (
    <Routes>
      <Route element={<HomeComponent />}>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/update/:id" element={<HomeUpdate />} />
        <Route path="/view/:id" element={<HomeView />} />
        <Route path="/create" element={<HomeCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default HomeRouting;
