import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Chip,
  Box,
  TextField,
  Skeleton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { _Regions } from "api/regions/regions";
import { _cities } from "api/cities/cities";
import { colorStore } from "store/ColorsStore";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import Autocomplete from "@mui/material/Autocomplete";
import CountryUpdate from "./CountryUpdate";
import { useCities } from "hooks/cities/useCities";

const LinkCityToCountry = ({ openLink, setopenLink }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const { data, isLoading } = useCities();

  // 🧠 Load all cities
  useEffect(() => {
    if (data) {
      const allCities = data?.data?.state || [];
      setCities(allCities);
      setFilteredCities(allCities);
    }
  }, [data]);

  // 🧩 Preselect cities if region already has them
  useEffect(() => {
    if (editedID?.cities?.length > 0) {
      setSelectedCities(editedID.cities);
    }
  }, [editedID]);

  const handleClose = () => {
    setopenLink(false);
    setEditedID(null);
    setSelectedCities([]);
  };

  const handleToggleCity = (city) => {
    setSelectedCities((prev) => {
      const exists = prev.some((c) => c.id === city.id);
      return exists ? prev.filter((c) => c.id !== city.id) : [...prev, city];
    });
  };

  const handleSearch = (event, value) => {
    const query = value?.toLowerCase() || "";
    setFilteredCities(
      cities.filter((city) => city.name.toLowerCase().includes(query))
    );
  };

  const handleSave = async () => {
    if (!editedID?.id) return;
    setLoading(true);
    try {
      const response = await _Regions.Link({
        editedID: editedID.id,
        formData: { cities: selectedCities.map((c) => c.id) },
      });
      if (response.code === 200) {
        handleClose();
      } else {
        console.error("Failed:", response);
      }
    } catch (error) {
      console.error("Error linking cities:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <Dialog
        open={openLink}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        sx={{ "& .MuiPaper-root": { borderRadius: "16px" } }}
      >
        <DialogTitle sx={{ color: "text.main", fontWeight: 600 }}>
          {t("Manage Cities in")}{" "}
          <span style={{ color: "#7C3AED" }}>{editedID?.name} </span>
          <span>
            <CountryUpdate />
          </span>
        </DialogTitle>

        <Box sx={{ px: 3, py: 2 }}>
          {/* 🔍 Search */}
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option.name || ""}
            onInputChange={handleSearch}
            renderInput={(params) => (
              <TextField {...params} label={t("Search cities...")} fullWidth />
            )}
          />

          {/* 🏙 Selected cities chips */}
          {isLoading ? (
            <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="Outlined"
                  width={80 + Math.random() * 40} // random chip width for realism
                  height={32}
                  animation="wave"
                  sx={{ borderRadius: 16 }}
                />
              ))}
            </Box>
          ) : (
            <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selectedCities.map((city) => (
                <Chip
                  key={city.id}
                  label={city.name}
                  color="secondary"
                  onDelete={() =>
                    setSelectedCities((prev) =>
                      prev.filter((c) => c.id !== city.id)
                    )
                  }
                />
              ))}
            </Box>
          )}

          {/* 🧱 Available cities */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            {filteredCities.map((city) => {
              const isSelected = selectedCities.some((c) => c.id === city.id);
              return (
                <Grid item xs={12} sm={6} md={4} key={city.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      border: isSelected
                        ? "2px solid #7C3AED"
                        : "1px solid #ccc",
                      boxShadow: isSelected
                        ? "0 0 10px rgba(124,58,237,0.4)"
                        : "0 1px 4px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                  >
                    <CardActionArea onClick={() => handleToggleCity(city)}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: isSelected ? "secondary.main" : "text.main",
                          }}
                        >
                          {city.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          Shipping: {city.shipping_price ?? "—"}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} sx={{ color: "text.main" }}>
            {t("Cancel")}
          </Button>
          <ButtonLoader
            name={t("Save Changes")}
            onClick={handleSave}
            type="save"
            loading={loading}
            disableOnLoading
          >
            {t("Save Changes")}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LinkCityToCountry;
