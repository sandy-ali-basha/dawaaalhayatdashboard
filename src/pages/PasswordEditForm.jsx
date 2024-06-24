import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginBg from "theme/LoginBg";
import { useTranslation } from "react-i18next";
import { _AuthApi } from "api/auth";
import { Box, Button, Grid, Typography } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
let schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "The Password must be of six characters")
    .max(20, "The Password must be of 20 characters"),

  confirm_password: yup
    .string()
    .required("Confirm password is required")
    .min(6, "The confirm password must be of six characters")
    .max(20, "The confirm password must be of 20 characters")
    .oneOf([yup.ref("password")], "your password does not match"),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});
const PasswordEditForm = () => {
  const { t } = useTranslation("index");

  const { email, code } = useParams();
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    _AuthApi
      .passEdit({
        email,
        code,
        new_password,
        confirm_password,
      })
      .then((res) => navigate("/", { replace: true }))
      .catch((err) => console.log(err));

    // try {
    //   const response = await _axios.post("/editPassword", {
    //     email,
    //     code,
    //     new_password,
    //     confirm_password,
    //   });
    //   if (response.status === 200) {
    //     navigate("/", { replace: true });
    //   } else {
    //     setError(response.data.error);
    //   }
    // } catch (error) {
    //   setError(error.message);
    // }
  };
  return (
    <LoginBg>
      <Button
        disableOnLoading
        loading={false}
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          width: 130,
          alignItems: "center",
          backgroundColor: "origin.main",
          textAlign: "center",
          ml: "50px",
          mt: "10px",

          "&:hover": {
            backgroundColor: "origin.main",
            transform: "scale(1.1)",
          },
        }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",

          flexDirection: "column",
          backdropFilter: "bluer(20px)",
        }}
      >
        <BoxStyled
          sx={{
            minWidth: "350px",
            width: "30%",
            padding: "40px",
            zIndex: 10000,
            backgroundColor: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          style={{
            backdropFilter: " blur(3px)",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box sx={{ width: "120px" }}></Box>
            <Typography variant="h5" sx={{ color: "#a1eaef", mt: "10px" }}>
              {t("Reset Your Password")}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "lightGray.main", mt: "10px" }}
            >
              {t("Enter your credentials to continue")}
            </Typography>
          </Grid>
          <Box
            sx={{ width: "100%", mt: "30px" }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box sx={{ margin: "0 0 8px 5px" }}>
              <Typography variant="inputTitle" htmlFor="password">
                {t("New Password")}
              </Typography>
            </Box>
            <TextFieldStyled
              type="password"
              sx={{ width: "100%" }}
              placeholder="Enter your password"
              {...register("password", { validate: true })}
              id="password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors.password && (
              <span className="field_level_error" style={{ color: "red" }}>
                {errors.password.message}
              </span>
            )}
            <Box sx={{ margin: "20px 0 8px 5px" }}>
              <Typography variant="inputTitle" htmlFor="confirm-password">
                {t("Confirm Password")}
              </Typography>
            </Box>
            <TextFieldStyled
              type="password"
              sx={{ width: "100%" }}
              placeholder="Confirm Password"
              {...register("confirm_password", { validate: true })}
              id="confirm_password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirm_password && (
              <span className="field_level_error" style={{ color: "red" }}>
                {errors.confirm_password.message}
              </span>
            )}
            <Button
              sx={{
                display: "block",
                width: 200,
                backgroundColor: "origin.main",
                margin: "30px auto 0 auto",
                "&:hover": {
                  backgroundColor: "#a1eaef",
                  transform: "scale(1.1)",
                },
              }}
              disableOnLoading
              loading={false}
              fullWidth
              type="submit"
              variant="contained"
            >
              Update Password
            </Button>
          </Box>
        </BoxStyled>
      </Box>
    </LoginBg>
  );
};

export default PasswordEditForm;
