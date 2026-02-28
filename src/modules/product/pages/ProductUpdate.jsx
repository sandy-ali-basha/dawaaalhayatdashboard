import { React, useEffect, useState } from "react";
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
import { _Product } from "api/product/product";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";
import EditorInput from "components/shared/EditorInput";
import DensityCalculator from "../components/DensityCalculator";

let schema = yup.object().shape({
  brand_id: yup.string().trim().required("brand is required"),
  product_type_id: yup.string().trim().required("product type is required"),
  kr: yup.object().shape({
    name: yup.string().required("Kurdish name name is required"),
    description: yup.string().required("Kurdish description is required"),
  }),
  ar: yup.object().shape({
    name: yup.string().required("Arabic name name is required"),
    description: yup.string().required("Arabic description is required"),
  }),
  en: yup.object().shape({
    name: yup.string().required("English name name is required"),
    description: yup.string().required("English description is required"),
  }),
  points: yup.number().notRequired(),
});

const ProductUpdate = ({ id }) => {
  const { t } = useTranslation("index");
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [brands, setBrand] = useState(data?.brand_id);
  const [producttypes, setproducttypes] = useState();

  const formOptions = {
    resolver: yupResolver(schema),
    defaultValues: {
      purchasable: data?.purchasable,
    },
  };
  const { register, handleSubmit, formState, control, watch, setValue } =
    useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    _axios
      .get("/product/" + editedID, {
        headers: {
          translations: "yes",
        },
      })
      .then((res) => {
        setData(res.data?.data);
        const fetchedData = res.data?.data;
        setData(fetchedData);
        if (fetchedData.translations) {
          setValue(
            "kr.name",
            fetchedData?.translations?.find((t) => t.locale === "kr")?.name ||
              ""
          );
          setValue(
            "kr.tag",
            fetchedData?.translations?.find((t) => t.locale === "kr")?.tag ||
              ""
          );
          setValue(
            "kr.description",
            fetchedData?.translations?.find((t) => t.locale === "kr")
              ?.description || ""
          );
          setValue(
            "ar.name",
            fetchedData?.translations?.find((t) => t.locale === "ar")?.name ||
              ""
          );
          setValue(
            "ar.tag",
            fetchedData?.translations?.find((t) => t.locale === "ar")?.tag ||
              ""
          );
          setValue(
            "ar.description",
            fetchedData?.translations?.find((t) => t.locale === "ar")
              ?.description || ""
          );
          setValue(
            "en.name",
            fetchedData?.translations?.find((t) => t.locale === "en")?.name ||
              ""
          );
          setValue(
            "en.tag",
            fetchedData?.translations?.find((t) => t.locale === "en")?.tag ||
              ""
          );
          setValue(
            "en.description",
            fetchedData?.translations?.find((t) => t.locale === "en")
              ?.description || ""
          );
        }
      });
  }, [id, editedID, setValue]);

  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "kr", name: "Kurdish" },
    { code: "en", name: "English" },
  ];

  const details = languages.flatMap((lang) => [
    {
      head: t(`name ${lang.name.toLowerCase()}`),
      type: "text",
      placeholder: t("name"),
      register: `${lang.code}.name`,
      helperText: `${lang.code}.name`,
      defaultValue:
        data?.translations?.find((tr) => tr.language === lang.code)?.name || "",
    },
    {
      head: t(`tag ${lang.name.toLowerCase()}`),
      type: "text",
      placeholder: t("tag"),
      register: `${lang.code}.tag`,
      helperText: `${lang.code}.tag`,
      defaultValue:
        data?.translations?.find((tr) => tr.language === lang.code)?.tag || "",
    },
  ]);

  const TextEditorDetails = languages.flatMap((lang) => [
    {
      head: t(`description ${lang.name.toLowerCase()}`),
      type: "text",
      placeholder: t("description"),
      register: `${lang.code}.description`,
      helperText: `${lang.code}.description`,
      initialValue:
        data?.translations?.find((t) => t.locale === lang.code)?.description ||
        "",
    },
  ]);

  details.push(
    {
      head: t("sku"),
      type: "text",
      placeholder: "sku",
      name: "sku",
      register: "sku",
      error: "sku",
      helperText: "sku",
      defaultValue: data?.sku,
    },
    {
      head: t("points"),
      type: "number",
      placeholder: "points",
      register: "points",
      helperText: "points",
      defaultValue: data?.points,
    },
  );

  useEffect(() => {
    _axios.get("/brand").then((res) => {
      setBrand(res?.data?.data?.brands);
      setLoading(false);
    });
    _axios.get("/product_type").then((res) => {
      setproducttypes(res?.data?.data?.producttypes);
      setLoading(false);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const handleDialogClose = (event, reason) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    handleClose();
  };

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Product
      .update({
        editedID: editedID,
        formData: data,
      })
      .catch((err) => {
        setLoading(false);
      })
      .then((res) => {
        console.log(res.code);
        if (res.code === 200) {
          handleDialogClose();
        }
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
      <Dialog open={true} onClose={handleDialogClose} maxWidth>
        <DialogTitle sx={{ color: "text.main" }}>
          {t("Edit products")}{" "}
        </DialogTitle>

        {!!data && (
          <>
            {" "}
            <Grid container component="form">
              {brands && (
                <Grid item xs={6} sx={{ p: "10px" }}>
                  <FormControl fullWidth>
                    <Box sx={{ margin: "0 0 8px 5px" }}>
                      <Typography color="text.main">{t("brand")}</Typography>
                    </Box>
                    <SelectStyled
                      defaultValue={data?.brand?.id}
                      sx={{ color: "text.main", borderColor: "text.main" }}
                      {...register("brand_id")}
                    >
                      {brands?.map((item) => (
                        <MenuItemStyled value={item.id} key={item.id}>
                          <Box style={{ color: "text.main" }}>{item.name}</Box>
                        </MenuItemStyled>
                      ))}
                    </SelectStyled>
                    <FormHelperText error>
                      {errors.brand_id?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              )}

              {producttypes && (
                <Grid item xs={6} sx={{ p: "10px" }}>
                  <FormControl fullWidth>
                    <Box sx={{ margin: "0 0 8px 5px" }}>
                      <Typography color="text.main">
                        {t("medical form")}
                      </Typography>
                    </Box>
                    <SelectStyled
                      sx={{ color: "text.main", borderColor: "text.main" }}
                      {...register("product_type_id")}
                      defaultValue={data?.product_type?.id}
                    >
                      {producttypes?.map((item) => (
                        <MenuItemStyled value={item.id} key={item.id}>
                          <Box style={{ color: "text.main" }}>{item.name}</Box>
                        </MenuItemStyled>
                      ))}
                    </SelectStyled>
                    <FormHelperText error>
                      {errors.product_type_id?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              )}
              {details?.map((item, index) => {
                const error = errors?.[item.register.split(".")[0]]?.name;
                return (
                  <Grid key={index} item md={6} sx={{ p: "10px" }}>
                    <Box sx={{ margin: "0 0 8px 5px" }}>
                      <Typography color="text.main">{item.head}</Typography>
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
              <Box sx={{ border: "2px solid white", mx: 1, borderRadius: 2 }}>
                {/* Weight & Dimensions Section */}
                <DensityCalculator
                  register={register}
                  watch={watch}
                  errors={errors}
                  defaultData={{
                    length: data?.length,
                    width: data?.width,
                    height: data?.height,
                    weight: data?.weight,
                    division: data?.division,
                  }}
                />
              </Box>
              {TextEditorDetails?.map((item, index) => {
                const error = errors?.[item.register.split(".")[0]]?.name;
                return (
                  <Grid key={index} item md={12} sx={{ p: "10px" }}>
                    <Box sx={{ margin: "0 0 8px 5px" }}>
                      <Typography variant="text.main" color="text.main">
                        {item.head}
                      </Typography>
                    </Box>
                    <EditorInput
                      control={control}
                      register={register}
                      name={item.register}
                      setValue={setValue}
                      errors={error?.message || ""}
                      initialValue={item.initialValue}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "text.main" }}>
            {t("Cancel")}
          </Button>

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

export default ProductUpdate;
