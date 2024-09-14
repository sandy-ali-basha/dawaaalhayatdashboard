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
        editedID: { editedID, brand_id: params?.id },
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
    defaultValue: data?.translations[index]?.title,
  },{
    head: t("text " + lang.name.toLowerCase()),
    type: "text",
    placeholder: t("text"),
    register: lang.code + ".text",
    defaultValue: data?.translations[index]?.text,
  }));
  
  return (
    <>
      {loading && <Loader />}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>{t("Edit Row")}</DialogTitle>
        {!!data && (
          <>
            <Grid container component="form" key={id}>
              {details?.map((item, index) => {
                const error = errors?.[item.register.split(".")[0]]?.name;
                return (
                  <Grid key={index} item md={6} sx={{ p: "10px" }}>
                    <Box sx={{ margin: "0 0 8px 5px" }}>
                      <Typography variant="body1" color="text.main">
                        {item.head}
                      </Typography>
                    </Box>
                    <TextField
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
