import {
  Typography,
  Box,
  Button,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import { useDiscountsCreate } from "../hooks/useDiscountsCreate";
import ButtonLoader from "components/shared/ButtonLoader";
import discount from "assets/images/discount.png";
const DiscountsCreate = () => {
  const {
    handleCancel,
    handleCreate,
    register,
    handleSubmit,
    handleReset,
    loading,
    t,
    errors,
    discountType,
    setDiscountType,
    details,
  } = useDiscountsCreate();

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Discounts")}
      </Typography>
      <Box sx={{ display: "flex" }}>
    
        <BoxStyled sx={{ px: "24px" }}>
          <Box component="form" onSubmit={handleSubmit(handleCreate)}>
            {" "}
            {/* Use onSubmit directly */}
            <Grid container spacing={2}>
              {/* Discount Type Selection */}
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography sx={{ color: "text.main" }} component="legend">
                    {t("Discount Type")}
                  </Typography>
                  <RadioGroup
                    row
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                  >
                    <FormControlLabel
                      value="percentage"
                      control={<Radio />}
                      label={t("Percentage")}
                      sx={{ color: "text.main" }}
                    />
                    <FormControlLabel
                      value="value"
                      control={<Radio />}
                      label={t("Value")}
                      sx={{ color: "text.main" }}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Render form fields */}
              {details.map((item, index) => (
                <Grid item key={index} xs={6} sx={{ p: "10px" }}>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography variant="body1" color="text.main">
                      {item.head}
                    </Typography>
                  </Box>
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    type={item.type}
                    placeholder={item.placeholder}
                    {...register(item.register)}
                    error={!!errors[item.register]}
                    helperText={errors[item.register]?.message || ""}
                  />
                </Grid>
              ))}

              {/* Conditionally render percentage or value based on discountType */}
              <Grid item xs={6} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="body1" color="text.main">
                    {discountType === "percentage"
                      ? t("Percentage")
                      : t("Fixed Value")}
                  </Typography>
                </Box>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type="number"
                  placeholder={
                    discountType === "percentage"
                      ? t("Enter percentage")
                      : t("Enter fixed value")
                  }
                  {...register("value")}
                  error={!!errors.value}
                  helperText={errors.value?.message || ""}
                />
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
              <ButtonLoader
                name={t("Submit")}
                type="submit" // Use type="submit" instead of manually calling handleSubmit
                loading={loading}
                disableOnLoading
              >
                {t("Submit")}
              </ButtonLoader>
            </Box>
          </Box>
        </BoxStyled>
        <Box sx={{ width: "50%", margin: "auto" }}>
          <img src={discount} alt="" style={{ width: "100%" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default DiscountsCreate;
