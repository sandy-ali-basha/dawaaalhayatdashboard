import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Chip,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
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

  const columns = useMemo(() => {
    return [
      t("Product"),
      t("Price"),
      t("Quantity"),
      t("Total"),
      t("sub Total"),
    ];
  }, [t]);

  const rows = useMemo(() => {
    return item?.lines?.map((order) => (
      <TableRow key={order.id}>
        <TableCell>{order.description}</TableCell> {/* Product */}
        <TableCell>{order.unit_price.value}</TableCell> {/* Price */}
        <TableCell>{order.quantity}</TableCell> {/* Quantity */}
        <TableCell>{order.total.value}</TableCell> {/* Total */}
        <TableCell>{order.sub_total.value}</TableCell> {/* Total */}
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
        {t("Order Date")}: {item?.created_at ?? "N/A"}{" "}
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

        <Grid item xs={12} md={4}>
          <BoxStyled sx={{ p: 2, color: "text.main" }}>
            <Typography variant="h6" gutterBottom>
              CUSTOMER
            </Typography>
            <Typography>
              {t("NAME")}: {item?.customer[0]?.first_name ?? "N/A"}{" "}
              {item?.customer[0]?.last_name ?? " N/A"}
            </Typography>
            <Typography>
              {t("age")}: {item?.customer[0]?.age ?? "N/A"}
            </Typography>
            <Typography>
              {t("gender")}: {item?.customer[0]?.gender ?? "N/A"}
            </Typography>
          </BoxStyled>
        </Grid>
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
              {t("Total")}: {item?.total ?? "N/A"}
            </Typography>
            <Typography>
              {t("Tax")}: {item?.tax_total ?? "N/A"}
            </Typography>
            <Typography>
              {t("points added")}: {item?.points_added ?? "N/A"}
            </Typography>
            <Typography>
              {t("sub total after points")}:{" "}
              {item?.sub_total_after_points ?? "N/A"}
            </Typography>
          </BoxStyled>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, color: "text.main" }}>
            <Typography variant="body1">{t("Shipping Address")}</Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {
                item?.address?.find((addr) => addr.type === "shipping")
                  ?.line_one
              }
              , {item?.address?.find((addr) => addr.type === "shipping")?.city},{" "}
              {item?.address?.find((addr) => addr.type === "shipping")?.state},{" "}
              {
                item?.address?.find((addr) => addr.type === "shipping")
                  ?.postcode
              }
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Email")}:{" "}
              {item?.address?.find((addr) => addr.type === "shipping")
                ?.contact_email ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Phone")}:{" "}
              {item?.address?.find((addr) => addr.type === "shipping")
                ?.contact_phone ?? "N/A"}
            </Typography>
            <Typography>
              {t("city shipping price")}:{" "}
              {item?.address?.find((addr) => addr.type === "shipping")
                ?.city_shipping_price ?? ""}
            </Typography>
            <Typography>
              {t("delivery instructions")}:{" "}
              {item?.address?.find((addr) => addr.type === "shipping")
                ?.delivery_instructions ?? ""}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, color: "text.main" }}>
            <Typography variant="body1">{t("Billing Address")}</Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {item?.address?.find((addr) => addr.type === "billing")
                ?.line_one ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Email")}:{" "}
              {item?.address?.find((addr) => addr.type === "billing")
                ?.contact_email ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("Contact Phone")}:{" "}
              {item?.address?.find((addr) => addr.type === "billing")
                ?.contact_phone ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("city shipping price")}:{" "}
              {item?.address?.find((addr) => addr.type === "billing")
                ?.city_shipping_price ?? "N/A"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {t("delivery instructions")}:{" "}
              {item?.address?.find((addr) => addr.type === "billing")
                ?.delivery_instructions ?? "N/A"}
            </Typography>
          </Box>
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
