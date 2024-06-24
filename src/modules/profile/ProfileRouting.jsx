
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfileComponent from "./ProfileComponent";
import ProfileIndex from "./pages/ProfileIndex";
import ProfileUpdate from "./pages/ChangePassword";
import ProfileView from "./pages/ProfileView";
import ProfileCreate from "./pages/ProfileCreate";

const ProfileRouting = () => {
  return (
    <Routes>
      <Route element={<ProfileComponent />}>
        <Route path="/" element={<ProfileIndex />} />
        <Route path="/update/:id" element={<ProfileUpdate />} />
        <Route path="/view/:id" element={<ProfileView />} />
        <Route path="/create" element={<ProfileCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default ProfileRouting;
