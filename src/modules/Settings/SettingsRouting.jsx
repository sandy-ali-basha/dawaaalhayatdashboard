
import React from "react";
import { Route, Routes } from "react-router-dom";
import SettingsComponent from "./SettingsComponent";
import SettingsIndex from "./pages/SettingsIndex";
import SettingsUpdate from "./pages/SettingsUpdate";
import SettingsView from "./pages/SettingsView";
import SettingsCreate from "./pages/SettingsCreate";

const SettingsRouting = () => {
  return (
    <Routes>
      <Route element={<SettingsComponent />}>
        <Route path="/" element={<SettingsIndex />} />
        <Route path="/update/:id" element={<SettingsUpdate />} />
        <Route path="/view/:id" element={<SettingsView />} />
        <Route path="/create" element={<SettingsCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default SettingsRouting;
