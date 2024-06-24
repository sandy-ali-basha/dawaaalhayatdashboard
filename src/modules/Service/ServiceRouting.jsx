
import React from "react";
import { Route, Routes } from "react-router-dom";
import ServiceComponent from "./ServiceComponent";
import ServiceIndex from "./pages/ServiceIndex";
import ServiceUpdate from "./pages/ServiceUpdate";
import ServiceView from "./pages/ServiceView";
import ServiceCreate from "./pages/ServiceCreate";

const ServiceRouting = () => {
  return (
    <Routes>
      <Route element={<ServiceComponent />}>
        <Route path="/" element={<ServiceIndex />} />
        <Route path="/update/:id" element={<ServiceUpdate />} />
        <Route path="/view/:id" element={<ServiceView />} />
        <Route path="/create" element={<ServiceCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default ServiceRouting;
