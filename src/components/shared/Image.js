import { Edit, Upload } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import slider from "assets/images/slider.png";

const Image = ({
  errors,
  control,
  register,
  name,
  setImage,
  image,
  multiple,
}) => {
  const { t } = useTranslation("index");
  const [NewImages, setNewImages] = useState([]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setImage(files);

    const fileReaders = [];
    const newImages = [];
    files.forEach((file, index) => {
      fileReaders[index] = new FileReader();
      fileReaders[index].onload = (e) => {
        newImages[index] = e.target.result;
        if (newImages.length === files.length) {
          setNewImages(newImages);
        }
      };
      fileReaders[index].readAsDataURL(file);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width:'100%'
      }}
    >
      {" "}
      <Box sx={{ width: "150px" }}>
        <img src={slider} alt="" style={{ width: "100%" }} />
      </Box>
      <Box sx={{ mx: "auto", width: "60%", textAlign: "center" }}>
        <Button
          component="label"
          sx={{
            border: `1px dashed`,
            px: 5,
            borderColor: `${errors ? "error.main" : "text.main"}`,
          }}
          htmlFor={name}
        >
          {NewImages.length > 0 ? (
            <>
              <Edit sx={{ mx: "5px" }} fontSize="medium" />
              {"  "}
              <span>
                {t("Change")}
                {name}
              </span>
            </>
          ) : (
            <>
              <Upload sx={{ mx: "5px" }} fontSize="medium" />
              {"  "}
              <p>
                {t("Upload")}
                {name}
              </p>
            </>
          )}
          <Controller
            control={control}
            name={name}
            {...register(name)}
            render={({ field }) => (
              <input
                id={name}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImage(e);
                  const files = Array.from(e.target.files);
                  field.onChange(files); // Ensure the value is an array
                }}
                multiple={multiple}
                style={{ display: "none" }}
              />
            )}
          />
        </Button>
        <Typography sx={{ color: "error.main" }}>{errors}</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          p: 2,
        }}
      >
        {NewImages.length > 0
          ? NewImages.map((image, index) => (
              <img
                key={index}
                style={{ width: "25%", borderRadius: "5px" }}
                src={image}
                alt={`uploaded ${index}`}
              />
            ))
          : null}
      </Box>
    </Box>
  );
};

export default Image;
