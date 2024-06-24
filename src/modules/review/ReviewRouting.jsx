
import React from "react";
import { Route, Routes } from "react-router-dom";
import ReviewComponent from "./ReviewComponent";
import ReviewIndex from "./pages/ReviewIndex";

const ReviewRouting = () => {
  return (
    <Routes>
      <Route element={<ReviewComponent />}>
        <Route path="/" element={<ReviewIndex />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default ReviewRouting;
