import {
  Typography,
  Box,
  Button,
  Grid,
  FormControl,
  FormHelperText,
  MenuItem,
  ListItemText,
  Checkbox,
  Select,
  Divider,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import {
  MenuItemStyled,
  SelectStyled,
  TextFieldStyled,
} from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import { useProductCreate } from "../hooks/useProductCreate";
import ButtonLoader from "components/shared/ButtonLoader";
import EditorInput from "components/shared/EditorInput";
import ButtonReset from "components/shared/ButtonReset";
const CreateProductDetails = ({ setNewProductId }) => {
  const {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,

    loading,
    t,
    errors,
    details,
    brands,
    producttypes,
    selectedCities,
    setSelectedCities,
    Discription,
    control,
    setValue,
    cities,
    generalDetails,
    regions,
    selectedRegion,
    setSelectedRegions
  } = useProductCreate({ setNewProductId });
  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Product")}
      </Typography>
      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid
              container
              xs={12}
              sx={{ p: "10px", alignItems: "center", justifyContent: "center" }}
            >
              <Grid
                item
                xs={5}
                sx={{
                  opacity: selectedRegion !== null ? 0.5 : 1,
                  pointerEvents: selectedRegion !== null ? "none" : "auto",
                  p: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  color="text.main"
                  sx={{ textAlign: "end" }}
                  p="10px"
                >
                  Select Cities{" "}
                </Typography>
                {cities ? (
                  <FormControl fullWidth>
                    <Box sx={{ margin: "0 0 8px 5px" }}>
                      <Typography color="text.main">{t("cities")}</Typography>
                    </Box>

                    <Select
                      labelId="city-label"
                      id="city"
                      multiple
                      value={selectedCities} // Ensure this is an array
                      onChange={(e) => setSelectedCities(e.target.value)}
                      renderValue={(selected) =>
                        selected
                          .map(
                            (cityId) =>
                              cities?.state?.find((city) => city.id === cityId)
                                ?.name
                          )
                          .join(", ")
                      }
                    >
                      {cities?.state?.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          <Checkbox
                            size="small"
                            checked={selectedCities.indexOf(city.id) > -1}
                          />
                          <ListItemText primary={city.name} />
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error>
                      {errors.city_id?.message}
                    </FormHelperText>
                  </FormControl>
                ) : (
                  <Typography variant="body2" color="text.main"></Typography>
                )}
              </Grid>
              <Divider
                orientation="vertical"
                sx={{ background: "white", color: "text.primary" }}
              >
                OR
              </Divider>
              <Grid
                item
                xs={5}
                sx={{
                  opacity: selectedCities?.length > 0 ? 0.5 : 1,
                  pointerEvents: selectedCities?.length > 0 ? "none" : "auto",
                  p: "10px",
                }}
              >
                <Typography variant="h6" color="text.main" p="10px">
                  choose A Region{" "}
                </Typography>
                {regions ? (
                  <FormControl fullWidth>
                    <Box sx={{ margin: "0 0 8px 5px" }}>
                      <Typography color="text.main">{t("region")}</Typography>
                    </Box>

                    <Select
                      labelId="region-label"
                      id="region"
                      onChange={(e) => setSelectedRegions(e.target.value)}
                    >
                      {regions?.map((region) => (
                        <MenuItem key={region.id} value={region.id}>
                          <ListItemText primary={region.name} />
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error>
                      {errors.city_id?.message}
                    </FormHelperText>
                  </FormControl>
                ) : (
                  <Typography variant="body2" color="text.main"></Typography>
                )}
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ p: "10px" }}>
              {brands ? (
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
              ) : (
                <Typography variant="body2" color="text.main">
                  pleas add Brands before adding new products
                </Typography>
              )}
            </Grid>
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
            {/* * //details */}
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
                    placeholder={item.placeholder}
                    name={item.name}
                    {...register(item.register)}
                    error={!!error}
                    helperText={error?.message || ""}
                  />
                </Grid>
              );
            })}
            {generalDetails.map((item, index) => {
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
                    placeholder={item.placeholder}
                    name={item.name}
                    {...register(item.register)}
                    error={errors[item.error]?.message}
                    helperText={errors[item.helperText]?.message || ""}
                  />
                </Grid>
              );
            })}
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
        
          <ButtonLoader
            name={t("save")}
            onClick={() => handleSubmit(hanldeCreate)()}
            type="submit"
            loading={loading}
            disableOnLoading
          >
            {t("save")}
          </ButtonLoader>
        </Box>
      </BoxStyled>
    </Box>
  );
};

export default CreateProductDetails;
