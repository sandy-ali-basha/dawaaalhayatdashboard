import { Box, Typography, Grid, Button } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _AuthApi } from "api/auth";
import LoginBg from "theme/LoginBg";
import { useTranslation } from "react-i18next";
import ButtonLoader from "components/shared/ButtonLoader";
import { useState } from "react";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("This must be a valid email")
    .required("Email Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "The Password must be of six characters")
    .max(20, "The Password must be of 20 characters"),
});

const Login = () => {
  const { t } = useTranslation("index");

  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const onSubmit = (input) => {
    setLoading(true);

    _AuthApi
      .login(input)
      .then((response) => {
        if (response.data.code === 200) {
          navigate("/dashboard");
          setLoading(true);
          localStorage.setItem("role", response?.data?.data?.roles[0]?.name);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <LoginBg>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          flexDirection: "column",
        }}
      >
        <BoxStyled
          sx={{
            minWidth: "350px",
            width: "30%",
            padding: "40px",
            zIndex: 10000,
            background: "#878d8b",
            mixBlendMode: "luminosity",
            boxShadow: "0px 0px 24px 1px rgb(102 165 171)",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box sx={{ width: "120px" }}></Box>
            <Typography variant="h5" sx={{ color: "white", mt: "10px" }}>
              {t("Hi, Welcome Back")}
            </Typography>
            <Typography variant="h6" sx={{ color: "white", mt: "10px" }}>
              {t("pleas Enter your credentials to continue")}
            </Typography>
          </Grid>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: "100%" }}
          >
            <Box sx={{ width: "100%", mt: "20px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ color: "white" }}
                >
                  {t("Email")}
                </Typography>
              </Box>
              <TextFieldStyled
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": { color: "white" },
                }}
                placeholder="Enter your email"
                {...register("email", { validate: true })}
              />
              {errors.email && (
                <span className="field_level_error" style={{ color: "red" }}>
                  {errors.email.message}
                </span>
              )}
            </Box>
            <Box sx={{ width: "100%", mt: "20px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography
                  sx={{ color: "white" }}
                  variant="body1"
                  color="text.secondary"
                >
                  {t("Password")}
                </Typography>
              </Box>
              <TextFieldStyled
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": { color: "white" },
                }}
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <span className="field_level_error" style={{ color: "red" }}>
                  {errors.password.message}
                </span>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                my: "10px",
              }}
            >
              {loading ? (
                <ButtonLoader
                  sx={{
                    display: "block",
                    width: 130,
                    height: 200,
                    backgroundColor: "origin.main",
                    margin: "30px auto 0 auto",
                    "&:hover": {
                      backgroundColor: "#a1eaef",
                      transform: "scale(1.1)",
                    },
                  }}
                  disableOnLoading
                  loading={true}
                  disabled={loading}
                  fullWidth
                >
                  Waiting..
                </ButtonLoader>
              ) : (
                <Button
                  sx={{
                    display: "block",
                    width: 130,
                    backgroundColor: "origin.main",
                    margin: "30px auto 0 auto",
                    "&:hover": {
                      backgroundColor: "#a1eaef",
                      transform: "scale(1.1)",
                    },
                  }}
                  disabled={loading}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  {t("Sign In")}
                </Button>
              )}
            </Box>
            {/* <Box
              sx={{
                margin: "20px 0 8px 5px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <NavLink to="/reset-password">
                <Typography variant="body1" color="text.secondary">
                  {t("Reset Password")}
                </Typography>
              </NavLink>
            </Box> */}
          </Box>
          {/* <Box
            sx={{
              margin: "10px 0 8px 5px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Typography variant="body1" color="text.secondary">{t("Forgret assword")}</Typography>
          </Box> */}
        </BoxStyled>
      </Box>
    </LoginBg>
  );
};

export default Login;
