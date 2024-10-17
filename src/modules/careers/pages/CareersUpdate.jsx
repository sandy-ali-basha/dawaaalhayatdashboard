import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import {
  MenuItemStyled,
  SelectStyled,
  TextFieldStyled,
} from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { _Careers } from "api/careers/careers";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import EditorInput from "components/shared/EditorInput";

const schema = yup.object().shape({
  category_id: yup.number().required("Category ID is required"),
  requisition_no: yup.string().required("Requisition number is required"),
  time_type: yup.string().required("Time type is required"),
  kr: yup.object().shape({
    vacancy_name: yup.string().required("Kurdish vacancy name is required"),
    country: yup.string().required("Kurdish country is required"),
    description: yup.string().required("Kurdish description is required"),
    location: yup.string().required("Kurdish location is required"),
    about_us: yup.string().required("Kurdish about us is required"),
  }),
  ar: yup.object().shape({
    vacancy_name: yup.string().required("Arabic vacancy name is required"),
    country: yup.string().required("Arabic country is required"),
    description: yup.string().required("Arabic description is required"),
    location: yup.string().required("Arabic location is required"),
    about_us: yup.string().required("Arabic about us is required"),
  }),
  en: yup.object().shape({
    vacancy_name: yup.string().required("English vacancy name is required"),
    country: yup.string().required("English country is required"),
    description: yup.string().required("English description is required"),
    location: yup.string().required("English location is required"),
    about_us: yup.string().required("English about us is required"),
  }),
});

