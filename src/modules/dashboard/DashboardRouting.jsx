import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardComponent from "./DashboardComponent";
import DashboardIndex from "./pages/DashboardIndex";
import AdminRouting from "modules/admin/AdminRouting";
import ProfileRouting from "modules/profile/ProfileRouting";
import ServiceRouting from "modules/Service/ServiceRouting";
import HeroimageRouting from "modules/HeroImage/HeroimageRouting";
import TermsRouting from "modules/Terms/TermsRouting";
import TransactionRouting from "modules/transaction/TransactionRouting";
import ReviewRouting from "modules/review/ReviewRouting";
import PolicyRouting from "modules/policy/PolicyRouting";
import CareersRouting from "modules/careers/CareersRouting";
import CareerscategoryRouting from "modules/careersCategory/CareerscategoryRouting";
import ProductsRouting from "modules/products/ProductsRouting";

const DashboardRouting = () => {
  return (
    <Routes>
      {
        <Route element={<DashboardComponent />}>
          <Route path="/" element={<DashboardIndex />} />
          <Route path="/admin/*" element={<AdminRouting />} />
          <Route path="/profile/*" element={<ProfileRouting />} />
          <Route path="/service/*" element={<ServiceRouting />} />
          <Route path="/heroImage/*" element={<HeroimageRouting />} />
          <Route path="/policy/*" element={<PolicyRouting />} />
          <Route path="/transaction/*" element={<TransactionRouting />} />
          <Route path="/review/*" element={<ReviewRouting />} />

          <Route path="/terms/*" element={<TermsRouting />} />
          <Route path="/careers/*" element={<CareersRouting />} />
          <Route path="/careersCategory/*" element={<CareerscategoryRouting />} />
          <Route path="/products/*" element={<ProductsRouting />} />
        </Route>
      }

      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default DashboardRouting;
