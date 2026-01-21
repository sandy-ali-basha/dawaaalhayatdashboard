import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  IconButton,
  FormControlLabel,
  Switch,
  FormControl,
} from "@mui/material";
import {
  MonetizationOnOutlined,
  DiscountOutlined,
  TimerOutlined,
  AddCardOutlined,
  Inventory2Outlined,
  LocationCityOutlined,
  FlagOutlined,
  EditOutlined,
} from "@mui/icons-material";

import { TextFieldStyled } from "components/styled/TextField";
import ButtonLoader from "components/shared/ButtonLoader";
import FlavorAutocomplete from "../VariantsRepeater/FlavorAutocomplete";
import PackingAutocomplete from "../VariantsRepeater/PackingAutocomplete";
import { _Product } from "api/product/product";

const VariantUpdate = ({
  variantData: initialVariant,
  flavors,
  packings,
  flavorsIsLoading,
  packingsIsLoading,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [variantData, setVariantData] = useState(initialVariant || {});

  // Handle normal input fields
  const handleChange = (field, value) => {
    setVariantData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle flavor/packing select
  const handleOptionChange = (type, value) => {
    setVariantData((prev) => ({
      ...prev,
      option_value_ids:
        type === "flavor"
          ? [value, prev.option_value_ids?.[1]]
          : [prev.option_value_ids?.[0], value],
    }));
  };

  // Update variant API call
  const handleUpdate = () => {
    setLoading(true);
    _Product
      .updateVariant({ id: initialVariant.id, formData: variantData })
      .then((res) => {
        if (res.code === 200) setOpen(false);
      })
      .finally(() => setLoading(false));
  };
  const cityFields = [
    {
      name: "price",
      label: "Price",
      icon: <MonetizationOnOutlined fontSize="small" />,
      type: "number",
    },
    {
      name: "compare_price",
      label: "compare price (Discount)",
      icon: <DiscountOutlined fontSize="small" />,
      type: "number",
    },
    {
      name: "compare_price_start_date",
      label: "Discount Start",
      icon: <TimerOutlined fontSize="small" />,
      type: "date",
    },
    {
      name: "compare_price_end_date",
      label: "Discount End",
      icon: <TimerOutlined fontSize="small" />,
      type: "date",
    },
    {
      name: "tax_class_id",
      label: "Tax",
      icon: <AddCardOutlined fontSize="small" />,
      type: "number",
    },
    {
      name: "inventory",
      label: "Inventory",
      icon: <Inventory2Outlined fontSize="small" />,
      type: "number",
      helperText: "The number of items available for sale",
    },
    {
      name: "storage_qty",
      label: "storage qty",
      icon: <Inventory2Outlined fontSize="small" />,
      type: "number",
      helperText:
        "Total items physically in the warehouse.Includes all items—even reserved or damaged.",
    },
    {
      name: "unit_quantity",
      label: "unit quantity",
      icon: <Inventory2Outlined fontSize="small" />,
      type: "number",
      helperText: "Number of units inside one pack.",
    },
    {
      name: "reorder_point",
      label: "reorder point",
      icon: <Inventory2Outlined fontSize="small" />,
      type: "number",
    },
  ];

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditOutlined color="primary.main" />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Variant{" "}
          <FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={variantData.purchasable === "always"}
                  onChange={(e) =>
                    handleChange(
                      "purchasable",
                      e.target.checked ? "always" : "false"
                    )
                  }
                />
              }
              label="Purchasable"
            />
          </FormControl>
        </DialogTitle>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {/* SKU */}
            <Grid item xs={12} md={4}>
              <Typography color="text.primary">SKU</Typography>
              <TextFieldStyled
                sx={{ mt: 1 }}
                fullWidth
                value={variantData.sku || ""}
                onChange={(e) => handleChange("sku", e.target.value)}
              />
            </Grid>

            {/* Flavor */}
            <Grid item xs={12} md={4}>
              <FlavorAutocomplete
                value={variantData.options[0]}
                onChange={(value) => handleOptionChange("flavor", value)}
                flavors={flavors}
                flavorsIsLoading={flavorsIsLoading}
              />
            </Grid>

            {/* Packing */}
            <Grid item xs={12} md={4}>
              <PackingAutocomplete
                value={variantData.options[1]}
                onChange={(value) => handleOptionChange("packing", value)}
                packings={packings}
                packingsIsLoading={packingsIsLoading}
              />
            </Grid>

            {/* City Fields */}
            <Grid item xs={12}>
              <Box
                sx={{
                  border: ".0625rem solid",
                  borderColor: "primary.light",
                  borderRadius: 2,
                  p: 1,
                  backgroundColor: "primary.lighter",
                }}
              >
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 2 }}>
                  <LocationCityOutlined sx={{ mb: -0.5, mr: 0.5 }} />
                  City-Specific Data
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    p: 1,
                    borderRadius: 2,
                    boxShadow: 1,
                    backgroundColor: "background.default",
                  }}
                >
                  <Typography
                    color="text.primary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      gap: 0.5,
                      fontWeight: "bold",
                    }}
                  >
                    <FlagOutlined sx={{ mr: 0.5 }} />
                    City ID: {variantData?.city_id || "—"}
                  </Typography>

                  <Grid container spacing={2}>
                    {cityFields.map((field) => (
                      <Grid item xs={12} sm={6} md={3} key={field.name}>
                        <Typography
                          variant="body1"
                          color="text.main"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          {field.icon}
                          {field.label}
                        </Typography>
                        <TextFieldStyled
                          type={field.type}
                          fullWidth
                          value={variantData[field.name] || ""}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                          helperText={field.helperText}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color: "text.main" }}>
            Cancel
          </Button>
          <ButtonLoader
            name="Update"
            onClick={handleUpdate}
            type="save"
            loading={loading}
            disableOnLoading
          >
            Update
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VariantUpdate;
