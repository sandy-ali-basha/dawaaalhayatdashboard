
import React from "react";
import { Route, Routes } from "react-router-dom";
import TransactionComponent from "./TransactionComponent";
import TransactionIndex from "./pages/TransactionIndex";

const TransactionRouting = () => {
  return (
    <Routes>
      <Route element={<TransactionComponent />}>
        <Route path="/" element={<TransactionIndex />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default TransactionRouting;
