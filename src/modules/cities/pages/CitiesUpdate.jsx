import { React, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
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
const schema = yup.object().shape({
  name: yup.string().required("name is required"),
  inventory: yup.string().required("inventory is required"),
  shipping_price: yup.string().required("shipping price is required"),
  currency_name: yup.string().required("currency name is required"),
  currency_code: yup.string().required("currency code is required"),
});

const CitiesUpdate = ({ old_data, setEditCity }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data));
  const queryClient = useQueryClient();
  async function createPost(data) {
    _cities
      .update({
        formData: {
          data: [
            {
              id: old_data?.id,
              name: data?.name,
              value: data?.inventory,
              shipping_price: data?.shipping_price,
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
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>{t("Edit Row")}</DialogTitle>

        <>
          <Grid container component="form">
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
                defaultValue={old_data?.shipping_price}
                name={"shipping_price"}
                {...register("shipping_price")}
                error={!!errors?.shipping_price}
                helperText={errors?.message?.shipping_price || ""}
              />
            </Grid>
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
                defaultValue={old_data?.name}
                name={"name"}
                {...register("name")}
                error={!!errors?.name}
                helperText={errors?.message?.name || ""}
              />
            </Grid>
            <Grid item md={6} sx={{ p: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" color="text.main">
                  Inventory Name
                </Typography>
              </Box>
              <TextFieldStyled
                sx={{ width: "100%" }}
                type={"text"}
                placeholder={"inventory"}
                defaultValue={old_data?.value}
                name={"inventory"}
                {...register("inventory")}
                error={!!errors?.inventory}
                helperText={errors?.message?.inventory || ""}
              />
            </Grid>
            <Grid item md={6} sx={{ p: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" color="text.main">
                  currency name
                </Typography>
              </Box>
              <TextFieldStyled
                sx={{ width: "100%" }}
                type={"text"}
                placeholder={"currency name"}
                defaultValue={old_data?.currency_name}
                name={"currency_name"}
                {...register("currency_name")}
                error={!!errors?.currency_name}
                helperText={errors?.message?.currency_name || ""}
              />
            </Grid>
            <Grid item md={6} sx={{ p: "10px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="body1" color="text.main">
                  currency code
                </Typography>
              </Box>
              <TextFieldStyled
                sx={{ width: "100%" }}
                type={"text"}
                placeholder={"currency code"}
                defaultValue={old_data?.currency_code}
                name={"currency_code"}
                {...register("currency_code")}
                error={!!errors?.currency_code}
                helperText={errors?.message?.currency_code || ""}
              />
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
