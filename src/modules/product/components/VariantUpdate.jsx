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
import { _Regions } from "api/regions/regions";
import FlavorAutocomplete from "./VariantsRepeater/FlavorAutocomplete";
import PackingAutocomplete from "./VariantsRepeater/PackingAutocomplete";
import { _Product } from "api/product/product";

const VariantUpdate = ({ variantData: initialVariant, flavors, packings }) => {
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  const [open, setOpen] = useState(false);
  const [variantData, setVariantData] = useState(initialVariant || {});

  useEffect(() => {
    _Regions.index().then((response) => {
      if (response.code === 200) setRegions(response.data);
    });
  }, []);

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
console.log("initialVariant",initialVariant)
  const cityFields = [
    { name: "price", label: "Price", icon: <MonetizationOnOutlined fontSize="small" />, type: "number" },
    { name: "compare_price", label: "Discount", icon: <DiscountOutlined fontSize="small" />, type: "number" },
    { name: "compare_price_start", label: "Discount Start", icon: <TimerOutlined fontSize="small" />, type: "date" },
    { name: "compare_price_end", label: "Discount End", icon: <TimerOutlined fontSize="small" />, type: "date" },
    { name: "tax_class_id", label: "Tax Class", icon: <AddCardOutlined fontSize="small" />, type: "number" },
    { name: "inventory", label: "Inventory", icon: <Inventory2Outlined fontSize="small" />, type: "number" },
    { name: "qty", label: "Quantity", icon: <Inventory2Outlined fontSize="small" />, type: "number" },
    { name: "points", label: "Points", icon: <AddCardOutlined fontSize="small" />, type: "number" },
  ];

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditOutlined color="primary.main" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Variant</DialogTitle>

        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {/* SKU */}
            <Grid item xs={12} md={6}>
              <Typography color="text.primary">SKU</Typography>
              <TextFieldStyled
                fullWidth
                value={variantData.sku || ""}
                onChange={(e) => handleChange("sku", e.target.value)}
              />
            </Grid>

            {/* Inventory */}
            <Grid item xs={12} md={6}>
              <Typography color="text.primary">Inventory</Typography>
              <TextFieldStyled
                fullWidth
                type="number"
                value={variantData.inventory || ""}
                onChange={(e) => handleChange("inventory", e.target.value)}
              />
            </Grid>

            {/* Flavor */}
            <Grid item xs={12} md={6}>
              <FlavorAutocomplete
                value={variantData.option_value_ids?.[0]}
                onChange={(value) => handleOptionChange("flavor", value)}
              />
            </Grid>

            {/* Packing */}
            <Grid item xs={12} md={6}>
              <PackingAutocomplete
                value={variantData.option_value_ids?.[1]}
                packings={packings}
                onChange={(value) => handleOptionChange("packing", value)}
              />
            </Grid>

            {/* City Fields */}
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "1px solid",
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