const CareersUpdate = ({ id }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, control, setValue } =
    useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [careersCategoriesData, setCareersCategoriesData] = useState();

  useEffect(() => {
    _axios
      .get("/careers/" + editedID, {
        headers: {
          translations: true,
        },
      })
      .then((res) => {
        setData(res.data?.data);
        const fetchedData = res.data?.data;
        setData(fetchedData);
        if (fetchedData) {
          setValue(
            "kr.vacancy_name",
            fetchedData?.translations.find((t) => t.locale === "kr")
              ?.vacancy_name || ""
          );
          setValue(
            "ar.vacancy_name",
            fetchedData?.translations.find((t) => t.locale === "ar")
              ?.vacancy_name || ""
          );
          setValue(
            "en.vacancy_name",
            fetchedData?.translations.find((t) => t.locale === "en")
              ?.vacancy_name || ""
          );
          setValue(
            "kr.country",
            fetchedData?.translations.find((t) => t.locale === "kr")?.country ||
              ""
          );
          setValue(
            "ar.country",
            fetchedData?.translations.find((t) => t.locale === "ar")?.country ||
              ""
          );
          setValue(
            "en.country",
            fetchedData?.translations.find((t) => t.locale === "en")?.country ||
              ""
          );
          setValue(
            "kr.description",
            fetchedData?.translations.find((t) => t.locale === "kr")
              ?.description || ""
          );
          setValue(
            "ar.description",
            fetchedData?.translations.find((t) => t.locale === "ar")
              ?.description || ""
          );
          setValue(
            "en.description",
            fetchedData?.translations.find((t) => t.locale === "en")
              ?.description || ""
          );
          setValue(
            "kr.location",
            fetchedData?.translations.find((t) => t.locale === "kr")
              ?.location || ""
          );
          setValue(
            "ar.location",
            fetchedData?.translations.find((t) => t.locale === "ar")
              ?.location || ""
          );
          setValue(
            "en.location",
            fetchedData?.translations.find((t) => t.locale === "en")
              ?.location || ""
          );
          setValue(
            "kr.about_us",
            fetchedData?.translations.find((t) => t.locale === "kr")
              ?.about_us || ""
          );
          setValue(
            "ar.about_us",
            fetchedData?.translations.find((t) => t.locale === "ar")
              ?.about_us || ""
          );
          setValue(
            "en.about_us",
            fetchedData?.translations.find((t) => t.locale === "en")
              ?.about_us || ""
          );
        }
      });
    _axios.get("/careers_categories").then((res) => {
      setCareersCategoriesData(res?.data?.data?.careers_categories);
     
    });
  }, [id, editedID, setValue]);

  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Careers
      .update({
        editedID: editedID,
        formData: data,
      })
      .catch((err) => {
        setLoading(false);
      })
      .then((res) => {
        setLoading(false);
        if (res?.code === 200) handleClose();
      });
  }

  const handleUpdate = (input) => {
    mutate(input);
    setLoading(true);
  };
  const detailsAR = [
    {
      head: t("vacancy_name"),
      type: "text",
      placeholder: t("vacancy_name"),
      name: "vacancy_name",
      register: "vacancy_name",
      error: "vacancy_name",
      helperText: "vacancy_name",
    },
    {
      head: t("country"),
      type: "text",
      placeholder: t("country"),
      name: "country",
      register: "country",
      error: "country",
      helperText: "country",
    },

    {
      head: t("location"),
      type: "text",
      placeholder: t("location"),
      name: "location",
      register: "location",
      error: "location",
      helperText: "location",
    },
  ];
  const detailsEN = [
    {
      head: t("vacancy_name"),
      type: "text",
      placeholder: t("vacancy_name"),
      name: "vacancy_name",
      register: "vacancy_name",
      error: "vacancy_name",
      helperText: "vacancy_name",
    },
    {
      head: t("country"),
      type: "text",
      placeholder: t("country"),
      name: "country",
      register: "country",
      error: "country",
      helperText: "country",
    },

    {
      head: t("location"),
      type: "text",
      placeholder: t("location"),
      name: "location",
      register: "location",
      error: "location",
      helperText: "location",
    },
  ];
  const detailsKR = [
    {
      head: t("vacancy_name"),
      type: "text",
      placeholder: t("vacancy_name"),
      name: "vacancy_name",
      register: "vacancy_name",
      error: "vacancy_name",
      helperText: "vacancy_name",
    },
    {
      head: t("country"),
      type: "text",
      placeholder: t("country"),
      name: "country",
      register: "country",
      error: "country",
      helperText: "country",
    },

    {
      head: t("location"),
      type: "text",
      placeholder: t("location"),
      name: "location",
      register: "location",
      error: "location",
      helperText: "location",
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle sx={{ color: "text.main" }}>
          {t("Edit Row")}
        </DialogTitle>
        {!!data && (
          <>
            <Grid container component="form" key={id}>
              <Grid item xs={12} sx={{ p: "10px" }}>
                <FormControl fullWidth>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography variant="body2">{t("category")}</Typography>
                  </Box>
                  <SelectStyled
                    sx={{ color: "text.main", borderColor: "text.main" }}
                    label="category_id"
                    {...register("category_id")}
                  >
                    {careersCategoriesData?.map((item) => (
                      <MenuItemStyled value={item.id} key={item.id}>
                        <Box style={{ color: "text.main" }}>{item.name}</Box>
                      </MenuItemStyled>
                    ))}
                  </SelectStyled>
                  <FormHelperText error>
                    {errors.category_id?.message}
                  </FormHelperText>
                </FormControl>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="body2">Requisition No:</Typography>
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    defaultValue={data?.requisition_no}
                    {...register("requisition_no")}
                    error={!!errors.requisition_no}
                    helperText={errors.requisition_no?.message}
                    type="number"
                  />
                </Box>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="body2">Time</Typography>
                  <TextFieldStyled
                    type="date"
                    sx={{ width: "100%" }}
                    defaultValue={data?.time_type}
                    {...register("time_type")}
                    error={!!errors.time_type}
                    helperText={errors.time_type?.message}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ p: "10px" }}>
                {/* ku */}
                <Typography variant="h6" sx={{ color: "text.main" }}>
                  Kurdish
                </Typography>
                <Grid container>
                  {detailsKR.map((item, index) => (
                    <Grid key={index} item md={6} sx={{ p: "10px" }}>
                      <Typography
                        sx={{ margin: "0 0 8px 8px" }}
                        variant="body2"
                      >
                        {item.head}
                      </Typography>
                      <TextFieldStyled
                        sx={{ width: "100%" }}
                        type={item.type}
                        placeholder={item.placeholder}
                        defaultValue=""
                        {...register(`kr.${item.register}`)}
                        error={!!errors.kr?.[item.error]}
                        helperText={errors.kr?.[item.helperText]?.message || ""}
                      />
                    </Grid>
                  ))}
                  <Grid item md={12} sx={{ p: "10px" }}>
                    <Typography sx={{ margin: "0 0 8px 8px" }} variant="body2">
                      description
                    </Typography>
                    <EditorInput
                      control={control}
                      register={register}
                      name={"kr.description"}
                      setValue={setValue}
                      errors={errors?.kr?.description?.message}
                      initialValue={"hola"}
                    />
                  </Grid>
                  <Grid item md={12} sx={{ p: "10px" }}>
                    <Typography sx={{ margin: "0 0 8px 8px" }} variant="body2">
                      about us
                    </Typography>
                    <EditorInput
                      control={control}
                      register={register}
                      name={"kr.about_us"}
                      setValue={setValue}
                      errors={errors?.kr?.about_us?.message}
                      initialValue={"about_us"}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ p: "10px" }}>
                <Typography sx={{ color: "text.main" }} variant="h6">
                  Arabic
                </Typography>
                <Grid container>
                  {detailsAR.map((item, index) => (
                    <Grid key={index} item md={6} sx={{ p: "10px" }}>
                      <Typography
                        sx={{ margin: "0 0 8px 8px" }}
                        variant="body2"
                      >
                        {item.head}
                      </Typography>
                      <TextFieldStyled
                        sx={{ width: "100%" }}
                        type={item.type}
                        placeholder={item.placeholder}
                        defaultValue=""
                        {...register(`ar.${item.register}`)}
                        error={!!errors.ar?.[item.error]}
                        helperText={errors.ar?.[item.helperText]?.message || ""}
                      />
                    </Grid>
                  ))}
                  <Grid item md={12} sx={{ p: "10px" }}>
                    <Typography sx={{ margin: "0 0 8px 8px" }} variant="body2">
                      description arabic
                    </Typography>
                    <EditorInput
                      control={control}
                      register={register}
                      name={"ar.description"}
                      setValue={setValue}
                      errors={errors?.ar?.description?.message}
                      initialValue={"hola"}
                    />
                  </Grid>
                  <Grid item md={12} sx={{ p: "10px" }}>
                    <Typography sx={{ margin: "0 0 8px 8px" }} variant="body2">
                      about us
                    </Typography>
                    <EditorInput
                      control={control}
                      register={register}
                      name={"ar.about_us"}
                      setValue={setValue}
                      errors={errors?.ar?.about_us?.message}
                      initialValue={"about_us"}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ p: "10px" }}>
                <Typography sx={{ color: "text.main" }} variant="h6">
                  English
                </Typography>
                <Grid container>
                  {detailsEN.map((item, index) => (
                    <Grid key={index} item md={6} sx={{ p: "10px" }}>
                      <Typography
                        sx={{ margin: "0 0 8px 8px" }}
                        variant="body2"
                      >
                        {item.head}
                      </Typography>
                      <TextFieldStyled
                        sx={{ width: "100%" }}
                        type={item.type}
                        placeholder={item.placeholder}
                        defaultValue=""
                        {...register(`en.${item.register}`)}
                        error={!!errors.en?.[item.error]}
                        helperText={errors.en?.[item.helperText]?.message || ""}
                      />
                    </Grid>
                  ))}
                  <Grid item md={12} sx={{ p: "10px" }}>
                    <Typography sx={{ margin: "0 0 8px 8px" }} variant="body2">
                      description
                    </Typography>
                    <EditorInput
                      control={control}
                      register={register}
                      name={"en.description"}
                      setValue={setValue}
                      errors={errors?.en?.description?.message}
                      initialValue={"hola"}
                    />
                  </Grid>
                  <Grid item md={12} sx={{ p: "10px" }}>
                    <Typography sx={{ margin: "0 0 8px 8px" }} variant="body2">
                      about us
                    </Typography>
                    <EditorInput
                      control={control}
                      register={register}
                      name={"en.about_us"}
                      setValue={setValue}
                      errors={errors?.en?.about_us?.message}
                      initialValue={"about_us"}
                    />
                  </Grid>
                </Grid>
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

export default CareersUpdate;
