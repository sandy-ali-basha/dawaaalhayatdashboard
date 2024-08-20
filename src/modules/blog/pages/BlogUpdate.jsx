import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { _Blog } from "api/blog/blog";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import EditorInput from "components/shared/EditorInput";

const schema = yup.object().shape({
  kr: yup.object().shape({
    title: yup.string().required("Kurdish title is required"),
    text: yup.string().required("Kurdish text is required"),
  }),
  ar: yup.object().shape({
    title: yup.string().required("Arabic title is required"),
    text: yup.string().required("Arabic text is required"),
  }),
  en: yup.object().shape({
    title: yup.string().required("English title is required"),
    text: yup.string().required("English text is required"),
  }),
});

const BlogUpdate = ({ id }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, control, setValue } =
    useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    _axios
      .get("/blog/" + editedID, {
        headers: {
          translations: "yes",
        },
      })
      .then((res) => {
        // setData(res.data?.blog);
        setData(res.data?.data);
        const fetchedData = res.data?.data;
        setData(fetchedData);
        if (fetchedData.translations) {
          setValue(
            "kr.title",
            fetchedData?.translations?.find((t) => t.locale === "kr")?.title ||
              ""
          );
          setValue(
            "ar.title",
            fetchedData?.translations?.find((t) => t.locale === "ar")?.title ||
              ""
          );
          setValue(
            "en.title",
            fetchedData?.translations?.find((t) => t.locale === "en")?.title ||
              ""
          );
          setValue(
            "kr.text",
            fetchedData?.translations?.find((t) => t.locale === "kr")?.text ||
              ""
          );
          setValue(
            "ar.text",
            fetchedData?.translations?.find((t) => t.locale === "ar")?.text ||
              ""
          );
          setValue(
            "en.text",
            fetchedData?.translations?.find((t) => t.locale === "en")?.text ||
              ""
          );
        }
      });
  }, [id, editedID]);
  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "kr", name: "Kurdish" },
    { code: "en", name: "English" },
  ];
  const details = languages.map((lang, index) => ({
    head: t("title " + lang.name.toLowerCase()),
    type: "text",
    placeholder: t("title"),
    register: lang.code + ".title",
  }));
  const text = languages.map((lang, index) => ({
    head: t("text " + lang.name.toLowerCase()),
    placeholder: t("text"),
    register: lang.code + ".text",
    lang: lang.code,
  }));
  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Blog
      .update({
        editedID: editedID,
        formData: data,
      })
      .then((res) => {
        if (res.code === 200) {
          handleClose();
        }
        setLoading(false);
      });
  }

  const hanldeUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };

  return (
    <>
      {loading && <Loader />}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>{t("Edit Row")}</DialogTitle>
        {!!data && (
          <>
            <Grid container component="form" key={id}>
              {details?.map((item, index) => {
                const error = errors?.[item.register.split(".")[0]]?.title;
                return (
                  <Grid key={index} item md={6} sx={{ p: "10px" }}>
                    <Box sx={{ margin: "0 0 8px 5px" }}>
                      <Typography variant="body1" color="text.main">
                        {item.head}
                      </Typography>
                    </Box>
                    <TextFieldStyled
                      sx={{ width: "100%" }}
                      type={item.type}
                      placeholder={item.placeholder}
                      defaultValue={item.defaultValue}
                      name={item.register}
                      {...register(item.register)}
                      error={!!error}
                      helperText={error?.message || ""}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
        {!!data &&
          text.map((item, index) => {
            const error = errors?.[item.register.split(".")[0]]?.text;

            return (
              <Grid item key={index} xs={12} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="body1" color="text.main">
                    {item.head}
                  </Typography>
                </Box>

                <EditorInput
                  control={control}
                  register={register}
                  name={item.register}
                  setValue={setValue}
                  errors={error?.message}
                  initialValue={
                    data.translations?.find((t) => t.locale === "en")?.text
                  }
                />
              </Grid>
            );
          })}
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

export default BlogUpdate;
