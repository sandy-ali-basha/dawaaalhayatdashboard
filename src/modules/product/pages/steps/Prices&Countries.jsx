import {
  Typography,
  Box,
  Grid,
  FormControl,
  FormHelperText,
  Card,
  CardActionArea,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BoxStyled } from "components/styled/BoxStyled";
import React from "react";
import { Inventory, Inventory2Outlined, InventoryOutlined, LocationCity } from "@mui/icons-material";
import { useProductCreate } from "modules/product/hooks/useProductCreate";

const PricesAndCountries = ({ selectedCities, setSelectedCities }) => {
  const { errors, regions } = useProductCreate();

  const handleToggleCity = (cityId) => {
    if (selectedCities.includes(cityId)) {
      setSelectedCities(selectedCities.filter((id) => id !== cityId));
    } else {
      setSelectedCities([...selectedCities, cityId]);
    }
  };

  const handleToggleRegion = (region) => {
    const regionCityIds = region.cities.map((c) => c.id);
    const allSelected = regionCityIds.every((id) =>
      selectedCities.includes(id)
    );

    if (allSelected) {
      // deselect all region cities
      setSelectedCities(
        selectedCities.filter((id) => !regionCityIds.includes(id))
      );
    } else {
      // select all cities of that region (avoid duplicates)
      const newSelection = [...new Set([...selectedCities, ...regionCityIds])];
      setSelectedCities(newSelection);
    }
  };

  return (
    <Box>
        <Box component="form">
          <Typography variant="h6" color="text.main" p="10px">
            <LocationCity color="primary.main" /> Select Inv by Country
          </Typography>

          {regions.length > 0 ? (
            <FormControl fullWidth>
              {regions?.map((region) => {
                const regionCityIds = region?.cities.map((c) => c.id);
                const allSelected =
                  regionCityIds.length > 0 &&
                  regionCityIds.every((id) => selectedCities.includes(id));

                return (
                  <Accordion key={region.id} sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={allSelected}
                            indeterminate={
                              !allSelected &&
                              regionCityIds.some((id) =>
                                selectedCities.includes(id)
                              )
                            }
                            onChange={() => handleToggleRegion(region)}
                          />
                        }
                        label={
                          <Typography variant="subtitle1" sx={{ ml: 1 }}>
                            {region.name}
                            {regionCityIds.length === 0 && (
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                                sx={{ ml: 1 }}
                              >
                                (No cities)
                              </Typography>
                            )}
                          </Typography>
                        }
                      />
                    </AccordionSummary>

                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {region.cities.map((city) => {
                          const isSelected = selectedCities.includes(city.id);
                          return (
                            <Grid item xs={6} sm={4} md={3} key={city.id}>
                              <Card
                                sx={{
                                  border: isSelected
                                    ? "2px solid #80b0dfff"
                                    : "1px solid #ccc",
                                  borderRadius: 2,
                                  boxShadow: isSelected ? 4 : 1,
                                  transition: "0.2s",
                                }}
                              >
                                <CardActionArea
                                  onClick={() => handleToggleCity(city.id)}
                                >
                                  <Box sx={{ p: 2, textAlign: "center" }}>
                                    <Typography
                                      variant="body1"
                                      color={
                                        isSelected ? "primary" : "text.primary"
                                      }
                                    >
                                      {city.name}
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {city?.inv_name && (
                                        <Inventory2Outlined
                                          color="secondary"
                                          size="xsmall"
                                        />
                                      )}
                                      <Typography
                                        variant="body2"
                                        color={
                                          isSelected
                                            ? "primary"
                                            : "text.secondary"
                                        }
                                      >
                                        {city?.inv_name || ""}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </CardActionArea>
                              </Card>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
              <FormHelperText error>{errors.city_id?.message}</FormHelperText>
            </FormControl>
          ) : (
            <Grid container spacing={2}>
              {[...Array(6)].map((_, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <Card sx={{ borderRadius: 2, boxShadow: 1, p: 2 }}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={30}
                      animation="wave"
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
    </Box>
  );
};

export default PricesAndCountries;
