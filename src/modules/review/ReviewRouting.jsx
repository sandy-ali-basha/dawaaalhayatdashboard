
import React from "react";
import { Route, Routes } from "react-router-dom";
import ReviewComponent from "./ReviewComponent";
import ReviewIndex from "./pages/ReviewIndex";
import NotFound from "components/NotFound";

const ReviewRouting = () => {
  return (
    <Routes>
      <Route element={<ReviewComponent />}>
        <Route path="/" element={<ReviewIndex />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ReviewRouting;
