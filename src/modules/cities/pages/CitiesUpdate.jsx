import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { _cities } from "api/cities/cities";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import { useCurrencies } from "hooks/currencies/useCurrencies";

const schema = yup.object().shape({
  name: yup.string().required("name is required"),
  inv_name: yup.string().required("inventory name is required"),
  shipping_price: yup.string().required("shipping price is required"),
  currency_id: yup.string().required("currency is required"),
});

const CitiesUpdate = ({ setOldData, oldData, open, setOpen }) => {
  const { t } = useTranslation("index");

  const formOptions = {
    resolver: yupResolver(schema),
    defaultValues: {
      name: oldData?.name || "",
      inv_name: oldData?.inv_name || "",
      shipping_price: oldData?.shipping_price || "",
      currency_id: oldData?.currency_id || "",
    },
  };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  useEffect(() => {
    if (oldData) {
      reset({
        name: oldData?.name || "",
        inv_name: oldData?.inv_name || "",
        shipping_price: oldData?.shipping_price || "",
        currency_id: oldData?.currency_id || "",
      });
    }
  }, [oldData, reset]);

  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const { data: currencies } = useCurrencies();

  const handleClose = () => {
    setOpen(false);
    setOldData(null);
  };

  const { mutate } = useMutation((data) => createPost(data));

  const queryClient = useQueryClient();

  async function createPost(data) {
    _cities
      .update({
        formData: {
          data: [
            {
              id: oldData?.id,
              name: data?.name,
              inv_name: data?.inv_name,
              shipping_price: data?.shipping_price,
              currency_id: data?.currency_id,
            },
          ],
        },
      })
      .catch((err) => {
        setLoading(false);
      })
      .then((res) => {
        setLoading(false);
        if (res?.code === 200) {
          handleClose();
        }
        queryClient.invalidateQueries(["cities"]);
      });
  }

  const hanldeUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };

  return (
    <>
      {loading && <Loader />}
      <Dialog open={open} onClose={handleClose} close>
        <DialogTitle sx={{ color: "text.main" }}>{t("Edit Row")}</DialogTitle>
        <>
          <Grid container component="form">
            <Grid item md={6} sx={{ p: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" color="text.main">
                  Name
                </Typography>
              </Box>
              <TextFieldStyled
                sx={{ width: "100%" }}
                type={"text"}
                placeholder={"name"}
                defaultValue={oldData?.name}
                name={"name"}
                {...register("name")}
                error={!!errors?.name}
                helperText={errors?.name?.message || ""}
              />
            </Grid>

            <Grid item md={6} sx={{ p: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" color="text.main">
                  inventory Name
                </Typography>
              </Box>
              <TextFieldStyled
                sx={{ width: "100%" }}
                type={"text"}
                placeholder={"inv_name"}
                defaultValue={oldData?.inv_name}
                name={"inv_name"}
                {...register("inv_name")}
                error={!!errors?.inv_name}
                helperText={errors?.inv_name?.message || ""}
              />
            </Grid>
            <Grid item md={6} sx={{ p: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" color="text.main">
                  shipping price
                </Typography>
              </Box>
              <TextFieldStyled
                sx={{ width: "100%" }}
                type={"number"}
                placeholder={"shipping price"}
                defaultValue={oldData?.shipping_price}
                name={"shipping_price"}
                {...register("shipping_price")}
                error={!!errors?.shipping_price}
                helperText={errors?.shipping_price?.message || ""}
              />
            </Grid>
            <Grid item md={6} sx={{ p: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" color="text.main">
                  Currency
                </Typography>
              </Box>

              <TextFieldStyled
                select
                sx={{ width: "100%" }}
                defaultValue={oldData?.currency_id || ""}
                name="currency_id"
                {...register("currency_id")}
                error={!!errors?.currency_id}
                helperText={errors?.currency_id?.message || ""}
              >
                {currencies?.data?.map((cur) => (
                  <MenuItem key={cur.id} value={cur.id}>
                    {cur.name} ({cur.code})
                  </MenuItem>
                ))}
              </TextFieldStyled>
            </Grid>
          </Grid>
        </>

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

export default CitiesUpdate;
