import { React, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { _Settings } from "api/settings/settings";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import Gift_Card from "assets/images/Gift_Card.png";
const schema = yup.object().shape({
  value: yup.string().required("value  is required"),
});

const SettingsUpdate = ({ value, open, setOpen }) => {
  const { t } = useTranslation("index");

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation((data) => createPost(data));
  const queryClient = useQueryClient();
  async function createPost(data) {
    _Settings
      .update({
        formData: {
          data: [
            {
              id: 1,
              name: "point_price",
              value: data?.value,
              options: {
                type: "decimal",
              },
            },
          ],
        },
      })
      .catch((err) => {
        setLoading(false);
      })
      .then((res) => {
        if (res?.code === 200) {
          handleClose();
        }
        queryClient.invalidateQueries(["settings"]);
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>
          {t("Enter point price")}
        </DialogTitle>
        <Box sx={{ width: "40%", margin: "auto" }}>
          <img src={Gift_Card} alt="" style={{ width: "100%" }} />
        </Box>
        <TextFieldStyled
          sx={{ width: "90%", mx: "auto" }}
          type={"number"}
          placeholder={"value"}
          defaultValue={"value"}
          name={"value"}
          {...register("value")}
          errors={errors?.value?.message}
          initialValue={value}
        />

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

export default SettingsUpdate;
