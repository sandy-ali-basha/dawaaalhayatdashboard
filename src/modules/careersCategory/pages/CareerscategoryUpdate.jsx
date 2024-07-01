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
import { _Careerscategory } from "api/careerscategory/careerscategory";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
let schema = yup.object().shape({
  kr: yup.object().shape({
    name: yup.string().required("Kurdish name is required"),
  }),
  ar: yup.object().shape({
    name: yup.string().required("Arabic name is required"),
  }),
  en: yup.object().shape({
    name: yup.string().required("English name is required"),
  }),
});

const CareerscategoryUpdate = ({ id }) => {
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
    _axios
      .get("/careers_categories/" + editedID, {
        header: {
          with_translations: true,
        },
      })
      .then((res) => {
        setData(res.data?.data);
      });
  }, [id, editedID]);

  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Careerscategory
      .update({
        editedID: editedID,
        formData: data,
      })
      .then((res) => {
        console.log(res)
        setLoading(false);
        if (res?.code === 200) handleClose();
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
        <DialogTitle sx={{ color: "primary.main" }}>
          {t("Edit Row")}
        </DialogTitle>
        {!!data && (
          <>
            <Grid container component="form" key={id}>
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography sx={{ margin: "0 0 8px 8px" }} variant="inputTitle">
                  name arabic
                </Typography>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={"text"}
                  placeholder="name"
                  defaultValue=""
                  {...register(`ar.name`)}
                  error={!!errors.ar?.name}
                  helperText={errors.ar?.name?.message || ""}
                />
              </Grid>
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography sx={{ margin: "0 0 8px 8px" }} variant="inputTitle">
                  Name Kurdish
                </Typography>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={"text"}
                  placeholder="name"
                  defaultValue=""
                  {...register(`kr.name`)}
                  error={!!errors.kr?.name}
                  helperText={errors.kr?.name?.message || ""}
                />
              </Grid>
              <Grid item md={12} sx={{ p: "10px" }}>
                <Typography sx={{ margin: "0 0 8px 8px" }} variant="inputTitle">
                  Name English
                </Typography>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={"text"}
                  placeholder="name"
                  defaultValue=""
                  {...register(`en.name`)}
                  error={!!errors.en?.name}
                  helperText={errors.en?.name?.message || ""}
                />
              </Grid>
            </Grid>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "primary.main" }}>
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

export default CareerscategoryUpdate;
