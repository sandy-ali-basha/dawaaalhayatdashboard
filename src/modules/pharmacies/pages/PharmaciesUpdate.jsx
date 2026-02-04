import React, { useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { usePharmacy } from "hooks/pharmacies/usePharmacy";
import { usePharmaciesUpdate } from "hooks/pharmacies/usePharmaciesUpdate";
import PharmacyMapPicker from "../components/PharmacyMapPicker";
import Loader from "components/shared/Loader";
import { BoxStyled } from "components/styled/BoxStyled";

const PharmaciesUpdate = () => {
  const { id } = useParams();
  const { data, isLoading } = usePharmacy(id);
  const pharmacy = data?.data;

  const {
    handleCancel,
    handleUpdate,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    loading,
    errors,
  } = usePharmaciesUpdate();

  useEffect(() => {
    if (pharmacy) {
      reset({
        name: pharmacy.name,
        city: pharmacy.city,
        phone: pharmacy.phone,
        address: pharmacy.address,
        lat: pharmacy.lat,
        lng: pharmacy.lng,
        hasProducts: pharmacy.hasProducts !== false,
      });
    }
  }, [pharmacy, reset]);

  const mapValue = useMemo(
    () => ({ lat: watch("lat"), lng: watch("lng") }),
    [watch]
  );

  const handleMapChange = ({ lat, lng }) => {
    setValue("lat", Number(lat));
    setValue("lng", Number(lng));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BoxStyled sx={{ p: 2 }} component="form" onSubmit={handleSubmit((input) => handleUpdate(id, input))}>
      <Typography variant="h4" sx={{ color: "text.main", mb: 2 }}>
        Update Pharmacy
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
        </Grid>>
        <Grid item xs={12}>
          <PharmacyMapPicker value={mapValue} onChange={handleMapChange} />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={loading}>
          Save Changes
        </Button>
      </Box>
    </BoxStyled>
  );
};

export default PharmaciesUpdate;
