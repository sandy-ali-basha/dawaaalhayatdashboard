import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Regions } from "api/regions/regions";

const schema = yup.object().shape({
  name: yup.object().shape({
    en: yup.string().required("English Name is required"),
    ar: yup.string().required("Arabic Name is required"),
    kr: yup.string().required("Kurdish Name is required"),
  }),
});

export const useCountryCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    try {
      const res = await _Regions.post(data);
      if (res?.code === 200) {
        queryClient.invalidateQueries(["regions"]);
        navigate(-1);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = () => navigate(-1);

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
  };
  const hanldeCreate = (input) => {
    const formData = new FormData();

    // 1. Manually append nested name fields
    if (input.name) {
      formData.append("name[en]", input.name.en);
      formData.append("name[ar]", input.name.ar);
      formData.append("name[kr]", input.name.kr);
    }

    // 2. Append other top-level fields (like currency_id)
    // We skip 'name' here because we handled it above
    for (const [key, value] of Object.entries(input)) {
      if (key !== "name" && key !== "birthday") {
        formData.append(key, value);
      }
    }

    mutate(formData);
    setLoading(true);
  };

  const details = [
    {
      head: "Name English",
      type: "text",
      placeholder: "Name English",
      register: "name.en",
    },
    {
      head: "Name Arabic",
      type: "text",
      placeholder: "Name Arabic",
      register: "name.ar",
    },
    {
      head: "Name Kurdish",
      type: "text",
      placeholder: "Name Kurdish",
      register: "name.kr",
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
