import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Product_attributes } from "api/product_attributes/product_attributes";

const schema = yup.object().shape({
  kr: yup.object().shape({
    title: yup.string().required("Kurdish title is required"),
  }),
  ar: yup.object().shape({
    title: yup.string().required("Arabic title is required"),
  }),
  en: yup.object().shape({
    title: yup.string().required("English title is required"),
  }),
});

export const useProduct_attributesCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));
  const queryClient = useQueryClient();

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
  };

  async function createPost(data) {
    _Product_attributes
      .post(data, setLoading)
      .then((res) => {
        if (res.success) {
          handleReset();
          queryClient.invalidateQueries(["product_attributes"]);
        }
        setLoading(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleCancel = () => navigate(-1);

  const hanldeCreate = (input) => {
    mutate(input);
    setLoading(true);
  };

  const languages = [
    { code: "ar", title: "Arabic" },
    { code: "en", title: "English" },
    { code: "kr", title: "Kurdish" },
  ];

  const details = languages.map((lang, index) => ({
    head: t("title " + lang.title.toLowerCase()),
    type: "text",
    placeholder: t("title"),
    register: lang.code + ".title",
  }));

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
