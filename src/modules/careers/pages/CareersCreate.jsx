import {
  Typography,
  Box,
  Button,
  Grid,
  FormHelperText,
  FormControl,
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
import { useCareersCreate } from "../hooks/useCareersCreate";
import ButtonLoader from "components/shared/ButtonLoader";
import EditorInput from "components/shared/EditorInput";
const CareersCreate = () => {
  const {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    handleReset,
    loading,
    t,
    errors,
    detailsAR,
    detailsEN,
    detailsKR,
    careersCategoriesData,
    control,
    setValue,
  } = useCareersCreate();

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Careers")}
      </Typography>
      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form">
          <Grid container sx={{ p: "10px" }}>
            <Grid item md={6} sx={{ p: "10px" }}>
              <FormControl fullWidth>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography sx={{ color: "text.main" }}>
                    {t("category")}
                  </Typography>
                </Box>
                <SelectStyled
                  sx={{ color: "text.main", borderColor: "text.main" }}
                  label="category_id"
                  {...register("category_id")}
                >
                  {careersCategoriesData?.map((item) => (
                    <MenuItemStyled value={item.id} key={item.id}>
                      <Box style={{ color: "text.main" }}>{item.name}</Box>
                    </MenuItemStyled>
                  ))}
                </SelectStyled>
                <FormHelperText error>
                  {errors.category_id?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={6} sx={{ p: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography sx={{ color: "text.main" }}>
                  requisition number
                </Typography>
              </Box>
              <TextFieldStyled
                sx={{ width: "100%" }}
                type={"number"}
                placeholder={"requisition_no"}
                name={"requisition_no"}
                {...register("requisition_no")}
                error={errors?.requisition_no?.message}
                helperText={errors?.requisition_no?.helperText?.message || ""}
              />
            </Grid>
            <Grid item md={6} sx={{ p: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body2" sx={{ color: "text.main" }}>
                  Time
                </Typography>
                <TextFieldStyled
                  type="date"
                  sx={{ width: "100%" }}
                  {...register("time_type")}
                  error={!!errors.time_type}
                  helperText={errors.time_type?.message}
                />
              </Box>
            </Grid>
          </Grid>
          {/* * //details */}

          <Grid item xs={12} sx={{ p: "10px" }}>
            {/* ku */}
            <Typography variant="h6" sx={{ color: "text.main" }}>
              Kurdish
            </Typography>
            <Grid container>
              {detailsKR.map((item, index) => (
                <Grid key={index} item md={6} sx={{ p: "10px" }}>
                  <Typography
                    sx={{ margin: "0 0 8px 8px", color: "text.main" }}
                  >
                    {item.head}
                  </Typography>
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    type={item.type}
                    placeholder={item.placeholder}
                    defaultValue=""
                    {...register(`kr.${item.register}`)}
                    error={!!errors.kr?.[item.error]}
                    helperText={errors.kr?.[item.helperText]?.message || ""}
                  />
                </Grid>
              ))}
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography
                  sx={{ margin: "0 0 8px 8px", color: "text.primary" }}
                  variant="body2"
                >
                  description
                </Typography>
                <EditorInput
                  control={control}
                  register={register}
                  name={"kr.description"}
                  setValue={setValue}
                  errors={errors?.kr?.description?.message}
                />
              </Grid>
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography
                  sx={{ margin: "0 0 8px 8px", color: "text.primary" }}
                  variant="body2"
                >
                  about us
                </Typography>
                <EditorInput
                  control={control}
                  register={register}
                  name={"kr.about_us"}
                  setValue={setValue}
                  errors={errors?.kr?.about_us?.message}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ p: "10px" }}>
            <Typography sx={{ color: "text.main" }} variant="h6">
              Arabic
            </Typography>
            <Grid container>
              {detailsAR.map((item, index) => (
                <Grid key={index} item md={6} sx={{ p: "10px" }}>
                  <Typography
                    sx={{ margin: "0 0 8px 8px", color: "text.main" }}
                  >
                    {item.head}
                  </Typography>
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    type={item.type}
                    placeholder={item.placeholder}
                    defaultValue=""
                    {...register(`ar.${item.register}`)}
                    error={!!errors.ar?.[item.error]}
                    helperText={errors.ar?.[item.helperText]?.message || ""}
                  />
                </Grid>
              ))}
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography
                  sx={{ margin: "0 0 8px 8px", color: "text.main" }}
                  variant="body2"
                >
                  description
                </Typography>
                <EditorInput
                  control={control}
                  register={register}
                  name={"ar.description"}
                  setValue={setValue}
                  errors={errors?.ar?.description?.message}
                />
              </Grid>
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography
                  sx={{ margin: "0 0 8px 8px", color: "text.main" }}
                  variant="body2"
                >
                  about us
                </Typography>
                <EditorInput
                  control={control}
                  register={register}
                  name={"ar.about_us"}
                  setValue={setValue}
                  errors={errors?.ar?.about_us?.message}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ p: "10px" }}>
            <Typography sx={{ color: "text.main" }} variant="h6">
              English
            </Typography>
            <Grid container>
              {detailsEN.map((item, index) => (
                <Grid key={index} item md={6} sx={{ p: "10px" }}>
                  <Typography
                    sx={{ margin: "0 0 8px 8px", color: "text.main" }}
                  >
                    {item.head}
                  </Typography>
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    type={item.type}
                    placeholder={item.placeholder}
                    defaultValue=""
                    {...register(`en.${item.register}`)}
                    error={!!errors.en?.[item.error]}
                    helperText={errors.en?.[item.helperText]?.message || ""}
                  />
                </Grid>
              ))}
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography sx={{ margin: "0 0 8px 8px" , color: "text.main"}} variant="body2">
                  description
                </Typography>
                <EditorInput
                  control={control}
                  register={register}
                  name={"en.description"}
                  setValue={setValue}
                  errors={errors?.en?.description?.message}
                />
              </Grid>
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography
                  sx={{ margin: "0 0 8px 8px", color: "text.main" }}
                  variant="body2"
                >
                  about us
                </Typography>
                <EditorInput
                  control={control}
                  register={register}
                  name={"en.about_us"}
                  setValue={setValue}
                  errors={errors?.en?.about_us?.message}
                />
              </Grid>
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

export default CareersCreate;
