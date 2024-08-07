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
import { _Productdetails } from "api/productdetails/productdetails";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import EditorInput from "components/shared/EditorInput";
import { useParams } from "react-router-dom";
const schema = yup.object().shape({
  kr: yup.object().shape({
    title: yup.string().required("Kurdish title is required"),
    description: yup.string().required("Kurdish description is required"),
  }),
  ar: yup.object().shape({
    title: yup.string().required("Arabic title is required"),
    description: yup.string().required("Arabic description is required"),
  }),
  en: yup.object().shape({
    title: yup.string().required("English title is required"),
    description: yup.string().required("English description is required"),
  }),
});

const ProductdetailsUpdate = ({ id }) => {
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
    _axios.get("/accordion/" + editedID).then((res) => {
      setData(res.data?.data);
      const fetchedData = res.data?.data;
      setData(fetchedData);
      if (fetchedData) {
        setValue(
          "kr.title",
          fetchedData?.translations.find((t) => t.locale === "kr")?.title || ""
        );
        setValue(
          "ar.title",
          fetchedData?.translations.find((t) => t.locale === "ar")?.title || ""
        );
        setValue(
          "en.title",
          fetchedData?.translations.find((t) => t.locale === "en")?.title || ""
        );

        setValue(
          "kr.description",
          fetchedData?.translations.find((t) => t.locale === "kr")
            ?.description || ""
        );
        setValue(
          "ar.description",
          fetchedData?.translations.find((t) => t.locale === "ar")
            ?.description || ""
        );
        setValue(
          "en.description",
          fetchedData?.translations.find((t) => t.locale === "en")
            ?.description || ""
        );
      }
    });
  }, [id, editedID]);
  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "kr", name: "Kurdish" },
    { code: "en", name: "English" },
  ];
  const Discription = [
    {
      head: t("arabic description"),
      type: "text",
      placeholder: t("ar.description"),
      name: "ar.description",
      register: "ar.description",
      error: "ar.description",
      helperText: "ar.description",
      defaultValue: data?.translations.find((t) => t.locale === "ar")
        ?.description,
    },
    {
      head: t("kurdish description"),
      type: "text",
      placeholder: t("kr.description"),
      name: "kr.description",
      register: "kr.description",
      error: "kr.description",
      helperText: "kr.description",
      defaultValue: data?.translations.find((t) => t.locale === "kr")
        ?.description,
    },
    {
      head: t("english description"),
      type: "text",
      placeholder: t("en.description"),
      name: "en.description",
      register: "en.description",
      error: "en.description",
      helperText: "en.description",
      defaultValue: data?.translations.find((t) => t.locale === "en")
        ?.description,
    },
  ];
  const details = languages.map((lang, index) => ({
    head: t("title " + lang.name.toLowerCase()),
    type: "text",
    placeholder: t("title"),
    register: lang.code + ".title",
    defaultValue: data?.translations.find((t) => t.locale == lang?.code)?.title,
  }));
  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Productdetails
      .update({
        editedID: editedID,
        formData: data,
      })
      .catch((err) => {
        setLoading(false);
      })
      .then(() => {
        setLoading(false);
        // handleClose()
      });
  }
  console.log(errors);
  const params = useParams();
  const hanldeUpdate = (input) => {
    const InputWithProductId = { ...input, product_id: params?.id };
    mutate(InputWithProductId);
    setLoading(true);
  };

  return (
    <>
      {loading && <Loader />}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>
          {t("Edit Row")}
        </DialogTitle>
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
              {Discription.map((item, index) => (
                <Grid item key={index} xs={12} sx={{ p: "10px" }}>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography color="text.main" variant="body1" color="text.secondary">
                      {item.head}
                    </Typography>
                  </Box>
                  <EditorInput
                    control={control}
                    register={register}
                    name={item.name}
                    setValue={setValue}
                    errors={errors[item.helperText]?.message || ""}
                    initialValue={item?.defaultValue}
                  />
                </Grid>
              ))}
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

export default ProductdetailsUpdate;
