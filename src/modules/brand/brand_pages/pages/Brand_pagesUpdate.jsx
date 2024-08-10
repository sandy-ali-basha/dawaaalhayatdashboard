import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { _Brand_pages } from "api/brand_pages/brand_pages";

const Brand_pagesUpdate = ({ id }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const schema = yup.object().shape({
    slides: yup.array().of(
      yup.object().shape({
        en: yup.object().shape({
          title: yup.string().required("English title is required"),
          text: yup.string().required("English text is required"),
        }),
        ar: yup.object().shape({
          title: yup.string().required("Arabic title is required"),
          text: yup.string().required("Arabic text is required"),
        }),
        kr: yup.object().shape({
          title: yup.string().required("Kurdish title is required"),
          text: yup.string().required("Kurdish text is required"),
        }),
      })
    ),
  });

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const params = useParams();

  useEffect(() => {
    _axios.get("/brand_pages/" + params?.id).then((res) => {
      setData(res.data?.data);
    });
  }, [id, editedID]);

  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Brand_pages
      .update({
        editedID: editedID,
        formData: data,
      })
      .catch((err) => {
        setLoading(false);
      })
      .then(() => {
        setLoading(false);
      });
  }

  const hanldeUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };

  const returnDetails = (item, idx) => {
    return item?.translations?.map((item, index) => {
      const locale = item.locale;
      return (
        <Grid key={index} item md={6} sx={{ p: "10px" }}>
          <TextField
            sx={{ width: "100%", color: "text.main" }}
            type={"text"}
            label={`${item?.locale} title`}
            placeholder={`${item?.locale} title`}
            defaultValue={item.title}
            name={`slides[${idx}].${locale}.title`}
            {...register(`slides[${idx}].${locale}.title`)}
            error={!!errors?.slides?.[idx]?.[locale]?.title}
            helperText={errors?.slides?.[idx]?.[locale]?.title?.message || ""}
          />
          <TextField
            sx={{ width: "100%", color: "text.main", mt: 1 }}
            type={"text"}
            label={`${item?.locale} text`}
            placeholder={`${item?.locale} text`}
            defaultValue={item.text}
            name={`slides[${idx}].${locale}.text`}
            {...register(`slides[${idx}].${locale}.text`)}
            error={!!errors?.slides?.[idx]?.[locale]?.text}
            helperText={errors?.slides?.[idx]?.[locale]?.text?.message || ""}
          />
        </Grid>
      );
    });
  };

  return (
    <>
      {loading && <Loader />}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>{t("Edit Row")}</DialogTitle>
        {!!data && (
          <Grid container component="form" key={id} onSubmit={handleSubmit(hanldeUpdate)}>
            {data?.slides?.map((item, idx) => (
              <Grid item key={idx} md="12" mx="1">
                <Typography variant={"body1"} color="text.main">
                  Slide Num: {idx}
                </Typography>
                {returnDetails(item, idx)}
              </Grid>
            ))}
          </Grid>
        )}

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "text.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}
          <ButtonLoader
            name={t("Submit")}
            onClick={() => handleSubmit(hanldeUpdate)()}
            type="save"
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

export default Brand_pagesUpdate;
