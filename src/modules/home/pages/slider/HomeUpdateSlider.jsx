import { Typography, Box, Button, Grid, TextField } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import { useHomepagesUpdateSlider } from "modules/home/hooks/useHomepagesUpdateSlider";

const HomeUpdateSlider = () => {
  const {
    handleCancel,
    handleSubmit,
    handleUpdate,
    register,
    errors,
    t,
    loading,
  } = useHomepagesUpdateSlider();

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Update slider")}
      </Typography>

      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form" onSubmit={handleSubmit(handleUpdate)}>
          <Grid container spacing={2}>
            {["en", "ar", "kr"].map((lang) => (
              <React.Fragment key={lang}>
                <Grid item xs={12} sm={6}>
                  <Typography color="text.main">{`${t(
                    "title"
                  )} (${lang.toUpperCase()})`}</Typography>
                  <TextField
                    fullWidth
                    {...register(`${lang}.title`)}
                    error={!!errors?.[lang]?.title}
                    helperText={errors?.[lang]?.title?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography color="text.main">{`${t(
                    "text"
                  )} (${lang.toUpperCase()})`}</Typography>
                  <TextField
                    fullWidth
                    {...register(`${lang}.text`)}
                    error={!!errors?.[lang]?.text}
                    helperText={errors?.[lang]?.text?.message}
                  />
                </Grid>
              </React.Fragment>
            ))}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("Custom Link")}
                {...register("customLink")}
                error={!!errors?.customLink}
                helperText={errors?.customLink?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <input type="file" {...register("image")} />
              {errors?.image && (
                <Typography color="error">{errors.image.message}</Typography>
              )}
            </Grid>
          </Grid>

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
                "&:hover": { borderColor: "origin.main" },
              }}
              onClick={handleCancel}
            >
              {t("Cancel")}
            </Button>

            <ButtonLoader
              name={t("Update")}
              onClick={handleSubmit(handleUpdate)}
              type="submit"
              loading={loading}
              disableOnLoading
            >
              {t("Update")}
            </ButtonLoader>
          </Box>
        </Box>
      </BoxStyled>
    </Box>
  );
};

export default HomeUpdateSlider;
