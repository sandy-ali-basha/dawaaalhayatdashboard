import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography } from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import { _axios } from "interceptor/http-config";
import { TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { _Home } from "api/home/home";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import Image from "components/shared/Image";
import EditorInput from "components/shared/EditorInput";

const HomeUpdate = ({ id, type,setHome_section_id }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = {};
  const { register, handleSubmit, formState, control, setValue } =
    useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [image, setImage] = useState(null);

  useEffect(() => {
    _axios.get("/home_page/item/" + editedID).then((res) => {
      setData(res.data?.data);
    });
  }, [id, editedID]);

  const details = [
    {
      head: t("link"),
      type: "text",
      placeholder: t("Link"),
      register: "cta_link",
      defaultValue: data?.cta_link,
    },
    {
      head: t("title English"),
      type: "text",
      placeholder: t("title_en"),
      register: "title_en",
      defaultValue: data?.title_en,
    },
    {
      head: t("title arabic"),
      type: "text",
      placeholder: t("title arabic"),
      register: "title_ar",
      defaultValue: data?.title_ar,
    },
    {
      head: t("title Kurdish"),
      type: "text",
      placeholder: "title Kurdish",
      register: "title_kr",
      defaultValue: data?.title_kr,
    },
  ];

  const Desc = [
    {
      head: t("description English"),
      type: "text",
      placeholder: t("description English"),
      register: "description_en",
      defaultValue: data?.description_en,
    },
    {
      head: t("description arabic"),
      type: "text",
      placeholder: t("description arabic"),
      register: "description_ar",
      defaultValue: data?.description_ar,
    },
    {
      head: t("description kurdish"),
      type: "text",
      placeholder: t("description Kurdish"),
      register: "description_kr",
      defaultValue: data?.description_kr,
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data));
  const queryClient = useQueryClient();

  async function createPost(data) {
    _Home
      .updateItem({
        editedID: editedID,
        formData: data,
      })
      .catch((err) => {
        setLoading(false);
      })
      .then(() => {
        setLoading(false);
        handleClose();
        queryClient.invalidateQueries(["home"]);
        queryClient.invalidateQueries(["getHomeSection"]);
      });
  }
const hanldeUpdate = (input) => {
    const formData = new FormData();
    formData.append("type", type);

    if (image && image.length > 0) {
        formData.append("image", image[0]);
    }

    formData.append("cta_link", input.cta_link);
    formData.append("title_en", input.title_en);
    formData.append("description_en", input.description_en);
    formData.append("title_ar", input.title_ar);
    formData.append("description_ar", input.description_ar);
    formData.append("title_kr", input.title_kr);
    formData.append("description_kr", input.description_kr);
    formData.append("home_section_id", setHome_section_id);

    mutate(formData);
    setLoading(true);
};


  return (
    <>
      {loading && <Loader />}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>{t("Edit Row")}</DialogTitle>
        {!!data && (
          <>
            <Grid container component="form" key={id}>
              {details?.map((item, index) => {
                const error = errors?.[item.register.split(".")[0]]?.name;
                return (
                  <Grid
                    key={index}
                    item
                    md={6}
                    xs="12"
                    sx={{ p: "10px", my: 1 }}
                  >
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
                  </Grid>
                );
              })}
              {Desc?.map((item, index) => {
                const error = errors?.[item.register.split(".")[0]]?.name;
                return (
                  <Grid key={index} item md={12} sx={{ p: "10px", my: 1 }}>
                    <Box sx={{ margin: "0 0 8px 5px" }}>
                      <Typography variant="body1" color="text.main">
                        {item.head}
                      </Typography>
                    </Box>

                    <EditorInput
                      control={control}
                      register={register}
                      name={item.register}
                      setValue={setValue}
                      errors={error?.message}
                      initialValue={item.defaultValue}
                    />
                  </Grid>
                );
              })}
              <Grid
                item
                md={12}
                sx={{
                  p: "10px",
                  my: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: { md: "20vw", xs: "70vw" } }}>
                  <img src={data?.image} alt="item" style={{ width: "100%" }} />
                </Box>
                <Typography variant="body1" color="initial" sx={{ mt: 2 }}>
                  replace current Media
                </Typography>
                <Image
                  errors={errors?.image?.message}
                  control={control}
                  register={register}
                  name={"Media"}
                  setImage={(file) => setImage(file)}
                  multiple={false}
                />
              </Grid>
            </Grid>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "text.main" }}>
            {t("Cancel")}
          </Button>
          {loading && <Loader />}
          <ButtonLoader
            name={t("Submit")}
            onClick={handleSubmit(hanldeUpdate)}
            type="save"
            loading={loading}
            disableOnLoading
            disabled={loading} // Ensure button is disabled when loading
          >
            {t("Submit")}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HomeUpdate;
