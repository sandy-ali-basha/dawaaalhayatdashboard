import React from "react";
import { Box, Grid, Typography, IconButton, Button } from "@mui/material";
import {
  Add,
  AddCardOutlined,
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
  packings,
  addNewPacking,
  selectedCities,
  regions,
}) => {
  // Update top-level variant fields
  const handleChange = (field, value) => {
    const newVariants = [...variants];
    newVariants[index] = {
      ...newVariants[index],
      [field]: value,
    };
    setVariants(newVariants);
  };

  // Update per-city data
  const handleCityDataChange = (cityId, field, value) => {
    const newVariants = [...variants];
    const variantCityData = newVariants[index].cityData || {};
    const cityValues = variantCityData[cityId] || {};

    variantCityData[cityId] = {
      ...cityValues,
      [field]: value,
    };

    newVariants[index].cityData = variantCityData;
    setVariants(newVariants);
  };

  const handleOptionChange = (optionType, value) => {
    console.log("optionType, value", optionType, value);
    const newVariants = [...variants];
    const currentVariant = newVariants[index];

    const flavorId = currentVariant.option_value_ids?.[0] || "";
    const packingId = currentVariant.option_value_ids?.[1] || "";
   
    if (optionType === "flavor") {
      newVariants[index].option_value_ids = [value?.id || "", packingId];
    } else {
      newVariants[index].option_value_ids = [flavorId, value?.id || ""];
    }

    console.log("newVariants", newVariants);
    setVariants(newVariants);
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
      label: "Discount",
      icon: <DiscountOutlined fontSize="small" />,
      type: "number",
    },
    {
      name: "compare_price_start",
      label: "Discount Start",
      icon: <TimerOutlined fontSize="small" />,
      type: "date",
    },
    {
      name: "compare_price_end",
      label: "Discount End",
      icon: <TimerOutlined fontSize="small" />,
      type: "date",
    },
    {
      name: "tax",
      label: "Tax",
      icon: <AddCardOutlined fontSize="small" />,
      type: "number",
    },
    {
      name: "quantity",
      label: "Unit Quantity",
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
          <Typography variant="h6" color="text.primary">
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

        {/* SKU */}
        <Grid item xs={12} md={6}>
          <Typography color="text.primary">SKU</Typography>
          <TextFieldStyled
            fullWidth
            value={variant.sku || ""}
            onChange={(e) => handleChange("sku", e.target.value)}
          />
        </Grid>

        {/* Inventory */}
        <Grid item xs={12} md={6}>
          <Typography color="text.primary">Inventory qty</Typography>
          <TextFieldStyled
            fullWidth
            type="number"
            value={variant.inventory || ""}
            onChange={(e) => handleChange("inventory", e.target.value)}
          />
        </Grid>

        {/* Flavor */}
        <Grid item xs={12} md={6}>
          <FlavorAutocomplete
            value={variant.option_value_ids?.[0] || ""}
            onChange={(value) => handleOptionChange("flavor", value)}
          />
        </Grid>

        {/* Packing */}
        <Grid item xs={12} md={6}>
          <PackingAutocomplete
            value={variant.option_value_ids?.[1] || ""}
            packings={packings}
            addNewPacking={addNewPacking}
            onChange={(value) => handleOptionChange("packing", value)}
          />
        </Grid>

        {/* City-Specific Fields */}
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
            <Typography variant="body1" color="text.main" fontWeight="bold">
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
                    {city?.name || `City #${cityId}`}
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
                          value={cityData[field.name] || ""}
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
