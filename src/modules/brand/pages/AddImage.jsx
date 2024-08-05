import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import Image from "components/shared/Image";
import { _Brand } from "api/brand/brand";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 10000000000;

const AddImage = ({ id, open, setOpen }) => {
  const { t } = useTranslation("index");
  let schema = yup.object().shape({
    image: yup
      .mixed()
      .test("File", t("image") + " " + t("is required"), (value) => {
        return value;
      })
      .test("fileSize", t("The file is too large"), (value) => {
        return value && value[0]?.size <= MAX_FILE_SIZE;
      })
      .test("fileFormat", t("Unsupported Format"), (value) => {
        return value && SUPPORTED_FORMATS.includes(value[0]?.type);
      }),
  });

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, control, setValue } =
    useForm(formOptions);
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Brand
      .update({
        editedID: id,
        formData: data,
      })
      .catch((err) => {
        setLoading(false);
      })
      .then(() => {
        setLoading(false);
      });
  }

  const handleUpdate = (input) => {
    const formData = new FormData();
    if (image) {
      formData.append("image[]", image);
    }
    mutate(formData);
    setLoading(true);
  };

  const handleDialogClose = (event, reason) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    handleClose();
  };

  return (
    <>
      {loading && <Loader />}
      <Dialog fullWidth maxWidth={"xl"} open={open} onClose={handleDialogClose}>
        <DialogTitle sx={{ color: "primary.main" }}>
          {t("Add Image")}
        </DialogTitle>
        <>
          <Grid container component="form" key={id} sx={{ m: 1 }}>
            <Image
              errors={errors?.image?.message}
              control={control}
              register={register}
              name={"image"}
              setImage={(file) => setImage(file)}
              multiple={false}
            />
          </Grid>
        </>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "primary.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}
          <ButtonLoader
            name={t("Submit")}
            onClick={() => handleSubmit(handleUpdate)()}
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

export default AddImage;
