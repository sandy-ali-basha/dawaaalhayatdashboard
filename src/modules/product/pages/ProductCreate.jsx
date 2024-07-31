import {
  Typography,
  Box,
  Button,
  Grid,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import {
  MenuItemStyled,
  SelectStyled,
  TextFieldStyled,
} from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import { useProductCreate } from "../hooks/useProductCreate";
import ButtonLoader from "components/shared/ButtonLoader";
import EditorInput from "components/shared/EditorInput";
const ProductCreate = () => {
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
    brands,
    producttypes,
    statuses,
    Discription,
    control,
setValue
  } = useProductCreate();

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Product}")}
      </Typography>
      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form">
          <Grid container spacing={2}>
            {brands && (
              <Grid item xs={6} sx={{ p: "10px" }}>
                <FormControl fullWidth>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography color="text.main">{t("brand")}</Typography>
                  </Box>
                  <SelectStyled
                    sx={{ color: "text.main", borderColor: "text.main" }}
                    {...register("brand_id")}
                  >
                    {brands?.map((item) => (
                      <MenuItemStyled value={item.id} key={item.id}>
                        <Box style={{ color: "text.main" }}>{item.name}</Box>
                      </MenuItemStyled>
                    ))}
                  </SelectStyled>
                  <FormHelperText error>
                    {errors.brand_id?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
            )}
            {producttypes && (
              <Grid item xs={6} sx={{ p: "10px" }}>
                <FormControl fullWidth>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography color="text.main">{t("product type")}</Typography>
                  </Box>
                  <SelectStyled
                    sx={{ color: "text.main", borderColor: "text.main" }}
                    {...register("product_type_id")}
                  >
                    {producttypes?.map((item) => (
                      <MenuItemStyled value={item.id} key={item.id}>
                        <Box style={{ color: "text.main" }}>{item.name}</Box>
                      </MenuItemStyled>
                    ))}
                  </SelectStyled>
                  <FormHelperText error>
                    {errors.product_type_id?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
            )}

            {/* * //details */}
            {details.map((item, index) => (
              <Grid item key={index} xs={6} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography color="text.main" variant="inputTitle">{item.head}</Typography>
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
            {Discription.map((item, index) => (
              <Grid item key={index} xs={12} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography color="text.main" variant="inputTitle">{item.head}</Typography>
                </Box>
                <EditorInput
                  control={control}
                  register={register}
                  name={item.name}
                  setValue={setValue}
                  errors={errors[item.helperText]?.message || ""}
                />
              </Grid>
            ))}
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

export default ProductCreate;
