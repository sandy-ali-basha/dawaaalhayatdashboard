import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";

import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { _Aboutus } from "api/aboutus/aboutus";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import EditorInput from "components/shared/EditorInput";
import Image from "components/shared/Image";

/* ================= SCHEMA ================= */
const schema = yup.object({
  ar: yup.object({
    title: yup.string(),
    description: yup.string(),
  }),
  en: yup.object({
    title: yup.string(),
    description: yup.string(),
  }),
  kr: yup.object({
    title: yup.string(),
    description: yup.string(),
  }),
});

const AboutusUpdate = () => {
  const { t } = useTranslation("index");

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ar: { title: "", description: "" },
      en: { title: "", description: "" },
      kr: { title: "", description: "" },
    },
  });

  /* ================= FETCH & FILL ================= */
  useEffect(() => {
    if (!editedID) return;

    _axios.get("/about/" + editedID).then((res) => {
      const rows = res.data?.data || [];
      setCurrentImage(rows[0]?.image_url);

      reset({
        ar: {
          title: rows[0]?.title || "",
          description: rows[0]?.description || "",
        },
        en: {
          title: rows[1]?.title || "",
          description: rows[1]?.description || "",
        },
        kr: {
          title: rows[2]?.title || "",
          description: rows[2]?.description || "",
        },
      });
    });
  }, [editedID, reset]);

  /* ================= UPDATE ================= */
  const { mutate } = useMutation(
    (formData) => _Aboutus.update({editedID, formData}),
    {
      onSuccess: () => {
        setLoading(false);
        setEditedID(null);
      },
      onError: () => setLoading(false),
    }
  );

  const handleUpdate = (data) => {
    const formData = new FormData();

    // Arabic
    formData.append("ar[title]", data.ar.title);
    formData.append("ar[description]", data.ar.description);

    // English
    formData.append("en[title]", data.en.title);
    formData.append("en[description]", data.en.description);

    // Kurdish
    formData.append("kr[title]", data.kr.title);
    formData.append("kr[description]", data.kr.description);

    // Image (only if changed)
    if (image) {
      formData.append("image", image);
    }

    setLoading(true);
    mutate(formData);
  };

  const handleClose = () => {
    setEditedID(null);
  };

  return (
    <>
      {loading && <Loader />}

      <Dialog open={true} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{t("Edit About Us")}</DialogTitle>
        <DialogContent
          dividers
          sx={{
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          <Grid container component="form" sx={{ p: 2 }}>
            {/* AR */}
            <Grid item xs={12} mb={1}>
              <Typography variant="body2">Title - Arabic</Typography>
              <TextFieldStyled
                fullWidth
                {...register("ar.title")}
                error={!!errors?.ar?.title}
                helperText={errors?.ar?.title?.message}
              />
            </Grid>

            <Grid item xs={12} mb={2}>
              <Typography variant="body2">Description - Arabic</Typography>

              <EditorInput
                control={control}
                register={register}
                name={"ar.description"}
                setValue={setValue}
                errors={errors?.ar?.description?.message}
              />
            </Grid>

            {/* EN */}
            <Grid item xs={12} mb={1}>
              <Typography variant="body2">Title - English</Typography>
              <TextFieldStyled
                fullWidth
                {...register("en.title")}
                error={!!errors?.en?.title}
                helperText={errors?.en?.title?.message}
              />
            </Grid>

            <Grid item xs={12} mb={2}>
              <Typography variant="body2">Description - English</Typography>

              <EditorInput
                control={control}
                register={register}
                name={"en.description"}
                setValue={setValue}
                errors={errors?.en?.description?.message}
              />
            </Grid>

            {/* KR */}
            <Grid item xs={12} mb={1}>
              <Typography variant="body2">Title - Kurdish</Typography>
              <TextFieldStyled
                fullWidth
                {...register("kr.title")}
                error={!!errors?.kr?.title}
                helperText={errors?.kr?.title?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2">Description - Kurdish</Typography>

              <EditorInput
                control={control}
                register={register}
                name={"kr.description"}
                setValue={setValue}
                errors={errors?.kr?.description?.message}
              />
            </Grid>
            <Grid
              item
              md={12}
              sx={{
                p: "10px",
                my: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: { md: "20vw", xs: "70vw" } }}>
                <img src={currentImage} alt="item" style={{ width: "100%" }} />
              </Box>
              <Typography variant="body1" color="initial" sx={{ mt: 2 }}>
                replace current Media
              </Typography>
              <Image
                errors={errors?.image?.message}
                control={control}
                register={register}
                name={"Media"}
                setImage={(file) => setImage(file)}
                multiple={false}
              />
            </Grid>
          </Grid>
        </DialogContent>{" "}
        <DialogActions>
          <Button onClick={handleClose}>{t("Cancel")}</Button>

          <ButtonLoader
            name={t("Submit")}
            onClick={handleSubmit(handleUpdate)}
            loading={loading}
            disableOnLoading
          >
            {t("Submit")}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AboutusUpdate;
