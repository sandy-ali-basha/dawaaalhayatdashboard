import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextFieldStyled } from "components/styled/TextField";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormHelperText, Grid, Typography } from "@mui/material";
import { CloseRounded, PlusOneRounded } from "@mui/icons-material";
import Image from "./Image";

export default function InputRepeater({
  control,
  errors,
  register,
  setSlides,
  watch,
}) {
  const [inputs, setInputs] = useState([
    {
      ar: { title: "", text: "" },
      kr: { title: "", text: "" },
      en: { title: "", text: "" },
      CustomLink: "", // New link field
      image: [], // Assuming this will hold an array of images
    },
  ]);

  useEffect(() => {
    setSlides("slides", inputs ?? null);
  }, [inputs, setSlides]);

  const { t } = useTranslation("index");

  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        ar: { title: "", text: "" },
        kr: { title: "", text: "" },
        en: { title: "", text: "" },
        CustomLink: "", // New link field
        image: [],
      },
    ]);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleInputChange = (event, index, lang, field) => {
    const newInputs = [...inputs];
    newInputs[index][lang][field] = event.target.value;
    setInputs(newInputs);
  };

  const handleLinkChange = (event, index) => {
    const newInputs = [...inputs];
    newInputs[index].CustomLink = event.target.value;
    setInputs(newInputs);
  };

  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "kr", name: "Kurdish" },
    { code: "en", name: "English" },
  ];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ color: "text.primary", m: 1 }}>
          {t("Slides")}
        </Typography>
        <Button
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: 4,
          }}
          onClick={handleAddInput}
        >
          <PlusOneRounded />
          <span>{t("Add Slide")}</span>
        </Button>
      </Box>
      {inputs?.map((input, index) => (
        <Box
          sx={{
            p: 2,
            m: 1,
          }}
          key={index}
        >
          <Grid container spacing={2}>
            {inputs.length > 1 && (
              <Grid item xs={12} sx={{ p: 2, mt: 1 }}>
                <Button onClick={() => handleRemoveInput(index)}>
                  <CloseRounded />
                </Button>
              </Grid>
            )}

            {languages.map((lang, x) => (
              <React.Fragment key={x}>
                <Grid item xs={6} sx={{ p: 2, mt: 2 }}>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="body1" sx={{ color: "text.primary" }}>
                      {t("Title")} ({lang.name})
                    </Typography>
                  </Box>
                  <Controller
                    control={control}
                    name={`slides[${index}][${lang.code}][title]`}
                    render={({ field }) => (
                      <TextFieldStyled
                        sx={{ width: "100%" }}
                        type="text"
                        placeholder={t("title")}
                        error={!!errors?.slides?.[index]?.[lang.code]?.title}
                        helperText={
                          errors?.slides?.[index]?.[lang.code]?.title?.message
                        }
                        {...field} // Spread the field to handle value and onChange automatically
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6} sx={{ p: "10px", mt: "10px" }}>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography variant="body1" sx={{ color: "text.primary" }}>
                      {t("Text")} ({lang.name})
                    </Typography>
                  </Box>
                  <Controller
                    control={control}
                    name={`slides[${index}][${lang.code}][text]`}
                    render={({ field }) => (
                      <TextFieldStyled
                        sx={{ width: "100%" }}
                        type="text"
                        placeholder={t("text")}
                        error={!!errors?.slides?.[index]?.[lang.code]?.text}
                        helperText={
                          errors?.slides?.[index]?.[lang.code]?.text?.message
                        }
                        {...field} // Spread the field to handle value and onChange automatically
                      />
                    )}
                  />
                </Grid>
              </React.Fragment>
            ))}

            {/* Add link field */}
            <Grid item xs={12} sx={{ p: "10px", mt: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {t("Link")}
                </Typography>
              </Box>
              <Controller
                control={control}
                name={`slides[${index}][customLink]`}
                render={({ field }) => (
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    type="text"
                    placeholder={t("link")}
                    error={!!errors?.slides?.[index]?.customLink}
                    helperText={errors?.slides?.[index]?.customLink?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            {/* Image upload section */}
            <Grid item xs={12} sx={{ p: "10px", mt: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {t("Image")}
                </Typography>
              </Box>
              <Image
                control={control}
                name={`slides[${index}][image]`}
                errors={errors?.slides?.[index]?.image?.message}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
}
