import { Box, Typography, Grid, Button } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginBg from "theme/LoginBg";
import { useTranslation } from "react-i18next";
import { _AuthApi } from "api/auth";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("This must be a valid email")
    .required("Email is required"),
});

const ResetPassword = () => {
  const { t } = useTranslation("index");

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = async (e) => {
    // e.preventDefault();

    _AuthApi
      .resetPass({ email })
      .then((res) =>
        navigate(`/reset-password/check-code/${email}`, { replace: true })
      )
      .catch((err) => console.log(err));
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
        {t("Back")}
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
              <Typography variant="inputTitle">{t("Email")}</Typography>
            </Box>
            <TextFieldStyled
              type="email"
              sx={{ width: "100%" }}
              placeholder="Enter your email"
              {...register("email", { validate: true })}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="field_level_error" style={{ color: "red" }}>
                {errors.email.message}
              </span>
            )}
            <Box
              sx={{
                marginTop: "30px",
                width: 400,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
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
                Send Verification Code
              </Button>
            </Box>
          </Box>
        </BoxStyled>
      </Box>
    </LoginBg>
  );
};

export default ResetPassword;
