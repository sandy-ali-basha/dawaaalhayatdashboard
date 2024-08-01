
import React from "react";
import { Route, Routes } from "react-router-dom";
import TransactionComponent from "./TransactionComponent";
import TransactionIndex from "./pages/TransactionIndex";
import NotFound from "components/NotFound";

const TransactionRouting = () => {
  return (
    <Routes>
      <Route element={<TransactionComponent />}>
        <Route path="/" element={<TransactionIndex />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default TransactionRouting;
