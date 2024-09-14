
import React from "react";
import { Route, Routes } from "react-router-dom";
import DiscountsComponent from "./DiscountsComponent";
import DiscountsIndex from "./pages/DiscountsIndex";
import DiscountsUpdate from "./pages/DiscountsUpdate";
import DiscountsView from "./pages/DiscountsView";
import DiscountsCreate from "./pages/DiscountsCreate";

const DiscountsRouting = () => {
  return (
    <Routes>
      <Route element={<DiscountsComponent />}>
        <Route path="/" element={<DiscountsIndex />} />
        <Route path="/update/:id" element={<DiscountsUpdate />} />
        <Route path="/view/:id" element={<DiscountsView />} />
        <Route path="/create" element={<DiscountsCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default DiscountsRouting;
