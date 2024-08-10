
import { Edit, Upload } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Image = ({ control, name, errors }) => {
  const { t } = useTranslation("index");
  const [newImages, setNewImages] = useState([]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    const fileReaders = [];
    const images = [];
    files.forEach((file, index) => {
      fileReaders[index] = new FileReader();
      fileReaders[index].onload = (e) => {
        images[index] = e.target.result;
        if (images.length === files.length) {
          setNewImages(images);
        }
      };
      fileReaders[index].readAsDataURL(file);
    });
  };

  return (
    <>
      <Button
        component="label"
        sx={{
          border: `1px dashed`,
          borderColor: errors ? "error.main" : "text.main",
          width: "100%",
        }}
      >
        {newImages.length > 0 ? (
          <>
            <Edit sx={{ mx: "5px" }} fontSize="medium" />
            <span>{t("Change Images")}</span>
          </>
        ) : (
          <>
            <Upload sx={{ mx: "5px" }} fontSize="medium" />
            <p>{t("Upload Images")}</p>
          </>
        )}
        <Controller
          control={control}
          name={name}
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
              style={{ display: "none" }}
            />
          )}
        />
      </Button>
      <Typography sx={{ color: "error.main" }}>{errors}</Typography>
      <Box sx={{ width: "300px" }}>
        {newImages.length > 0 &&
          newImages.map((image, index) => (
            <img
              key={index}
              style={{ width: "100%", margin: "1rem", borderRadius: "5px" }}
              src={image}
              alt={`uploaded ${index}`}
            />
          ))}
      </Box>
    </>
  );
};

export default Image;
