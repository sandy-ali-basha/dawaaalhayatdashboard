import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  FormControlLabel,
  Switch,
  FormControl,
} from "@mui/material";

import {
  MonetizationOnOutlined,
  DiscountOutlined,
  TimerOutlined,
  Inventory2Outlined,
  LocationCityOutlined,
  AddOutlined,
} from "@mui/icons-material";

import { TextFieldStyled } from "components/styled/TextField";
import ButtonLoader from "components/shared/ButtonLoader";
import FlavorAutocomplete from "./VariantsRepeater/FlavorAutocomplete";
import PackingAutocomplete from "./VariantsRepeater/PackingAutocomplete";
import { _Product } from "api/product/product";
import { useParams } from "react-router-dom";

const emptyVariant = {
  sku: "",
  option_value_ids: [null, null], // flavor_id, packing_id
  purchasable: "always",
  city_id: null,
  // city fields
  price: "",
  compare_price: "",
  compare_price_start_date: "",
  compare_price_end_date: "",
  tax_class_id: "",
  inventory: "",
  storage_qty: "",
  unit_quantity: "",
  reorder_point: "",
};

const VariantCreate = ({
  defaultCity,
  regions,
  flavors,
  regionsLoading,
  packings,
  flavorsIsLoading,
  packingsIsLoading,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [cities, setCities] = useState([]);

  const params = useParams();

  const [variantData, setVariantData] = useState({
    ...emptyVariant,
    city_id: defaultCity || null,
  });

  const openDialog = () => {
    setVariantData({
      ...emptyVariant,
      city_id: defaultCity || null,
      tax_class_id: 1,
    });
    setOpen(true);
  };

  const handleChange = (field, value) => {
    setVariantData((prev) => ({ ...prev, [field]: value }));
  };

  const numericFields = [
    "price",
    "compare_price",
    "inventory",
    "storage_qty",
    "unit_quantity",
    "reorder_point",
    "tax_class_id",
    "city_id",
  ];

  const normalizeVariantData = (data) => {
    const normalized = { ...data };

    numericFields.forEach((field) => {
      if (normalized[field] !== "" && normalized[field] !== null) {
        normalized[field] = Number(normalized[field]);
      }
    });

    return normalized;
  };

  const handleOptionChange = (type, option) => {
    setVariantData((prev) => {
      const current = [...prev.option_value_ids];

      if (type === "flavor") {
        current[0] = option?.id || null;
      } else {
        current[1] = option?.id || null;
      }

      return { ...prev, option_value_ids: current };
    });
  };

  const normalizedRegions = useMemo(() => {
    if (Array.isArray(regions)) return regions;
    if (Array.isArray(regions?.data)) return regions.data;
    return [];
  }, [regions]);

  useEffect(() => {
    if (!defaultCity || normalizedRegions.length === 0) {
      return;
    }

    const matchedRegion = normalizedRegions.find((region) =>
      region?.cities?.some((city) => city.id === Number(defaultCity)),
    );

    if (!matchedRegion) {
      return;
    }

    setSelectedRegion(matchedRegion.id);
    setCities(matchedRegion.cities || []);
  }, [defaultCity, normalizedRegions]);

  const handleCreate = () => {
    setLoading(true);
    const payload = normalizeVariantData(variantData);

    _Product
      .createVariant({
        product_id: params?.id,
        formData: payload,
      })
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
      name: "inventory",
      label: "Inventory",
      icon: <Inventory2Outlined fontSize="small" />,
      type: "number",
    },
    {
      name: "storage_qty",
      label: "Storage Qty",
      icon: <Inventory2Outlined fontSize="small" />,
      type: "number",
    },
    {
      name: "unit_quantity",
      label: "Unit Quantity",
      icon: <Inventory2Outlined fontSize="small" />,
      type: "number",
    },
    {
      name: "reorder_point",
      label: "Reorder Point",
      icon: <Inventory2Outlined fontSize="small" />,
      type: "number",
    },
  ];

  return (
    <>
      <Button
        startIcon={<AddOutlined />}
        variant="contained"
        onClick={openDialog}
        sx={{ mb: 2 }}
      >
        Add Variant
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Add New Variant
          <FormControl sx={{ ml: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={variantData.purchasable === "always"}
                  onChange={(e) =>
                    handleChange(
                      "purchasable",
                      e.target.checked ? "always" : "false",
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
              <Typography>SKU</Typography>
              <TextFieldStyled
                sx={{ mt: 1 }}
                fullWidth
                value={variantData.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
              />
            </Grid>

            {/* Flavor */}
            <Grid item xs={12} md={4}>
              <FlavorAutocomplete
                value={variantData.option_value_ids?.[0] || null}
                onChange={(option) => handleOptionChange("flavor", option)}
                flavors={flavors}
                flavorsIsLoading={flavorsIsLoading}
              />
            </Grid>

            {/* Packing */}
            <Grid item xs={12} md={4}>
              <PackingAutocomplete
                value={variantData.option_value_ids?.[1] || null}
                onChange={(option) => handleOptionChange("packing", option)}
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
                    backgroundColor: "background.default",
                  }}
                >
                  <Grid container spacing={2}>
                    {/* REGION SELECT */}
                    <Grid item xs={12} md={6}>
                      <Typography>Region</Typography>
                      <TextFieldStyled
                        select
                        fullWidth
                        SelectProps={{ native: true }}
                        sx={{ mt: 1 }}
                        value={selectedRegion || ""}
                        onChange={(e) => {
                          const regionId = Number(e.target.value);
                          setSelectedRegion(regionId);
                          const region = normalizedRegions.find(
                            (r) => r.id === regionId,
                          );
                          // Load cities for this region
                          setCities(region?.cities || []);

                          // Reset city id
                          setVariantData((prev) => ({
                            ...prev,
                            city_id: null,
                          }));
                        }}
                      >
                        <option value="">Select Region</option>
                        {normalizedRegions.length > 0 ? (
                          normalizedRegions.map((region) => (
                            <option key={region.id} value={region.id}>
                              {region.name}
                            </option>
                          ))
                        ) : (
                          <option value="">No Options</option>
                        )}
                      </TextFieldStyled>
                    </Grid>

                    {/* CITY SELECT */}
                    <Grid item xs={12} md={6}>
                      <Typography>City</Typography>
                      <TextFieldStyled
                        select
                        fullWidth
                        SelectProps={{ native: true }}
                        sx={{ mt: 1 }}
                        value={variantData.city_id || ""}
                        onChange={(e) =>
                          setVariantData((prev) => ({
                            ...prev,
                            city_id: Number(e.target.value),
                          }))
                        }
                        disabled={!selectedRegion || regionsLoading}
                      >
                        <option value="">Select City</option>

                        {cities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </TextFieldStyled>
                    </Grid>

                    {cityFields.map((field) => (
                      <Grid item xs={12} sm={6} md={3} key={field.name}>
                        <Typography
                          sx={{
                            display: "flex",
                            gap: 0.5,
                            alignItems: "center",
                          }}
                        >
                          {field.icon}
                          {field.label}
                        </Typography>

                        <TextFieldStyled
                          type={field.type}
                          fullWidth
                          value={variantData[field.name]}
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
            name="Add"
            onClick={handleCreate}
            loading={loading}
            type="save"
            disableOnLoading
          >
            Add
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VariantCreate;
