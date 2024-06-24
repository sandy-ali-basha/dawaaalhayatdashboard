import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Terms } from "api/terms/terms";

let schema = yup.object().shape({
  name_en: yup.string().trim().required("title english is required"),
  name_ar: yup.string().trim().required("title in arabic is required"),
  name_kr: yup.string().trim().required("title kr is required"),
  text_en: yup.string().trim().required("text english is required"),
  text_ar: yup.string().trim().required("text in arabic is required"),
  text_kr: yup.string().trim().required("text kr is required"),
});

export const useTermsCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));
  const [details, setDetails] = useState([]);

  async function createPost(data) {
    _Terms
      .post(data, setLoading)
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

  useEffect(() => {
    const fields = [
      ["name_en", "text"],
      ["name_ar", "text"],
      ["name_kr", "text"],
    ];

    const data = [];
    fields.map((item) => {
      const key = item[0];
      const type = item[1];
      var element = {
        head: t(key).replace("_", " "),
        type: type,
        placeholder: t(key).replace("_", " "),
        name: key,
        register: key,
        error: key,
        helperText: key,
      };
      data.push(element);
    });
    setDetails(data);
  }, [t]);

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
