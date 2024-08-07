import { React } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { TextFieldStyled } from "components/styled/TextField";
import ButtonLoader from "components/shared/ButtonLoader";
import Loader from "components/shared/Loader";
import { useBlogsUpdate } from "../hooks/useBlogsUpdate";

const BlogsUpdate = ({ id }) => {
  const {
    register,
    handleSubmit,
    loading,
    t,
    errors,
    details,
    handleSubmit1,
    handleClose,
    isLoading,
    open,
    data,
    handleimage,
    handleImages,
    NewImage,
    Newimage,
    control,
  } = useBlogsUpdate();
  return (
    <>
      {isLoading && <Loader />}
      {loading && <Loader />}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "origin.main" }}>{t("Edit Row")}</DialogTitle>
        {!!data && (
          <Box component="form" key={id}>
            {details?.map((item, index) => (
              <Box key={index}>
                <DialogContent
                  sx={{ display: "flex", gap: 1, flexDirection: "column" }}
                >
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography sx={{ color: "origin.main" }}>
                      {item.head}
                    </Typography>
                  </Box>
                  <TextFieldStyled
                    sx={{ width: "100%", my: "5px" }}
                    type={item.type}
                    placeholder={item.placeholder}
                    defaultValue={item.defaultValue}
                    name={item.name}
                    {...register(item.register)}
                    error={errors[item.error]?.message}
                    helperText={errors[item.helperText]?.message || ""}
                  />
                </DialogContent>
              </Box>
            ))}

            <DialogContent
              sx={{ display: "flex", gap: 1, flexDirection: "column" }}
            >
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" color="text.secondary">{t("Cover")}</Typography>
              </Box>
              <TextFieldStyled
                sx={{ width: "100%" }}
                id="icon-button-file"
                type="file"
                name="image"
                accept="image/jpeg, image/jpg, image/png, image/gif"
                onChange={handleimage}
              />
              <Box sx={{ width: "150px" }}>
                {Newimage ? (
                  <img style={{ width: "100%" }} src={Newimage} alt=" " />
                ) : (
                  <img style={{ width: "100%" }} src={data?.cover} alt=" " />
                )}
              </Box>
            </DialogContent>
            <DialogContent>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" color="text.secondary">{t("Images")}</Typography>
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
              {data?.gallery?.map((item, index) => (
                <Box key={index}>
                  <img style={{ width: "100%" }} src={item?.url} alt=" " />
                </Box>
              ))}

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
            </DialogContent>
          </Box>
        )}

        <DialogActions sx={{ display: "flex", gap: "10px" }}>
          <Button onClick={handleClose} sx={{ color: "origin.main" }}>
            {t("Cancel")}
          </Button>

          <ButtonLoader
            onClick={() => handleSubmit(handleSubmit1)()}
            type="submit"
            loading={loading}
            style={{ color: "#fff" }}
          >
            {t("Submit")}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BlogsUpdate;
