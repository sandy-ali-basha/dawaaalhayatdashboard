import { Typography, Box, Button, Grid } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import { useBlogCreate } from "../hooks/useBlogCreate";
import ButtonLoader from "components/shared/ButtonLoader";
import EditorInput from "components/shared/EditorInput";
const BlogCreate = () => {
  const {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    handleReset,
    loading,
    t,
    errors,
    control,
    setValue,
    details,
    text,
  } = useBlogCreate();

  return (
    <Box>
      {loading && <Loader />}
      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Blog")}
      </Typography>
      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form">
          <Grid container spacing={2}>
            {/* * //details */}
            {details.map((item, index) => {
              const error = errors?.[item.register.split(".")[0]]?.title;
             
              return (
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
                    name={item.register}
                    {...register(item.register)}
                    error={!!error}
                    helperText={error?.message || ""}
                  />
                </Grid>
              );
            })}
            {text.map((item, index) => {
              const error = errors?.[item.register.split(".")[0]]?.text;
              console.log(error);
              return (
                <Grid item key={index} xs={12} sx={{ p: "10px" }}>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography variant="body1" color="text.main">
                      {item.head}
                    </Typography>
                  </Box>

                  <EditorInput
                    control={control}
                    register={register}
                    name={item.register}
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

export default BlogCreate;
