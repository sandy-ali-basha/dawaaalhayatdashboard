
import React from "react";
import { Route, Routes } from "react-router-dom";
import ContactusComponent from "./ContactusComponent";
import ContactusIndex from "./pages/ContactusIndex";
import ContactusUpdate from "./pages/ContactusUpdate";
import ContactusView from "./pages/ContactusView";
import ContactusCreate from "./pages/ContactusCreate";

const ContactusRouting = () => {
  return (
    <Routes>
      <Route element={<ContactusComponent />}>
        <Route path="/" element={<ContactusIndex />} />
        <Route path="/update/:id" element={<ContactusUpdate />} />
        <Route path="/view/:id" element={<ContactusView />} />
        <Route path="/create" element={<ContactusCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default ContactusRouting;
