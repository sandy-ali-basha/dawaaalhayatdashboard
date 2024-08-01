
import React from "react";
import { Route, Routes } from "react-router-dom";
import ServiceComponent from "./ServiceComponent";
import ServiceIndex from "./pages/ServiceIndex";
import ServiceUpdate from "./pages/ServiceUpdate";
import ServiceView from "./pages/ServiceView";
import ServiceCreate from "./pages/ServiceCreate";
import NotFound from "components/NotFound";

const ServiceRouting = () => {
  return (
    <Routes>
      <Route element={<ServiceComponent />}>
        <Route path="/" element={<ServiceIndex />} />
        <Route path="/update/:id" element={<ServiceUpdate />} />
        <Route path="/view/:id" element={<ServiceView />} />
        <Route path="/create" element={<ServiceCreate />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ServiceRouting;
