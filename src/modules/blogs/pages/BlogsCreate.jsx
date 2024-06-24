import { Typography, Box, Grid, useTheme } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import React from "react";
import Loader from "components/shared/Loader";
import ButtonAction from "components/shared/ButtonAction";
import ButtonCancle from "components/shared/ButtonCancle";
import ButtonReset from "components/shared/ButtonReset";
import { Controller } from "react-hook-form";
import { useBlogsCreate } from "../hooks/useBlogsCreate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogsCreate = () => {
  const {
    t,
    watch,
    errors,
    details,
    modules,
    loading,
    control,
    register,
    NewImage,
    formats,
    Coverimage,
    contentEnRef,
    contentArRef,
    hanldeCreate,
    handleSubmit,
    handleImages,
  } = useBlogsCreate();

  const theme = useTheme();

  return (
    <Box>
      {loading && <Loader />}

      <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
        {t("Create Blog")}
      </Typography>
      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form">
          <Grid container spacing={2}>
            {details.map((item, index) => (
              <Grid key={index} item xs={6} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="inputTitle">{item.head}</Typography>
                </Box>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={item.type}
                  placeholder={item.placeholder}
                  defaultValue={item.defaultValue}
                  name={item.name}
                  {...register(item.register)}
                  error={errors[item.error]?.message}
                  helperText={errors[item.helperText]?.message || ""}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              pb: "10px",
              display: "flex",
              rowGap: "25px",
              mt: "20px",
              flexDirection: "column",
            }}
          >
            <Box sx={{ flex: "0.5" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="inputTitle">
                  {t("Content Arabic")}
                </Typography>
              </Box>
              <ReactQuill
                style={{
                  "&::placeholder": {
                    color: "textColor.50",
                    opacity: "0.4",
                  },
                  color: theme?.palette?.text?.main,
                }}
                name="content_ar"
                modules={modules}
                ref={contentArRef}
                formats={formats}
                theme="snow"
              />
              {errors.content_ar && (
                <p
                  style={{
                    color: "rgb(255, 72, 66)",
                    fontWeight: 400,
                    fontSize: "12px",
                  }}
                >
                  {errors.content_ar.message}
                </p>
              )}
            </Box>
            <Box sx={{ flex: "0.5" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="inputTitle">
                  {t("Content English")}
                </Typography>
              </Box>
              <ReactQuill
                style={{
                  "&::placeholder": {
                    color: "textColor.50",
                    opacity: "0.4",
                  },
                  color: theme?.palette?.text?.main,
                }}
                name="content_en"
                formats={formats}
                modules={modules}
                ref={contentEnRef}
                theme="snow"
              />
              {errors.content_en && (
                <p
                  style={{
                    color: "rgb(255, 72, 66)",
                    fontWeight: 400,
                    fontSize: "12px",
                  }}
                >
                  {errors.content_en.message}
                </p>
              )}
            </Box>
          </Box>
          <Grid sx={{ mt: "10px" }} container spacing={2}>
            <Grid item xs={6} sx={{ p: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="inputTitle">{t("Images")}</Typography>
              </Box>

              <Controller
                control={control}
                name={"images"}
                {...register("images")}
                render={({ field }) => (
                  <TextFieldStyled
                    inputProps={{
                      multiple: true,
                    }}
                    sx={{ width: "100%" }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleImages(e);
                      field.onChange(e.target.files);
                    }}
                    multiple
                  />
                )}
              />

              <Typography
                sx={{
                  color: "rgb(255, 72, 66)",
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                {errors.images?.message}
              </Typography>
              <Box sx={{ width: "100%", mt: "10px" }}>
                {NewImage.length > 0
                  ? NewImage?.map((Item, index) => (
                    <img
                      key={index}
                      style={{ width: "20%", margin: "5px" }}
                      src={Item}
                      alt={`Preview ${index + 1}`}
                    />
                  ))
                  : null}
              </Box>
            </Grid>

            <Grid item xs={6} sx={{ p: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="inputTitle">{t("Cover")}</Typography>
              </Box>

              {!watch("files") ||
                watch("files") ||
                watch("files")?.length === 0 ? (
                <Box>
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    type="file"
                    id="fileuploaded"
                    {...register("files")}
                    error={errors?.files?.message}
                    helperText={errors?.files?.message || ""}
                  />
                </Box>
              ) : (
                <strong>{watch("files")[0]?.name}</strong>
              )}
              {errors.files && errors.files.type === "required" && (
                <Box className="error">File is required</Box>
              )}

              <Box sx={{ mt: "10px" }}>
                {Coverimage ? (
                  <img src={Coverimage} width="100%" height={450} alt="" />
                ) : (
                  "null"
                )}
              </Box>
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
          <ButtonCancle />
          <ButtonReset />
          <ButtonAction
            name={t("Submit")}
            onClick={() => handleSubmit(hanldeCreate)()}
            type="submit"
          />
        </Box>
      </BoxStyled>
    </Box>
  );
};

export default BlogsCreate;
