import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Typography, Divider } from "@mui/material";
import { colorStore } from "store/ColorsStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { TextFieldStyled } from "components/styled/TextField";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { _Contactus } from "api/contactus/contactus";
import Loader from "components/shared/Loader";
import ButtonLoader from "components/shared/ButtonLoader";

// 1. تحديث الـ Schema لتشمل الحقول الجديدة
const schema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  whatsapp: yup.string().required("Whatsapp is required"),
  facebook: yup.string().url("Must be a valid URL"),
  instagram: yup.string().url("Must be a valid URL"),
  linkedin: yup.string().url("Must be a valid URL"),
});

const ContactusUpdate = ({ id }) => {
  const { t } = useTranslation("index");
  const queryClient = useQueryClient();
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  // 2. جلب البيانات وتعبئة الفورم
  useEffect(() => {
    if (editedID) {
      setLoading(true);
      _axios
        .get("/contact_info/" + editedID)
        .then((res) => {
          const fetchedData = res.data?.data;
          setData(fetchedData);

          // تعبئة القيم الافتراضية في الفورم
          reset({
            companyName: fetchedData?.companyName,
            email: fetchedData?.email,
            whatsapp: fetchedData?.whatsapp,
            facebook: fetchedData?.facebook,
            instagram: fetchedData?.instagram,
            linkedin: fetchedData?.linkedin,
          });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [editedID, reset]);

  const handleClose = () => {
    setEditedID(null);
  };

  const { mutate } = useMutation(
    (formData) => _Contactus.update({ editedID: editedID, formData: formData }),
    {
      onSuccess: () => {
        setLoading(false);
        queryClient.invalidateQueries("contactus"); // تحديث الجدول بعد التعديل
        handleClose();
      },
      onError: () => setLoading(false),
    },
  );

  const onSubmit = (input) => {
    setLoading(true);
    mutate(input);
  };

  // مصفوفة لتسهيل رندر حقول التواصل الاجتماعية
  const socialFields = [
    { name: "companyName", label: t("Company Name") },
    { name: "email", label: t("Email") },
    { name: "whatsapp", label: t("Whatsapp") },
    { name: "facebook", label: t("Facebook") },
    { name: "instagram", label: t("Instagram") },
    { name: "linkedin", label: t("Linkedin") },
  ];

  return (
    <>
      {loading && <Loader />}
      <Dialog open={!!editedID} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: "text.main" }}>
          {t("Edit Contact Info")}
        </DialogTitle>

        <Box component="form" sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {/* قسم حقول التواصل */}
            {socialFields.map((field) => (
              <Grid item md={6} xs={12} key={field.name}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {field.label}
                </Typography>
                <TextFieldStyled
                  fullWidth
                  {...register(field.name)}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit">
            {t("Cancel")}
          </Button>
          <ButtonLoader
            name={t("Save Changes")}
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            disableOnLoading
          >
            Save Changes
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContactusUpdate;
