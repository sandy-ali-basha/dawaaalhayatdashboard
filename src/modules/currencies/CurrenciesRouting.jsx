
import React from "react";
import { Route, Routes } from "react-router-dom";
import CurrenciesComponent from "./CurrenciesComponent";
import CurrenciesIndex from "./pages/CurrenciesIndex";
import CurrenciesUpdate from "./pages/CurrenciesUpdate";
import CurrenciesView from "./pages/CurrenciesView";
import CurrenciesCreate from "./pages/CurrenciesCreate";

const CurrenciesRouting = () => {
  return (
    <Routes>
      <Route element={<CurrenciesComponent />}>
        <Route path="/" element={<CurrenciesIndex />} />
        <Route path="/update/:id" element={<CurrenciesUpdate />} />
        <Route path="/view/:id" element={<CurrenciesView />} />
        <Route path="/create" element={<CurrenciesCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default CurrenciesRouting;
