import React from "react";
import { Box, Grid, Typography, IconButton, Button } from "@mui/material";
import {
  Add,
  Delete,
  DiscountOutlined,
  FlagOutlined,
  Inventory2Outlined,
  LocationCityOutlined,
  MonetizationOnOutlined,
  TimerOutlined,
} from "@mui/icons-material";
import { TextFieldStyled } from "components/styled/TextField";
import FlavorAutocomplete from "./FlavorAutocomplete";
import PackingAutocomplete from "./PackingAutocomplete";

const VariantCard = ({
  index,
  variant,
  variants,
  setVariants,
  onRemove,
  onAddVariant,
  flavors,
  packings,
  addNewPacking,
  selectedCities,
  regions,
}) => {
  // Update top-level variant
  const handleChange = (field, value) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  // Update per-city data
  const handleCityDataChange = (cityId, field, value) => {
    const updated = [...variants];
    const cityData = updated[index].cityData || {};
    const cityValues = cityData[cityId] || {};

    let finalValue = value;

    // number fields → convert to number or null
    if (
      [
        "price",
        "compare_price",
        "inventory",
        "qty",
        "unit",
        "reorder_point",
      ].includes(field)
    ) {
      finalValue = value === "" ? null : Number(value);
    }

    // date fields
    if (
      ["compare_price_start_date", "compare_price_end_date"].includes(field)
    ) {
      finalValue = value === "" ? null : value;
    }

    cityData[cityId] = { ...cityValues, [field]: finalValue };
    updated[index].cityData = cityData;

    setVariants(updated);
  };

  // Option (flavor/packing)
  const handleOptionChange = (type, value) => {
    const updated = [...variants];
    const current = updated[index];

    const flavorId = current.option_value_ids?.[0] || null;
    const packingId = current.option_value_ids?.[1] || null;

    updated[index].option_value_ids =
      type === "flavor"
        ? [value?.id || null, packingId]
        : [flavorId, value?.id || null];

    setVariants(updated);
  };

  // Final required city fields
  const cityFields = [
    {
      name: "price",
      label: "Price",
      icon: <MonetizationOnOutlined fontSize="small" />,
      type: "number",
    },
    {
      name: "compare_price",
      label: "Discount",
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
      helperText: "The number of items available for sale",
    },
    {
      name: "qty",
      label: "storage qty",
      icon: <Inventory2Outlined fontSize="small" />,
      type: "number",
      helperText:
        "Total items physically in the warehouse.Includes all items—even reserved or damaged.",
    },
    {
      name: "unit",
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
    <Box
      sx={{
        backgroundColor: "background.paper",
        border: "2px solid",
        borderColor: "primary.main",
        m: 2,
        borderRadius: 2,
        p: 2,
      }}
    >
      <Grid container spacing={2}>
        {/* Header */}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color={"text.primary"} variant="h6">
            Variant {index + 1}
          </Typography>

          <Box>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={onAddVariant}
            >
              <Add fontSize="small" /> Add
            </Button>

            {variants.length > 1 && (
              <IconButton color="error" onClick={onRemove}>
                <Delete />
              </IconButton>
            )}
          </Box>
        </Grid>

        {/* Flavor */}
        <Grid item xs={12} md={6}>
          <FlavorAutocomplete
            value={
              flavors?.find((f) => f.id === variant.option_value_ids?.[0]) ||
              null
            }
            onChange={(v) => handleOptionChange("flavor", v)}
          />
        </Grid>

        {/* Packing */}
        <Grid item xs={12} md={6}>
          <PackingAutocomplete
            value={
              packings?.find((p) => p.id === variant.option_value_ids?.[1]) ||
              null
            }
            packings={packings}
            addNewPacking={addNewPacking}
            onChange={(v) => handleOptionChange("packing", v)}
          />
        </Grid>

        {/* SKU */}
        <Grid item xs={12} md={6}>
          <Typography color={"text.primary"}>SKU</Typography>
          <TextFieldStyled
            fullWidth
            value={variant.sku || ""}
            onChange={(e) => handleChange("sku", e.target.value)}
          />
        </Grid>

        {/* City fields */}
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
            <Typography color={"text.primary"} fontWeight="bold">
              <LocationCityOutlined sx={{ mb: -0.5 }} /> City-Specific Data
            </Typography>

            {selectedCities.map((cityId) => {
              const city = regions?.find((c) => c.id === cityId);
              const cityData = variant.cityData?.[cityId] || {};

              return (
                <Box
                  key={cityId}
                  sx={{
                    mt: 2,
                    p: 1,
                    borderRadius: 2,
                    boxShadow: 1,
                    backgroundColor: "background.default",
                  }}
                >
                  <Typography
                    color={"text.primary"}
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    fontWeight="bold"
                  >
                    <FlagOutlined /> {city?.name}
                  </Typography>

                  <Grid container spacing={2}>
                    {cityFields.map((field) => (
                      <Grid item xs={12} sm={6} md={3} key={field.name}>
                        <Typography
                          color={"text.primary"}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          {field.icon} {field.label}
                        </Typography>

                        <TextFieldStyled
                          fullWidth
                          type={field.type}
                          value={cityData[field.name] ?? ""}
                          helperText={field.helperText}
                          onChange={(e) =>
                            handleCityDataChange(
                              cityId,
                              field.name,
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VariantCard;
