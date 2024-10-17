import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
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
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import { _Terms } from "api/terms/terms";
import EditorInput from "components/shared/EditorInput";

const TermsUpdate = () => {
  const { t } = useTranslation("index");

  let schema = yup.object().shape({
    kr: yup.object().shape({
      name: yup.string().required("Kurdish name is required"),
      text: yup.string().required("Kurdish name is required"),
    }),
    ar: yup.object().shape({
      name: yup.string().required("Arabic name is required"),
      text: yup.string().required("Arabic Text is required"),
    }),
    en: yup.object().shape({
      name: yup.string().required("English name is required"),
      text: yup.string().required("English Text is required"),
    }),
  });

  const [data, setData] = useState();
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, control, setValue } =
    useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _axios
      .get("/terms/" + editedID, {
        headers: {
          translations: true,
        },
      })
      .then((res) => {
        const fetchedData = res.data?.data;
        setData(fetchedData);
        if (fetchedData) {
          setValue(
            "kr.name",
            fetchedData?.translations.find((t) => t.locale === "kr")?.name || ""
          );
          setValue(
            "kr.text",
            fetchedData?.translations.find((t) => t.locale === "kr")?.text || ""
          );

          setValue(
            "ar.name",
            fetchedData?.translations.find((t) => t.locale === "ar")?.name || ""
          );
          setValue(
            "ar.text",
            fetchedData?.translations.find((t) => t.locale === "ar")?.text || ""
          );
          setValue(
            "en.name",
            fetchedData?.translations.find((t) => t.locale === "en")?.name || ""
          );
          setValue(
            "en.text",
            fetchedData?.translations.find((t) => t.locale === "en")?.text || ""
          );
        }
      });
  }, [editedID, setValue]);

  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Terms
      .update({
        editedID: editedID,
        formData: data,
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
      .then((res) => {
        setLoading(false);
        if (res?.code === 200) handleClose();
      });
  }

  const handleUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };
  return (
    <>
      {loading && <Loader />}
      <Dialog open={open} onClose={handleClose} maxWidth>
        <DialogTitle sx={{ color: "text.main" }}>
          {t("Edit Row")}
        </DialogTitle>
        {!!data && (
          <>
            <Grid container component="form">
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography sx={{ margin: "0 0 8px 8px" }} variant="body1" color="text.secondary">
                  name arabic
                </Typography>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={"text"}
                  placeholder="name"
                  {...register(`ar.name`)}
                  error={!!errors.ar?.name}
                  helperText={errors.ar?.name?.message || ""}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="body1" color="text.secondary" sx={{ color: "text.main" }}>
                    text arabic
                  </Typography>
                </Box>
                <EditorInput
                  control={control}
                  register={register}
                  name={"ar.text"}
                  setValue={setValue}
                  errors={errors?.ar?.text?.message}
                  initialValue={
                    data?.translations.find((t) => t.locale === "ar")?.text ||
                    ""
                  }
                />
              </Grid>
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography sx={{ margin: "0 0 8px 8px" }} variant="body1" color="text.secondary">
                  Name Kurdish
                </Typography>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={"text"}
                  placeholder="name"
                  {...register(`kr.name`)}
                  error={!!errors.kr?.name}
                  helperText={errors.kr?.name?.message || ""}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="body1" color="text.secondary" sx={{ color: "text.main" }}>
                    text kurdish
                  </Typography>
                </Box>
                <EditorInput
                  control={control}
                  register={register}
                  name={"kr.text"}
                  setValue={setValue}
                  errors={errors?.kr?.text?.message}
                  initialValue={
                    data?.translations.find((t) => t.locale === "kr")?.text ||
                    ""
                  }
                />
              </Grid>
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography sx={{ margin: "0 0 8px 8px" }} variant="body1" color="text.secondary">
                  Name English
                </Typography>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={"text"}
                  placeholder="name"
                  {...register(`en.name`)}
                  error={!!errors.en?.name}
                  helperText={errors.en?.name?.message || ""}
                />
              </Grid>
              <Grid item xs={12} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="body1" color="text.secondary" sx={{ color: "text.main" }}>
                    {t("text English")}
                  </Typography>
                </Box>
                <EditorInput
                  control={control}
                  register={register}
                  name={"en.text"}
                  setValue={setValue}
                  errors={!!errors?.en?.text}
                  initialValue={
                    data?.translations.find((t) => t.locale === "en")?.text ||
                    ""
                  }
                />
              </Grid>
            </Grid>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "text.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}

          <ButtonLoader
            name={t("Submit")}
            onClick={() => handleSubmit(handleUpdate)()}
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

export default TermsUpdate;
