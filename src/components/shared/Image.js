import { Edit, Upload } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
    <>
      <Box sx={{ margin: "0 0 8px 5px" }}>
        <Typography variant="body1" color="text.secondary">{t(name)}</Typography>
      </Box>
      <Button
        component="label"
        sx={{
          border: `1px dashed`,
          borderColor: `${errors ? "error.main" : "text.main"}`,
          width: "100%",
        }}
        htmlFor={name}
      >
        {NewImages.length > 0 ? (
          <>
            <Edit sx={{ mx: "5px" }} fontSize="medium" />
            {"  "}
            <span>{t("Change Images")}</span>
          </>
        ) : (
          <>
            <Upload sx={{ mx: "5px" }} fontSize="medium" />
            {"  "}
            <p>{t("Upload Images")}</p>
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
      <Box sx={{ width: "300px" }}>
        {NewImages.length > 0
          ? NewImages.map((image, index) => (
              <img
                key={index}
                style={{ width: "100%", margin: "1rem", borderRadius: "5px" }}
                src={image}
                alt={`uploaded ${index}`}
              />
            ))
          : null}
      </Box>
    </>
  );
};

export default Image;
