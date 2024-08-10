import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextFieldStyled } from "components/styled/TextField";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormHelperText, Grid, Typography } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { useTheme } from "@emotion/react";
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
      ar: {
        title: "",
        text: "",
      },
      kr: {
        title: "",
        text: "",
      },
      en: {
        title: "",
        text: "",
      },
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
        ar: {
          title: "",
          text: "",
        },
        kr: {
          title: "",
          text: "",
        },
        en: {
          title: "",
          text: "",
        },
        image: [],
      },
    ]);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "kr", name: "Kurdish" },
    { code: "en", name: "English" },
  ];

  const handleInputChange = (event, index, lang, field) => {
    const newInputs = [...inputs];
    newInputs[index][lang][field] = event.target.value;
    setInputs(newInputs);
  };
  return (
    <>
      <Typography variant="h5" sx={{ color: "text.primary", m: 1 }}>
        {t("Slides")}
      </Typography>
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
                        value={input[lang.code]?.title || ""}
                        onChange={(event) =>
                          handleInputChange(event, index, lang.code, "title")
                        }
                        error={!!errors?.slides?.[index]?.[lang.code]?.title}
                        helperText={
                          errors?.slides?.[index]?.[lang.code]?.title?.message
                        }
                        {...field}
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
                        value={input[lang.code]?.text || ""}
                        onChange={(event) =>
                          handleInputChange(event, index, lang.code, "text")
                        }
                        error={!!errors?.slides?.[index]?.[lang.code]?.text}
                        helperText={
                          errors?.slides?.[index]?.[lang.code]?.text?.message
                        }
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </React.Fragment>
            ))}

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
        <span>{t("Add Slide")} </span>
      </Button>
    </>
  );
}
