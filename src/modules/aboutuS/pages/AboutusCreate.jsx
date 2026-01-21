import { Typography, Box, Button, Grid } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import { useAboutusCreate } from "../hooks/useAboutusCreate";
import ButtonLoader from "components/shared/ButtonLoader";
const AboutusCreate = () => {
  const {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    handleReset,
    loading,
    t,
    errors,
  } = useAboutusCreate();

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Aboutus}")}
      </Typography>
      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid item lg="12">
              {/* * //details */}

              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" color="text.main">
                  Name
                </Typography>
              </Box>
              <TextFieldStyled
                sx={{ width: "100%" }}
                type={"text"}
                placeholder={"Name"}
                name="name"
                {...register("name")}
                error={errors.name?.message}
                helperText={errors.name?.message || ""}
              />
            </Grid>
            <Grid item lg="12">
              {/* * //details */}

              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" color="text.main">
                  Image
                </Typography>
              </Box>
              <TextFieldStyled
                sx={{ width: "100%" }}
                type={"file"}
                placeholder={"image"}
                name="image"
                {...register("logo_url")}
                error={errors.logo_url?.message}
                helperText={errors.logo_url?.message || ""}
              />
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
          <Button
            variant="outlined"
            sx={{
              width: "120px",
              borderColor: "origin.main",
              color: "text.main",
              "&:hover": {
                borderColor: "origin.main",
              },
            }}
            onClick={handleCancel}
          >
            {t("Cancel")}
          </Button>
          <ButtonAction name={t("Reset")} onClick={handleReset} type="reset" />
          <ButtonLoader
            name={t("Submit")}
            onClick={() => handleSubmit(hanldeCreate)()}
            type="submit"
            loading={loading}
            disableOnLoading
          >
            {t("Submit")}
          </ButtonLoader>
        </Box>
      </BoxStyled>
    </Box>
  );
};

export default AboutusCreate;
