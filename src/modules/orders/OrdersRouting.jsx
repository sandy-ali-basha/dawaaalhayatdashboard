
import React from "react";
import { Route, Routes } from "react-router-dom";
import OrdersComponent from "./OrdersComponent";
import OrdersIndex from "./pages/OrdersIndex";
import OrdersUpdate from "./pages/OrdersUpdate";
import OrdersView from "./pages/OrdersView";
import OrdersCreate from "./pages/OrdersCreate";

const OrdersRouting = () => {
  return (
    <Routes>
      <Route element={<OrdersComponent />}>
        <Route path="/" element={<OrdersIndex />} />
        <Route path="/update/:id" element={<OrdersUpdate />} />
        <Route path="/view" element={<OrdersView />} />
        <Route path="/create" element={<OrdersCreate />} />
      </Route>
      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default OrdersRouting;
