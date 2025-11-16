import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Currencies } from "api/currencies/currencies";

const schema = yup.object().shape({
  name: yup.string().required("name is required"),
  code: yup.string().required("code is required"),
  exchange_rate: yup.string().required("exchange rate is required"),
});

export const useCurrenciesCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Currencies
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
    const formData = new FormData();
    const inputWithoutBirthday = { ...input };
    delete inputWithoutBirthday.birthday;
    for (const [key, value] of Object.entries(inputWithoutBirthday)) {
      formData.append(key, value);
    }
    mutate(formData);
    setLoading(true);
  };

  const details = [
    {
      head: "name",
      type: "text",
      placeholder: "name",
      register: "name",
    },
    {
      head: "code",
      type: "text",
      placeholder: "code",
      register: "code",
    },
    {
      head: "exchange rate",
      type: "text",
      placeholder: "exchange rate",
      register: "exchange_rate",
    },
    {
      head: "decimal places",
      type: "number",
      placeholder: "decimal_places",
      register: "decimal_places",
    },
  ];
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
