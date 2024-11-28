import React, { useState } from "react";
import CreateProductDetails from "../components/CreateProductDetails";
import AddImages from "./AddImages";
import { Chip, Grid, Typography } from "@mui/material";
import AddImagesSlider from "./AddImagesSlider";
import ProductAttr from "./ProductAttr";
import ProductdetailsCreate from "../ProductDetails/pages/ProductdetailsCreate";

const ProductCreate = () => {
  const [newProductId, setNewProductId] = useState([]);

  return (
    <Grid container spacing={3}>
      <Grid item xs="12">
        <CreateProductDetails setNewProductId={setNewProductId} />
        <Typography variant="body1" sx={{ color: "text.primary", mt: 5 }}>
          Add Details For the New Created Products
          {newProductId.length > 0 &&
            newProductId?.map((item, idx) => (
              <Chip key={idx} label={item} sx={{ mx: 1 }} />
            ))}
        </Typography>
      </Grid>
      <Grid item xs="6">
        {<AddImages id={newProductId} notDialog={true} />}
      </Grid>
      <Grid item xs="6">
        <AddImagesSlider id={newProductId} notDialog={true} />
      </Grid>
      <Grid item xs="6">
        <ProductAttr id={newProductId} notDialog={true} />
      </Grid>
      <Grid item xs="12">
        <ProductdetailsCreate id={newProductId} isCreateProduct={true} />
      </Grid>
    </Grid>
  );
};

export default ProductCreate;
