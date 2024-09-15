import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import ButtonAction from "components/shared/ButtonAction";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { orderStore } from "../store/orderStore";
import { BoxStyled } from "components/styled/BoxStyled";

const OrdersView = () => {
  const { t } = useTranslation("index");
  const navigate = useNavigate();
  const [item, setItem] = orderStore((state) => [state.item, state.setItem]);

  // Function to handle navigation back
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // Sample order status for demo
  const status = "Pending"; // You can dynamically change this based on your item data
  const readyToPickup = "Ready to Pickup"; // Example additional status

  const columns = useMemo(() => {
    return [t("Product"), t("Price"), t("Quantity"), t("Total")];
  }, [t]);

  const rows = useMemo(() => {
    return item?.lines?.map((order) => (
      <TableRow key={order.id}>
        <TableCell>{order.description}</TableCell> {/* Product */}
        <TableCell>{order.unit_price.value}</TableCell> {/* Price */}
        <TableCell>{order.unit_quantity}</TableCell> {/* Quantity */}
        <TableCell>{order.total.value}</TableCell> {/* Total */}
      </TableRow>
    ));
  }, [item]);

  return (
    <Box p={3}>
      {/* Order Information and Status */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h4" sx={{ color: "text.main" }}>
          {t("Order")} #{item?.reference ?? "N/A"}
        </Typography>

        {/* Order Status Chips */}
        <Box display="flex" gap={2}>
          <Chip
            label={item?.status}
            color={
              item?.status === "awaiting-payment"
                ? "info"
                : item?.status === "payment-offline"
                ? "primary"
                : "success"
            }
          />
        </Box>
      </Box>

      <Typography color="textSecondary" variant="body1">
        {t("Order Date")}: {item?.order_date ?? "N/A"}{" "}
        {/* Example order date */}
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={8}>
          {/* Products Table */}
          <BoxStyled sx={{ px: 2 }}>
            <Typography variant="h6" sx={{ color: "text.main" }} gutterBottom>
              {t("Products")}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col}>{col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
          </BoxStyled>
        </Grid>

        {/* Shipping and Billing Info */}
        <Grid item xs={12} md={4}>
          <BoxStyled sx={{ p: 2, color: "text.main" }}>
            <Typography variant="h6" gutterBottom>
              {t("Summary")}
            </Typography>
            <Typography>
              {t("Reference")}: {item?.reference ?? "N/A"}
            </Typography>
            <Typography>
              {t("Subtotal")}: {item?.sub_total ?? "N/A"}
            </Typography>
            <Typography>
              {t("Tax")}: {item?.tax_total ?? "N/A"}
            </Typography>
            <Typography>
              {t("Total")}: {item?.total ?? "N/A"}
            </Typography>
          </BoxStyled>
        </Grid>
        <Grid item xs={12} md={4}>
          <BoxStyled sx={{ p: 2, color: "text.main" }}>
            <Typography variant="body1">{t("Shipping Address")}</Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {item?.address?.find((addr) => addr.type === "shipping")
                ?.line_one ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Email")}:{" "}
              {item?.address?.find((addr) => addr.type === "shipping")
                ?.contact_email ?? "N/A"}
            </Typography>
          </BoxStyled>
        </Grid>
        <Grid item xs={12} md={4}>
          <BoxStyled sx={{ p: 2, color: "text.main" }}>
            <Typography variant="body1">{t("Billing Address")}</Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {item?.address?.find((addr) => addr.type === "billing")
                ?.line_one ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Phone")}:{" "}
              {item?.address?.find((addr) => addr.type === "billing")
                ?.contact_phone ?? "N/A"}
            </Typography>
          </BoxStyled>
        </Grid>
      </Grid>

      {/* Back Button */}
      <Box mt={3}>
        <ButtonAction
          name={t("Back")}
          onClick={handleBack}
          endIcon={<ArrowForward />}
        />
      </Box>
    </Box>
  );
};

export default OrdersView;
