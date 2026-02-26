import React from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import { useHomeCreateItem } from "../hooks/useHomeCreateItem";

const HomeCreateItem = () => {
  const {
    handleCancel,
    handleCreate,
    register,
    handleSubmit,
    loading,
    t,
    errors,
    sectionId,
  } = useHomeCreateItem();

  const isReelSection = sectionId === 4;

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: 2 }} variant="h5">
        {t("Add Item")}
      </Typography>

      <BoxStyled sx={{ px: 3 }}>
        <Box component="form">
          <Grid container spacing={2}>
            {/* Titles */}
            {["ar", "en", "kr"].map((lang) => (
              <React.Fragment key={lang}>
                <Grid item xs={6}>
                  <TextFieldStyled
                    fullWidth
                    label={`${t("Title")} (${lang})`}
                    {...register(`title_${lang}`)}
                    error={!!errors[`title_${lang}`]}
                    helperText={errors[`title_${lang}`]?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldStyled
                    fullWidth
                    label={`${t("Description")} (${lang})`}
                    {...register(`description_${lang}`)}
                    error={!!errors[`description_${lang}`]}
                    helperText={errors[`description_${lang}`]?.message}
                  />
                </Grid>
              </React.Fragment>
            ))}

            {/* CTA Link */}
            <Grid item xs={12}>
              <TextFieldStyled
                fullWidth
                label={t("CTA Link")}
                {...register("cta_link")}
                error={!!errors.cta_link}
                helperText={errors.cta_link?.message}
              />
            </Grid>

            {isReelSection ? (
              ["en", "ar", "kr"].map((lang) => (
                <Grid item xs={12} key={`video-${lang}`}>
                  <TextFieldStyled
                    fullWidth
                    type="file"
                    inputProps={{ accept: "video/*" }}
                    label={`${t("Video")} (${lang})`}
                    {...register(`video_${lang}`)}
                    error={!!errors[`video_${lang}`]}
                    helperText={errors[`video_${lang}`]?.message}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <TextFieldStyled
                  fullWidth
                  type="file"
                  {...register("image")}
                  error={!!errors.image}
                  helperText={errors.image?.message}
                />
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Buttons */}
        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button variant="outlined" onClick={handleCancel}>
            {t("Cancel")}
          </Button>
          <ButtonLoader
            name={t("Submit")}
            onClick={() => handleSubmit(handleCreate)()}
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

export default HomeCreateItem;
