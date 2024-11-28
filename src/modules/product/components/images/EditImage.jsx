import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import Image from "components/shared/Image";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg",
  "image/gif",
];
const MAX_FILE_SIZE = 1000000;

const EditImage = ({ open, setOpen, link, status }) => {
  const { t } = useTranslation("index");
  const schema = yup.object().shape({
    images: yup
      .mixed()
      .test("File", t("image") + " " + t("is required"), (value) => {
        return value && Array.isArray(value) && value.length > 0;
      })
      .test("fileSize", t("The file is too large"), (value) => {
        return (
          value &&
          Array.isArray(value) &&
          value.every((file) => file.size <= MAX_FILE_SIZE)
        );
      })
      .test("fileFormat", t("Unsupported Format"), (value) => {
        return (
          value &&
          Array.isArray(value) &&
          value.every((file) => SUPPORTED_FORMATS.includes(file.type))
        );
      }),
  });

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, control } = useForm(formOptions);
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _axios
      .post(link, data)
      .then((res) => res?.data)
      .then((res) => {
        if (res.code === 200) {
          handleDialogClose();
        }
        setLoading(false);
      });
  }
  const queryClient = useQueryClient();
  const handleUpdate = (input) => {
    const formData = new FormData();
    if (status === "add") {
      images.forEach((image, idx) =>
        formData.append("images[" + idx + "]", image)
      );
    } else formData.append("image", images[0]);
    mutate(formData);
    setLoading(true);
    
  };

  const handleDialogClose = (event, reason) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    handleClose();
    queryClient.invalidateQueries(["product"]);
    queryClient.invalidateQueries(["product-features"]);
    queryClient.invalidateQueries(["product-slider"]);
  };

  return (
    <>
      {loading && <Loader />}
      <Dialog fullWidth maxWidth={"lg"} open={open} onClose={handleDialogClose}>
        <DialogTitle sx={{ color: "text.main" }}>
          {status === "add" ? "Add New Images" : "Update Current image"}
        </DialogTitle>

        <Grid container component="form" sx={{ m: 1 }}>
          <Image
            errors={errors?.images?.message}
            control={control}
            register={register}
            name={"images"}
            setImage={setImages}
            multiple={status === "add" ? true : false}
          />
        </Grid>

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "text.main" }}>
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

export default EditImage;
