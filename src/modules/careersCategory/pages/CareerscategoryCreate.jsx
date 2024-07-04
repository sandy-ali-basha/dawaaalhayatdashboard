import { Typography, Box, Button, Grid } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import { useCareerscategoryCreate } from "../hooks/useCareerscategoryCreate";
import ButtonLoader from "components/shared/ButtonLoader";
const CareerscategoryCreate = () => {
  const {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    handleReset,
    loading,
    t,
    errors,
   
  } = useCareerscategoryCreate()

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Careerscategory}")}
      </Typography>
      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form">
          <Grid  container spacing={2}>
            {/* * //details */}
            <Grid item md={12} sx={{ p: "10px" }}>
                <Typography sx={{ margin: "0 0 8px 8px" }} variant="inputTitle">
                  name arabic
                </Typography>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={"text"}
                  placeholder="name"
                  defaultValue=""
                  {...register(`ar.name`)}
                  error={!!errors.ar?.name}
                  helperText={errors.ar?.name?.message || ""}
                />
              </Grid>
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography sx={{ margin: "0 0 8px 8px" }} variant="inputTitle">
                  Name Kurdish
                </Typography>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={"text"}
                  placeholder="name"
                  defaultValue=""
                  {...register(`kr.name`)}
                  error={!!errors.kr?.name}
                  helperText={errors.kr?.name?.message || ""}
                />
              </Grid>
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography sx={{ margin: "0 0 8px 8px" }} variant="inputTitle">
                  Name English
                </Typography>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={"text"}
                  placeholder="name"
                  defaultValue=""
                  {...register(`en.name`)}
                  error={!!errors.en?.name}
                  helperText={errors.en?.name?.message || ""}
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
              color: "primary.main",
              "&:hover": {
                borderColor: "origin.main",
              },
            }}
            onClick={handleCancel}
          >
            {t("Cancel")}
          </Button>
          <ButtonAction
            name={t("Reset")}
            onClick={handleReset}
            type="reset"
          />
          <ButtonLoader name={t("Submit")}
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

export default CareerscategoryCreate;