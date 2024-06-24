import { Box, Typography, Grid, Button } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginBg from "theme/LoginBg";
import { useTranslation } from "react-i18next";
import { _AuthApi } from "api/auth";
let schema = yup.object().shape({
  code: yup
    .string()
    .required("Verification code is required")
    .length(6, "Verification code must be 6 characters long")
    .matches(/^[0-9]+$/, "Verification code must be a number"),
});
const VerificationCodeForm = () => {
  const { t } = useTranslation("index");

  const { email } = useParams();
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = async (e) => {
    _AuthApi.verifyCode({ email, code }).then((res) =>
      navigate(`/reset-password/edit-password/${email}/${code}`, {
        replace: true,
      }).catch((err) => console.log(err))
    );
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
            <Typography variant="h5" sx={{ color: "#a1eaef", mt: "10px" }}>
              {t("Enter Your Code")}
            </Typography>

            <Typography
              variant="p"
              sx={{
                color: "lightGray.main",
                mt: "10px",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              An email with a verification code has been sent to {email}
            </Typography>
          </Grid>

          <Box
            sx={{ width: "100%", mt: "30px" }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box sx={{ margin: "0 0 8px 5px" }}>
              <Typography variant="inputTitle" htmlFor="code">
                {t("Code")}
              </Typography>
            </Box>

            <TextFieldStyled
              type="text"
              sx={{ width: "100%" }}
              placeholder="Enter your code"
              {...register("code", { validate: true })}
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {errors.code && (
              <span className="field_level_error" style={{ color: "red" }}>
                {errors.code.message}
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
              Verify Code
            </Button>
          </Box>
        </BoxStyled>
      </Box>
    </LoginBg>
  );
};

export default VerificationCodeForm;
