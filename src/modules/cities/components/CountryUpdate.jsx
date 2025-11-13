import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { _Regions } from "api/regions/regions";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import { Edit } from "@mui/icons-material";

const schema = yup.object().shape({
  name: yup.string().required("Kurdish name is required"),
});

const CountryUpdate = ({ id }) => {
  const { t } = useTranslation("index");
  const [editedID] = colorStore((state) => [state.editedID]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    //regions is countries
    _axios.get("/regions/" + editedID?.id).then((res) => {
      setData(res.data?.data);
    });
  }, [id, editedID]);

  const details = [
    {
      head: t("name"),
      type: "text",
      placeholder: t("name"),
      register: ".name",
      defaultValue: data?.name,
    },
  ];
  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation((data) => createPost(data));
  const queryClient = useQueryClient();

  async function createPost(data) {
    _Regions
      .update({
        editedID: editedID.id,
        formData: data,
      })
      .catch((err) => {
        setLoading(false);
      })
      .then(() => {
        setLoading(false);
        queryClient.invalidateQueries(["regions"]);
        handleClose();
      });
  }

  const hanldeUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };

  return (
    <>
      {loading && <Loader />}
      <Tooltip title="update country name">
        <IconButton onClick={() => setOpen(true)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>
          {t("Update Name")}
        </DialogTitle>
        {!!data && (
          <>
            {details?.map((item, index) => {
              const error = errors?.[item.register.split(".")[0]]?.name;
              return (
                <>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography variant="body1" color="text.main">
                      {item.head}
                    </Typography>
                  </Box>
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    type={item.type}
                    placeholder={item.placeholder}
                    defaultValue={item.defaultValue}
                    name={item.register}
                    {...register(item.register)}
                    error={!!error}
                    helperText={error?.message || ""}
                  />
                </>
              );
            })}
          </>
        )}

        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color: "text.main" }}>
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

export default CountryUpdate;
