
import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogComponent from "./BlogComponent";
import BlogIndex from "./pages/BlogIndex";
import BlogUpdate from "./pages/BlogUpdate";
import BlogView from "./pages/BlogView";
import BlogCreate from "./pages/BlogCreate";

const BlogRouting = () => {
  return (
    <Routes>
      <Route element={<BlogComponent />}>
        <Route path="/" element={<BlogIndex />} />
        <Route path="/update/:id" element={<BlogUpdate />} />
        <Route path="/view/:id" element={<BlogView />} />
        <Route path="/create" element={<BlogCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default BlogRouting;
