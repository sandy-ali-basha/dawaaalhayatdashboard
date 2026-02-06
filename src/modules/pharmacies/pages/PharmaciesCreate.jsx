import React, { useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { usePharmaciesCreate } from "hooks/pharmacies/usePharmaciesCreate";
import PharmacyMapPicker from "../components/PharmacyMapPicker";
import { BoxStyled } from "components/styled/BoxStyled";

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
  
  const mapValue = useMemo(
    () => ({ lat: watch("lat"), lng: watch("lng") }),
    [watch]
  );
  const handleMapChange = ({ lat, lng }) => {
    setValue("lat", Number(lat));
    setValue("lng", Number(lng));
  };

  return (
    <BoxStyled sx={{ p: 2 }} component="form" onSubmit={handleSubmit(hanldeCreate)}>
      <Typography variant="h4" sx={{ color: "text.main", mb: 2 }}>
        Add Pharmacy
      </Typography>

      <Grid container spacing={2}>
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
    </BoxStyled>
  );
};

export default PharmaciesCreate;
