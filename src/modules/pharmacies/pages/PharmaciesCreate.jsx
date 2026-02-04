import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { usePharmaciesCreate } from "hooks/pharmacies/usePharmaciesCreate";
import PharmacyMapPicker from "../components/PharmacyMapPicker";
import { pharmaciesSeed } from "../data/pharmacies";

const PharmaciesCreate = () => {
  const {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    setValue,
    watch,
    loading,
    errors,
  } = usePharmaciesCreate();
  const [selectedPharmacyId, setSelectedPharmacyId] = useState("");

  const mapValue = useMemo(
    () => ({ lat: watch("lat"), lng: watch("lng") }),
    [watch]
  );

  const handleSelectPharmacy = (event) => {
    const selectedId = event.target.value;
    setSelectedPharmacyId(selectedId);

    const selected = pharmaciesSeed.find(
      (pharmacy) => pharmacy.id === Number(selectedId)
    );

    if (selected) {
      setValue("name", selected.name);
      setValue("city", selected.city);
      setValue("phone", selected.phone);
      setValue("address", selected.address);
      setValue("lat", selected.lat);
      setValue("lng", selected.lng);
      setValue("hasProducts", selected.hasProducts !== false);
    }
  };

  const handleMapChange = ({ lat, lng }) => {
    setValue("lat", Number(lat));
    setValue("lng", Number(lng));
  };

  return (
    <Box component="form" onSubmit={handleSubmit(hanldeCreate)}>
      <Typography variant="h4" sx={{ color: "text.main", mb: 2 }}>
        Add Pharmacy
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Choose pharmacy"
            value={selectedPharmacyId}
            onChange={handleSelectPharmacy}
            fullWidth
          >
            <MenuItem value="">Custom entry</MenuItem>
            {pharmaciesSeed.map((pharmacy) => (
              <MenuItem key={pharmacy.id} value={pharmacy.id}>
                {pharmacy.name} ({pharmacy.city})
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={<Checkbox {...register("hasProducts")} defaultChecked />}
            label="Has products"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Name"
            fullWidth
            {...register("name")}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="City"
            fullWidth
            {...register("city")}
            error={Boolean(errors.city)}
            helperText={errors.city?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Phone"
            fullWidth
            {...register("phone")}
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Address"
            fullWidth
            {...register("address")}
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Latitude"
            fullWidth
            value={watch("lat") ?? ""}
            InputProps={{ readOnly: true }}
            error={Boolean(errors.lat)}
            helperText={errors.lat?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Longitude"
            fullWidth
            value={watch("lng") ?? ""}
            InputProps={{ readOnly: true }}
            error={Boolean(errors.lng)}
            helperText={errors.lng?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <PharmacyMapPicker value={mapValue} onChange={handleMapChange} />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={loading}>
          Save Pharmacy
        </Button>
      </Box>
    </Box>
  );
};

export default PharmaciesCreate;
