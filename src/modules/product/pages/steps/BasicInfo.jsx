import {
  Typography,
  Box,
  Grid,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import {
  MenuItemStyled,
  SelectStyled,
  TextFieldStyled,
} from "components/styled/TextField";
import React, { useEffect } from "react";
import Loader from "components/shared/Loader";
import { useProductCreate } from "../../hooks/useProductCreate";
import EditorInput from "components/shared/EditorInput";
import { DescriptionRounded, InfoOutlined } from "@mui/icons-material";
import DensityCalculator from "../../components/DensityCalculator";

const BasicInfo = ({ setNewProductId, onNext ,setSubmitFunction}) => {
  const {
    register,
    handleSubmit,
    loading,
    t,
    errors,
    details,
    brands,
    producttypes,
    Discription,
    control,
    setValue,
    watch,
  } = useProductCreate({ setNewProductId });

  // When component mounts, send the submit function up to parent
  useEffect(() => {
    if (setSubmitFunction) {
      setSubmitFunction(() => handleSubmit((data) => onNext(data)));
    }
  }, [setSubmitFunction, handleSubmit, onNext]);

  return (
    <>
      {loading && <Loader />}

      <Box component="form">
        <BoxStyled sx={{ p: 2, mt: 2 }}>
          <Grid container spacing={2}>
            {/* * //details */}
            <Grid item xs="12">
              <Typography variant="h6" color="text.main" p="10px">
                <InfoOutlined sx={{ color: "secondary.main" }} /> Main Product
                Info{" "}
              </Typography>
            </Grid>
            {details.map((item, index) => {
              const error = errors?.[item.register.split(".")[0]]?.name;
              return (
                <Grid item key={index} xs={6} sx={{ p: "10px" }}>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography color="text.main" variant="body1">
                      {item.head}
                    </Typography>
                  </Box>
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    type={item.type}
                    name={item.name}
                    {...register(item.register)}
                    error={!!error}
                    helperText={error?.message || ""}
                  />
                </Grid>
              );
            })}
            {/* //brand */}
            <Grid item xs={6} sx={{ p: "10px" }}>
              {brands ? (
                <FormControl fullWidth>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography color="text.main">{t("Brand")}</Typography>
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
              ) : (
                <Typography variant="body2" color="text.main">
                  pleas add Brands before adding new products
                </Typography>
              )}
            </Grid>
            {/* status */}
            <Grid item xs={6} sx={{ p: "10px" }}>
              {" "}
              <FormControl fullWidth>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography color="text.main">{t("status")}</Typography>
                </Box>

                <Select
                  name="status"
                  {...register("status")}
                  error={!!errors?.status}
                  id="status"
                >
                  <MenuItem value="active">active</MenuItem>
                  <MenuItem value="inActive">not active</MenuItem>
                </Select>
                <FormHelperText error>{errors?.status?.message}</FormHelperText>
              </FormControl>
            </Grid>
            {/* medical form (product type) */}
            <Grid item xs={6} sx={{ p: "10px" }}>
              {producttypes?.length > 0 ? (
                <FormControl fullWidth>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography color="text.main">
                      {t("medical form")}
                    </Typography>
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
              ) : (
                <Typography variant="body2" color="text.main">
                  pleas add one medical form at least before adding new products
                </Typography>
              )}
            </Grid>
          </Grid>
        </BoxStyled>
        <BoxStyled
          sx={{ p: 2, mt: 2, border: "2px solid ", borderColor: "info.main" }}
        >
          <Grid container>
            <DensityCalculator
              register={register}
              watch={watch}
              errors={errors}
            />
          </Grid>
        </BoxStyled>
        <BoxStyled sx={{ p: 2, mt: 2 }}>
          <Grid container spacing={2}>
            <Typography
              variant="body1"
              color="text.main"
              sx={{ fontWeight: "bold", p: "10px" }}
            >
              <DescriptionRounded sx={{ color: "primary.main", mx: 1 }} />
              Description
            </Typography>
            {Discription.map((item, index) => {
              const error = errors?.[item.register.split(".")[0]]?.name;
              return (
                <Grid item key={index} xs={12} sx={{ p: "10px" }}>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography color="text.main" variant="body1">
                      {item.head}
                    </Typography>
                  </Box>
                  <EditorInput
                    control={control}
                    register={register}
                    name={item.name}
                    setValue={setValue}
                    errors={error?.message}
                  />
                </Grid>
              );
            })}
          </Grid>
        </BoxStyled>
      </Box>
    </>
  );
};

export default BasicInfo;
