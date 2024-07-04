
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
import { _Products } from "api/products/products";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
let schema = yup.object().shape({
  first_name: yup.string().trim().required("first name Arabic is required"),
})

const ProductsUpdate = ({ id }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    _axios.get('/products/'+ editedID).then((res) => {
      setData(res.data?.products);
    });
  }, [id,editedID]);

  const details = [
    { head: t("first name"), type: "text", placeholder: t("first_name"), name: "first_name", register: "first_name", error: "first_name", helperText: "first_name", defaultValue: data?.first_name, },
  ]

  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data))

  async function createPost(data) {
    _Products.update({
      editedID: editedID,
      formData: data,
    }).catch(err => {
      setLoading(false)
    }).then(() => {
      setLoading(false)
      // handleClose()
    })
  }

  const hanldeUpdate = (input) => {
    const formData = new FormData()
    formData.append("first_name", input.first_name);
    formData.append("_method", 'put');

    mutate(formData);
    setLoading(true);
  }

  return (
    <>
      {loading && <Loader />}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={{ color: "primary.main" }}>{t("Edit Row")}</DialogTitle>
        {!!data && (
          <>
            <Grid container component="form" key={id}>
              {details?.map((item, index) => (
                <Grid key={index} item md={6} sx={{ p: "10px" }}>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography variant="inputTitle">{item.head}</Typography>
                  </Box>
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

export default ProductsUpdate;

