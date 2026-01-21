import {
  Typography,
  TableRow,
  TableCell,
  Grid,
  TableHead,
  TableBody,
  Table,
} from "@mui/material";
import React from "react";
import { BoxStyled } from "components/styled/BoxStyled";
import { InvStore } from "store/invStore";
import ProductRow from "../components/ProductRow";

const InvintoryIndex = () => {
  const [InvData] = InvStore((state) => [state.InvData]);
  const products = InvData?.Products?.products ?? [];

  return (
    <>
      {/* ---------- TOP CARDS ---------- */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <BoxStyled sx={{ p: 2 }}>
            <Typography color="text.primary" variant="subtitle2">
              Inventory Name
            </Typography>
            <Typography color="text.primary" variant="h6">
                          {InvData.name?.split(".").pop() || ""}
              {/* {InvData?.name ?? "-"} */}
            </Typography>
          </BoxStyled>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <BoxStyled sx={{ p: 2 }}>
            <Typography color="text.primary" variant="subtitle2">
              Shipping Price
            </Typography>
            <Typography color="text.primary" variant="h6">
              {InvData?.shipping_price ?? "-"}
            </Typography>
          </BoxStyled>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <BoxStyled sx={{ p: 2 }}>
            <Typography color="text.primary" variant="subtitle2">
              Products Count
            </Typography>
            <Typography color="text.primary" variant="h6">
              {InvData?.products_count ?? "-"}
            </Typography>
          </BoxStyled>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <BoxStyled sx={{ p: 2 }}>
            <Typography color="text.primary" variant="subtitle2">
              Currency
            </Typography>
            <Typography color="text.primary" variant="h6">
              {InvData?.currency?.code ?? "-"}
            </Typography>
          </BoxStyled>
        </Grid>
      </Grid>

      {/* ---------- COLLAPSIBLE TABLE ---------- */}
      <BoxStyled sx={{ px: "10px", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell> {/* arrow */}
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Product Type</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </BoxStyled>
    </>
  );
};

export default InvintoryIndex;
