
import { React, useState } from "react";
// ** mui 
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import { TextFieldStyled } from "components/styled/TextField";

// ** hooks
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** API
import { _Profile } from "api/profile/profile";

// ** Custom Components
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";

// ** Third Part Libraries
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import * as yup from "yup";

let schema = yup.object().shape({
  password: yup.string().trim().required("password is required"),
  password_confirmation: yup.string().trim()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required("password confirmation is required"),
});

const ChangePassword = ({ open, setOpen }) => {
  const { t } = useTranslation("index");

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [loading, setLoading] = useState(false);

  const details = [
    { head: t("password"), type: "password", name: "password", register: "password", error: "password", helperText: "password" },
    { head: t("password confirmation"), type: "password", name: "password_confirmation", register: "password_confirmation", error: "password_confirmation", helperText: "password_confirmation" },
  ]

  const handleClose = () => setOpen(!open)
  const { mutate } = useMutation((data) => createPost(data))


  async function createPost(data) {
    setLoading(true)
    _Profile.changePassword({
      formData: data,
    }).catch(err => {
      setLoading(false)
    }).then(res => {
      if (res.message === "Success") {
        setOpen(false)
      }
      setLoading(false)
    })
  }

  const hanldeUpdate = (input) => {
    const formData = new FormData()
    formData.append("password", input.password);
    formData.append("password_confirmation", input.password_confirmation);

    mutate(formData);
    setLoading(true);
  }

  return (
    <>
      {loading && <Loader />}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "primary.main" }}>{t("Edit Row")}</DialogTitle>

        <Grid container component="form">
          {details?.map((item, index) => (
            <Grid key={index} item md={6} sx={{ p: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="inputTitle" >{item.head}</Typography>
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

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "primary.main" }}>
            {t("Cancel")}
          </Button>

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

export default ChangePassword;

