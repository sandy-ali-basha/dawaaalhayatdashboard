
import React from "react";
import { Route, Routes } from "react-router-dom";
import InvintoryComponent from "./InvintoryComponent";
import InvintoryIndex from "./pages/InvintoryIndex";
import InvintoryUpdate from "./pages/InvintoryUpdate";
import InvintoryView from "./pages/InvintoryView";
import InvintoryCreate from "./pages/InvintoryCreate";

const InvintoryRouting = () => {
  return (
    <Routes>
      <Route element={<InvintoryComponent />}>
        <Route path="/:id" element={<InvintoryIndex />} />
        <Route path="/update/:id" element={<InvintoryUpdate />} />
        <Route path="/view/:id" element={<InvintoryView />} />
        <Route path="/create" element={<InvintoryCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default InvintoryRouting;
