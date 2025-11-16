import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  LocationCityOutlined,
  Inventory2Outlined,
  MonetizationOnOutlined,
  DiscountOutlined,
  CategoryOutlined,
  CheckCircleOutline,
  CancelOutlined,
  CurrencyExchangeOutlined,
  StoreMallDirectoryOutlined,
  LayersOutlined,
  DateRangeOutlined,
  PointOfSale,
  DashboardCustomizeRounded,
} from "@mui/icons-material";
import VariantUpdate from "modules/product/components/VariantUpdate";

const VariantsSection = ({ t, options = [] }) => {
  return (
    <Box sx={{ my: 3 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          textTransform: "capitalize",
          color: "text.primary",
          fontWeight: 600,
        }}
      >
        {t("Product Variants")}
      </Typography>

      {options?.length > 0 ? (
        <Grid container spacing={2}>
          {options.map((variant, idx) => (
            <Grid item xs={12} md={6} lg={4} key={variant.id || idx}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  position: "relative",
                  overflow: "hidden",
                  transition: "0.2s",
                  "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
                }}
              >
                <CardContent>
                  {/* Header */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                     #{idx + 1}  {t("Variant: ")} 
                      {Array.isArray(variant.options)
                        ? variant.options.join(", ")
                        : "—"}
                    </Typography>
                    <Tooltip title={t("Edit Variant")}>
                      <VariantUpdate variantData={variant} />
                    </Tooltip>
                  </Stack>

                  {/* SKU + City */}
                  <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                    <Chip
                      icon={<CategoryOutlined />}
                      label={`SKU: ${variant.sku || "—"}`}
                      size="small"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                    <Chip
                      icon={<LocationCityOutlined />}
                      label={`City: ${variant.city || "—"}`}
                      size="small"
                      color="info"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Price info */}
                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <MonetizationOnOutlined
                        fontSize="small"
                        color="success"
                      />
                      <Typography variant="body2">
                        <strong>{t("Price")}:</strong> {variant.price}{" "}
                        {variant.currency?.code}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <DiscountOutlined fontSize="small" color="warning" />
                      <Typography variant="body2">
                        <strong>{t("Compare Price")}:</strong>{" "}
                        {variant.compare_price || "—"}
                        {variant.currency?.code}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <DateRangeOutlined fontSize="small" color="warning" />
                      <Typography variant="body2">
                        <strong>{t("Compare Price start")}:</strong>{" "}
                        {variant.compare_price_start_date || "—"}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <DateRangeOutlined fontSize="small" color="warning" />
                      <Typography variant="body2">
                        <strong>{t("Compare Price end")}:</strong>{" "}
                        {variant.compare_price_end_date || "—"}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CurrencyExchangeOutlined fontSize="small" color="info" />
                      <Typography variant="body2">
                        <strong>{t("Currency")}:</strong>{" "}
                        {variant.currency?.name || "—"} (
                        {variant.currency?.code || "—"})
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Inventory info */}
                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Inventory2Outlined fontSize="small" color="primary" />
                      <Typography variant="body2">
                        <strong>{t("Inventory")}:</strong>{" "}
                        {variant.inventory || "—"}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <StoreMallDirectoryOutlined
                        fontSize="small"
                        color="secondary"
                      />
                      <Typography variant="body2">
                        <strong>{t("Storage Quantity")}:</strong>{" "}
                        {variant.storage_qty || "—"}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LayersOutlined fontSize="small" color="action" />
                      <Typography variant="body2">
                        <strong>{t("Unit Quantity")}:</strong>{" "}
                        {variant.unit_quantity || "—"}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <DashboardCustomizeRounded fontSize="small" color="action" />
                      <Typography variant="body2">
                        <strong>{t("reorder point")}:</strong>{" "}
                        {variant.reorder_point || "—"}
                      </Typography>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                      <strong>{t("Tax")}:</strong> {variant.tax_class_id || "—"}
                    </Typography>

                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Purchasable */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {variant.purchasable === "always" ? (
                      <CheckCircleOutline color="success" fontSize="small" />
                    ) : (
                      <CancelOutlined color="error" fontSize="small" />
                    )}
                    <Typography variant="body2">
                      <strong>{t("Purchasable")}:</strong>{" "}
                      {variant.purchasable === "always" ? "Yes" : "No"}
                    </Typography>
                    ``
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {t("No options available")}
        </Typography>
      )}
    </Box>
  );
};

export default VariantsSection;
