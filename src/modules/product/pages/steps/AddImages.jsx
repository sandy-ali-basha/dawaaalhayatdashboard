import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Card, CardActions, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { _Product } from "api/product/product";
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

const AddImages = ({ id, open, setOpen, notDialog }) => {
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
  const [alert, setALert] = useState([]);

  const handleClose = () => {
   if(setOpen) setOpen(false);
  };

  const { mutate } = useMutation((data) => createPost(data));
  const handleAddImages = async ({ data }) => {
     setLoading(true);
        try {
          const res = await _Product.AddImages({
            editedID: id,
            formData: data,
          });
          if (res.code === 200) {
            setALert(["image saved successfully"]);
          }
        } catch (error) {
          setALert(["image to save image"]);
        } finally {
          setLoading(false);
        }
    setLoading(true);
    try {
      const res = await _Product.AddImages({
        editedID: id,
        formData: data,
      });
      if (res.code === 200) {
        setALert(["Image saved successfully"]);
        handleDialogClose();
      }else setALert(["Failed to save image"]);
    } finally {
      setLoading(false);
    }
  };

  async function createPost(data) {
    if (notDialog) {
      handleAddImages({ data });
    } else {
      _Product
        .AddImages({
          editedID: id,
          formData: data,
        })
        .then((res) => {
          if (res.code === 200) {
            handleDialogClose();
          }
          setLoading(false);
        });
    }
  }

  const handleUpdate = (input) => {
    const formData = new FormData();
    images.forEach((image, idx) =>
      formData.append("images[" + idx + "]", image)
    );
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
      {notDialog ? (
        <Card
          sx={{
            BoxShadow: 10,
            p: 3,
            opacity: id ? "100%" : "50%",
            pointerEvents: id ? "initial" : "none",
          }}
        >
          <Typography sx={{ color: "text.main" }}>{t("Add Images")}</Typography>

          <Image
            key={id}
            errors={errors?.images?.message}
            control={control}
            register={register}
            name={"images"}
            setImage={setImages}
            multiple
          />

          <CardActions>
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
          </CardActions>
          {alert.length > 0 &&
            alert.map((item, idx) => (
              <Alert sx={{ mt: 1 }} key={idx} severity="info">
                {item}
              </Alert>
            ))}
        </Card>
      ) : (
        <Dialog fullWidth open={open} onClose={handleDialogClose}>
          <DialogTitle sx={{ color: "text.main" }}>
            {t("Add Images")}
          </DialogTitle>
          <>
            <Image
              errors={errors?.images?.message}
              control={control}
              register={register}
              name={"images"}
              setImage={setImages}
              multiple
            />
          </>
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
      )}
    </>
  );
};

export default AddImages;
