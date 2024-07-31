import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Product_attributes_values } from "api/product_attributes_values/product_attributes_values";

const schema = yup.object().shape({
  kr: yup.object().shape({
    name: yup.string().required("Kurdish value is required"),
  }),
  ar: yup.object().shape({
    name: yup.string().required("Arabic value is required"),
  }),
  en: yup.object().shape({
    name: yup.string().required("English value is required"),
  }),
});

export const useProduct_attributes_valuesCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control, reset } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));
  const handleReset = () => {
    reset();
  };
  async function createPost(data) {
    _Product_attributes_values
      .post(data, setLoading)
      .then((res) => {
        console.log(res);
        if (res.code === 200) {
          handleReset();
        }
        setLoading(true);
      })

      .finally(() => {
        setLoading(false);
      });
  }

  const handleCancel = () => navigate(-1);

  const params = useParams();
  const hanldeCreate = (input) => {
    const Values = {
      ar: { value: input.ar.name },
      kr: { value: input.kr.name },
      en: { value: input.en.name },
      product_attributes_id: params.id,
    };
    mutate(Values);
    setLoading(true);
  };
  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "kr", name: "Kurdish" },
    { code: "en", name: "English" },
  ];

  const details = languages.map((lang, index) => ({
    head: t("value name " + lang.name.toLowerCase()),
    type: "text",
    placeholder: t("name"),
    register: lang.code + ".name",
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
    control,
    details,
  };
};
