import {
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Grid,
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
                  <Typography variant="body1" color="text.secondary">{item.head}</Typography>
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
          <ButtonReset />
          <ButtonAction
            name={t("Submit")}
            onClick={() => handleSubmit(hanldeCreate)()}
            type="submit"
          />
        </Box>
      </BoxStyled>
    </Box>
  );
};

export default AdminCreate;
