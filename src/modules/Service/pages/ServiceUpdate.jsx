
import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormControl, FormHelperText, Grid, Typography } from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { MenuItemStyled, SelectStyled, TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { _Service } from "api/service/service";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import Image from "components/shared/Image";
import { useParams } from "react-router-dom";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
]
const MAX_FILE_SIZE = 1000000;

const ServiceUpdate = ({ id }) => {
  const { t } = useTranslation("index");
  let schema = yup.object().shape({
    name_en: yup.string().trim().required("name_en is required"),
    name_de: yup.string().trim().required("name_de is required"),
    price_type: yup.string().trim().required("price_type is required"),
    image: yup
      .mixed()
      .test("fileSize", t("The file is too large"), (value) => {
        return value ? value[0]?.size <= MAX_FILE_SIZE : "null";
      })
      .test("fileFormat", t("The file is too large"), (value) => {
        return value ? SUPPORTED_FORMATS.includes(value[0]?.type) : "null";
      })
  })

  const [data, setData] = useState();
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  useEffect(() => {
    _axios.get('/admin/service/' + editedID).then((res) => {
      setData(res.data?.services);
    });
  }, [id, editedID]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, control } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();

  const details = [
    { head: t("name_en"), type: "text", placeholder: t("name_en"), name: "name_en", register: "name_en", error: "name_en", helperText: "name_en", defaultValue: data?.trasnaltions[0]?.name, },
    { head: t("name_de"), type: "text", placeholder: t("name_de"), name: "name_de", register: "name_de", error: "name_de", helperText: "name_de", defaultValue: data?.trasnaltions[1]?.name, },
  ]

  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data))

  async function createPost(data) {
    _Service.update({
      editedID: editedID,
      formData: data,
    }).catch(err => {
      setLoading(false)
      console.log(err)
    }).then((res) => {
      setLoading(false)
      if (res?.success === true) handleClose()
    })
  }

  const params = useParams()

  const hanldeUpdate = (input) => {
    const formData = new FormData()
    formData.append("name_en", input.name_en);
    formData.append("name_de", input.name_de);
    formData.append("price_type", input.price_type);
    image && formData.append("image", image);
    formData.append("_method", 'put');
    formData.append('service_id', params.id)
    mutate(formData);

    setLoading(true);
  }

  return (
    <>
      {loading && <Loader />}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "primary.main" }}>{t("Edit Row")}</DialogTitle>
        {!!data && (
          <>
            <Grid container component="form" key={id}>
              {details?.map((item, index) => (
                <Grid key={index} item md={6} sx={{ p: "10px" }}>
                  <Typography sx={{ margin: "0 0 8px 8px" }} variant="inputTitle">{item.head}</Typography>
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    type={item.type}
                    placeholder={item.placeholder}
                    defaultValue={item.defaultValue}
                    name={item.name}
                    {...register(item.register)}
                    error={errors[item.error]?.message}
                    helperText={errors[item.helperText]?.message || ""}
                  />
                </Grid>
              ))}
              <Grid xs={12} sx={{ p: "10px" }}>
                <FormControl fullWidth>
                  <Typography sx={{ margin: "0 0 8px 8px" }} variant="inputTitle">{t("price_type")}</Typography>
                  <SelectStyled
                    {...register('price_type')}
                    error={errors.price_type?.message}
                    helperText={errors.price_type?.message || ""}
                    defaultValue={data?.price_type}
                  >
                    <MenuItemStyled value={'hourly'}><Box sx={{ color: 'text.main' }}>{('hourly')}</Box></MenuItemStyled>
                    <MenuItemStyled value={'daily'}><Box sx={{ color: 'text.main' }}>{('daily')}</Box></MenuItemStyled>
                  </SelectStyled>
                  <FormHelperText error>{errors.price_type?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12} sx={{ p: "10px" }}>
                <Image errors={errors?.image?.message} control={control} register={register} name={'image'} setImage={setImage} image={data?.image} />
              </Grid>
            </Grid>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "primary.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}

          <ButtonLoader name={t("Submit")}
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

export default ServiceUpdate;

