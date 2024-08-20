import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Blog } from "api/blog/blog";

const schema = yup.object().shape({
  kr: yup.object().shape({
    title: yup.string().required("Kurdish title is required"),
    text: yup.string().required("Kurdish text is required"),
  }),
  ar: yup.object().shape({
    title: yup.string().required("Arabic title is required"),
    text: yup.string().required("Arabic text is required"),
  }),
  en: yup.object().shape({
    title: yup.string().required("English title is required"),
    text: yup.string().required("English text is required"),
  }),
});

export const useBlogCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Blog
      .post(data, setLoading)
      .then((res) => {
        if (res.code === 200) navigate(-1);
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

  const details = languages.map((lang, index) => ({
    head: t("title " + lang.name.toLowerCase()),
    type: "text",
    placeholder: t("title"),
    register: lang.code + ".title",
  }));
  const text = languages.map((lang, index) => ({
    head: t("text " + lang.name.toLowerCase()),
    placeholder: t("text"),
    register: lang.code + ".text",
  }));

  return {
    handleCancel,
    handleReset,
    hanldeCreate,
    register,
    handleSubmit,
    setValue,
    loading,
    text,
    t,
    errors,
    details,
    control,
  };
};
