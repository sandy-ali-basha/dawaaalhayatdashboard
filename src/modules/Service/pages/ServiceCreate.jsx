import { Typography, Box, Button, Grid, FormControl, FormHelperText } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { MenuItemStyled, SelectStyled, TextFieldStyled } from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import { useServiceCreate } from "../hooks/useServiceCreate";
import ButtonLoader from "components/shared/ButtonLoader";
import Image from "components/shared/Image";

const ServiceCreate = () => {

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
    control,
    setImage
  } = useServiceCreate()

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Service")}
      </Typography>
      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form">
          <Grid container spacing={2}>
            {/* * //details */}
            {details.map((item, index) => (
              <Grid key={index} xs={6} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="inputTitle">{item.head}</Typography>
                </Box>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.name}
                  {...register(item.register)}
                  error={errors[item.error]?.message}
                  helperText={errors[item.helperText]?.message || ""}
                />
              </Grid>
            ))}
            <Grid xs={6} sx={{ p: "10px" }}>
              <Image errors={errors?.image?.message} control={control} register={register} name={'image'} setImage={setImage} />
            </Grid>
            <Grid xs={6} sx={{ p: "10px" }}>
              <FormControl fullWidth>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="inputTitle">{t('price type')}</Typography>
                </Box>
                <SelectStyled
                  sx={{ color: 'text.main', borderColor: "text.main" }}
                  label="price_type"
                  {...register('price_type')}
                  error={errors.price_type?.message}
                  helperText={errors.price_type?.message || ""}
                >
                  <MenuItemStyled value={'hourly'}><Box style={{ color: 'text.main' }}>{t('hourly')}</Box></MenuItemStyled>
                  <MenuItemStyled value={'daily'}><Box style={{ color: 'text.main' }}>{('daily')}</Box></MenuItemStyled>
                </SelectStyled>
                <FormHelperText error>{errors.price_type?.message}</FormHelperText>
              </FormControl>
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

export default ServiceCreate;
