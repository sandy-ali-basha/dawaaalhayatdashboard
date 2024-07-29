import { Typography, Box, Button, Grid } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import { useProduct_attributes_valuesCreate } from "../hooks/useProduct_attributes_valuesCreate";
import ButtonLoader from "components/shared/ButtonLoader";
const Product_attributes_valuesCreate = () => {
  const {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    handleReset,
    loading,
    t,
    errors,
    details,
  } = useProduct_attributes_valuesCreate();

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Product_attributes_values")}
      </Typography>
      <BoxStyled sx={{ px: "24px" }}>
        <Grid container component="form">
          {details?.map((item, index) => {
            const error = errors?.[item.register.split(".")[0]]?.name;

            return (
              <Grid key={index} item md={6} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="body1" color="text.main">
                    {item.head}
                  </Typography>
                </Box>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.register}
                  {...register(item.register)}
                  error={!!error}
                  helperText={error?.message || ""}
                />
              </Grid>
            );
          })}
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
              color: "primary.main",
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

export default Product_attributes_valuesCreate;
