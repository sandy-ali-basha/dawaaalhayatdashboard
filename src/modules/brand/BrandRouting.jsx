import React from "react";
import { Route, Routes } from "react-router-dom";
import BrandComponent from "./BrandComponent";
import BrandIndex from "./pages/BrandIndex";
import BrandUpdate from "./pages/BrandUpdate";
import BrandView from "./pages/BrandView";
import BrandCreate from "./pages/BrandCreate";
import NotFound from "components/NotFound";
import Brand_pagesView from "./brand_pages/pages/Brand_pagesView";
import Brand_pagesCreateSlider from "./brand_pages/pages/Brand_pagesCreateSlider";
import Brand_pageCreate from "./brand_pages/pages/Brand_pageCreate";

const BrandRouting = () => {
  return (
    <Routes>
      <Route element={<BrandComponent />}>
        <Route path="/" element={<BrandIndex />} />
        <Route path="/update/:id" element={<BrandUpdate />} />
        <Route path="/view/:id" element={<BrandView />} />
        <Route path="/create" element={ <BrandCreate />} />
        <Route path="/page/:id/" element={<Brand_pagesView />} />
        <Route path="/page/:id/addSlider" element={<Brand_pagesCreateSlider />} />
        <Route path="/page/:id/create" element={<Brand_pageCreate />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default BrandRouting;
