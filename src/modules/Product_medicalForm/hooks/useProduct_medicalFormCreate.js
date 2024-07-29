import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Product_medicalForm } from "api/Product_medicalForm/Product_medicalForm";

const schema = yup.object().shape({
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

export const useProduct_medicalFormCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));
  const params = useParams();

  async function createPost(data) {
    _Product_medicalForm
      .post(data, params.id, setLoading)
      .then((res) => {
        if (res.success) navigate(-1);
        setLoading(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleCancel = () => navigate(-1);

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
  };

  const hanldeCreate = (input) => {
    mutate(input);
    setLoading(true);
  };
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
    },
  ]);

  return {
    handleCancel,
    handleReset,
    hanldeCreate,
    register,
    handleSubmit,
    setValue,
    loading,
    t,
    errors,
    details,
    control,
  };
};
