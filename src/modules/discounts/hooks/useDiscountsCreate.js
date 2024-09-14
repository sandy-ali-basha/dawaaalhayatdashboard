import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Discounts } from "api/discounts/discounts";

const schema = yup.object().shape({
  max_uses: yup.string().required("max_uses is required"),
  name: yup.string().required("name is required"),
  starts_at: yup.date().required("starts date is required"),
  ends_at: yup.date().required("ends date is required"),
  value: yup.string().required("value is required"),
});
export const useDiscountsCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const [discountType, setDiscountType] = useState("percentage");
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD' format
  };
  const createPost = async (data) => {
    const requestData = {
      name: data?.name,
      starts_at: formatDate(data.starts_at),
      ends_at: formatDate(data.ends_at),
      max_uses: data.max_uses,
      data: {
        percentage: discountType === "percentage" ? data.value : undefined, // Include only if percentage
        fixed_value: discountType === "value", // Boolean to indicate if fixed_value is used
        ...(discountType === "value"
          ? { fixed_values: { USD: data.value } }
          : {}), // Include fixed_values only if discountType is value
      },
    };

    // Clean up undefined values before sending
    const cleanRequestData = JSON.parse(JSON.stringify(requestData));

    console.log(cleanRequestData);
    _Discounts
      .post(requestData, setLoading)
      .then((res) => {
        if (res.code === 200) navigate(-1);
      })
      .finally(() => setLoading(false));
  };

  const handleCancel = () => navigate(-1);

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
  };

  const handleCreate = (requestData) => {
    mutate(requestData);
    setLoading(true);
  };

  const details = [
    {
      head: t("name"),
      type: "text",
      placeholder: t("name"),
      register: "name",
    },
    {
      head: t("max_uses"),
      type: "number",
      placeholder: t("max_uses"),
      register: "max_uses",
    },
    {
      head: t("starts at"),
      type: "date",
      placeholder: t("please enter date"),
      register: "starts_at",
    },
    {
      head: t("ends at"),
      type: "date",
      placeholder: t("please enter date"),
      register: "ends_at",
    },
  ];

  return {
    handleCancel,
    handleReset,
    handleCreate,
    register,
    handleSubmit,
    setValue,
    loading,
    t,
    errors,
    discountType,
    setDiscountType,
    details,
    control,
  };
};
