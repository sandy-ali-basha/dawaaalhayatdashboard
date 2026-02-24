import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { _Product_attributes } from "api/product_attributes/product_attributes";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import Image from "components/shared/Image";
const schema = yup.object().shape({
  image: yup.mixed().nullable(),
  kr: yup.object().shape({
    title: yup.string().required("Kurdish title is required"),
  }),
  ar: yup.object().shape({
    title: yup.string().required("Arabic title is required"),
  }),
  en: yup.object().shape({
    title: yup.string().required("English title is required"),
  }),
});

const Product_attributesUpdate = ({ id }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, control } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [image, setImage] = useState([]);

  useEffect(() => {
    _axios
      .get("/product_attributes/" + editedID + "?all=true", {
        headers: {
          translations: "true",
        },
      })
      .then((res) => {
        // setData(res.data?.product_attributes);
        setData(res.data?.data);
        if (res?.code === 200) setOpen(false);
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
    defaultValue: data?.translations[index]?.title,
  }));
  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Product_attributes
      .update({
        editedID: editedID,
        formData: data,
      })
      .then((res) => {
        setLoading(false);
        if (res.code === 200) handleClose();
        queryClient.invalidateQueries(["product_attributes"]);
      });
  }

  const hanldeUpdate = (input) => {
    const formData = new FormData();
    formData.append("ar[title]", input?.ar?.title || "");
    formData.append("en[title]", input?.en?.title || "");
    formData.append("kr[title]", input?.kr?.title || "");
    formData.append("status", input?.status ?? data?.status ?? 0);
    if (image?.[0]) formData.append("image", image[0]);

    mutate(formData);
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
              <Grid item md={12} sx={{ p: "10px" }}>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={data?.status === 1}
                  render={({ field }) => (
                    <FormControlLabel
                      label="status"
                      control={
                        <Switch
                          checked={field.value}
                          onChange={(e) =>
                            field.onChange(e.target.checked ? 1 : 0)
                          }
                        />
                      }
                    />
                  )}
                />
              </Grid>
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

              <Grid item xs={12} sx={{ p: "10px" }}>
                <Image
                  errors={errors?.image?.message}
                  control={control}
                  register={register}
                  name={"image"}
                  setImage={setImage}
                  image={data?.image_url}
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

export default Product_attributesUpdate;
