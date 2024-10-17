import {
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Alert,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import { useAdminCreate } from "../hooks/useAdminCreate";
import ButtonReset from "components/shared/ButtonReset";
import ButtonCancle from "components/shared/ButtonCancle";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const AdminCreate = () => {
  const {
    hanldeCreate,
    register,
    handleSubmit,
    loading,
    t,
    errors,
    details,
    showPassword,
    handleTogglePasswordVisibility,
    Err,
  } = useAdminCreate();

  return (
    <Box>
      {loading && <Loader />}

      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Admin")}
      </Typography>
      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form">
          <Grid container spacing={2}>
            {details.map((item, index) => (
              <Grid key={index} item xs={6} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="body1" color="text.secondary">
                    {item.head}
                  </Typography>
                </Box>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={
                    item.type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : item.type
                  }
                  placeholder={item.placeholder}
                  defaultValue={item.defaultValue}
                  name={item.name}
                  {...register(item.register)}
                  error={errors[item.error]?.message}
                  helperText={errors[item.helperText]?.message || ""}
                  InputProps={{
                    autoComplete: false,
                    endAdornment: (
                      <InputAdornment position="end">
                        {item.type === "password" ? (
                          <IconButton onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ) : (
                          <div></div>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ))}
            <Grid xs={6} sx={{ p: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="role"
                  {...register("role")}
                  error={errors?.role?.message}
                  helperText={errors?.role?.message}
                >
                  <MenuItem value={"ecommerce_admin"}>
                    E-commerce admin
                  </MenuItem>
                  <MenuItem value={"super_admin"}>super admin</MenuItem>
                  <MenuItem value={"website_admin"}>website admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            mt: "20px",
            display: "flex",
            justifyContent: "flex-end",
            columnGap: "15px",
          }}
        >
          <ButtonCancle />

          <ButtonAction
            name={t("Submit")}
            onClick={() => handleSubmit(hanldeCreate)()}
            type="submit"
          />
        
        </Box>
        {Err?.email &&
            Err?.email?.map((item) => <Alert severity="error">{item}</Alert>)}
      </BoxStyled>
    </Box>
  );
};

export default AdminCreate;
