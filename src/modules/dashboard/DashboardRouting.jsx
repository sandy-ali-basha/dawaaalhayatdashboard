import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardComponent from "./DashboardComponent";
import DashboardIndex from "./pages/DashboardIndex";
import AdminRouting from "modules/admin/AdminRouting";
import ProfileRouting from "modules/profile/ProfileRouting";
import ServiceRouting from "modules/Service/ServiceRouting";
import TermsRouting from "modules/Terms/TermsRouting";
import TransactionRouting from "modules/transaction/TransactionRouting";
import ReviewRouting from "modules/review/ReviewRouting";
import CareersRouting from "modules/careers/CareersRouting";
import CareerscategoryRouting from "modules/careersCategory/CareerscategoryRouting";
import ProductRouting from "modules/product/ProductRouting";
import BrandRouting from "modules/brand/BrandRouting";
import Product_typeRouting from "modules/product_type/Product_typeRouting";
import Product_attributesRouting from "modules/product_attributes/Product_attributesRouting";
import NotFound from "components/NotFound";
import BlogRouting from "modules/blog/BlogRouting";
import OrdersRouting from "modules/orders/OrdersRouting";
import DiscountsRouting from "modules/discounts/DiscountsRouting";
import SettingsRouting from "modules/Settings/SettingsRouting";

const DashboardRouting = () => {
  return (
    <Routes>
      {
        <Route element={<DashboardComponent />}>
          <Route path="/" element={<DashboardIndex />} />
          <Route path="/admin/*" element={<AdminRouting />} />
          <Route path="/profile/*" element={<ProfileRouting />} />
          <Route path="/service/*" element={<ServiceRouting />} />
          <Route path="/transaction/*" element={<TransactionRouting />} />
          <Route path="/review/*" element={<ReviewRouting />} />
          <Route path="/blog/*" element={<BlogRouting />} />

          <Route path="/terms/*" element={<TermsRouting />} />
          <Route path="/careers/*" element={<CareersRouting />} />
          <Route
            path="/careersCategory/*"
            element={<CareerscategoryRouting />}
          />
          <Route path="/product/*" element={<ProductRouting />} />
          <Route path="/brands/*" element={<BrandRouting />} />
          <Route path="/orders/*" element={<OrdersRouting />} />
          <Route path="/discounts/*" element={<DiscountsRouting />} />
          <Route path="/product_type/*" element={<Product_typeRouting />} />

          <Route
            path="/products/categories/*"
            element={<Product_attributesRouting />}
          />
          <Route
            path="/settings/*"
            element={<SettingsRouting />}
          />
          {/* <Route path="/product_options/*" element={<Product_optionsRouting />} /> */}
        </Route>
      }

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DashboardRouting;
