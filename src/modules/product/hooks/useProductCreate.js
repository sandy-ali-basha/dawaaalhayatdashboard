import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Product } from "api/product/product";
import { _axios } from "interceptor/http-config";

let schema = yup.object().shape({
  brand_id: yup.string().trim().required("brand is required"),
  product_type_id: yup.string().trim().required("medical form is required"),
  status: yup.string().trim().required("status type is required"),
  price: yup.string().trim().required("price is required"),
  qty: yup.string().trim().required("qty is required"),
  sku: yup.string().trim().required("sku is required"),
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
});

export const useProductCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const [brands, setBrand] = useState(null);
  const [producttypes, setproducttypes] = useState(null);
  const [statuses, setStatuses] = useState([{ id: 1, name: "done" }]);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control, reset } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));

  useEffect(() => {
    _axios.get("/brand").then((res) => {
      setLoading(false);
      setBrand(res?.data?.data?.brands);
    });
    _axios.get("/product_type").then((res) => {
      setLoading(false);
      setproducttypes(res?.data?.data?.producttypes);
    });
  }, []);
  async function createPost(data) {
    _Product
      .post(data, setLoading)
      .then((res) => {
        if (res?.code === 200) navigate(-1);
        setLoading(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  console.log(errors);
  const details = [
    {
      head: t("arabic name"),
      type: "text",
      placeholder: t("ar.name"),
      name: "ar.name",
      register: "ar.name",
      error: "ar.name",
      helperText: "ar.name",
    },

    {
      head: t("english name"),
      type: "text",
      placeholder: t("en.name"),
      name: "en.name",
      register: "en.name",
      error: "en.name",
      helperText: "en.name",
    },

    {
      head: t("kurdish name"),
      type: "text",
      placeholder: t("kr.name"),
      name: "kr.name",
      register: "kr.name",
      error: "kr.name",
      helperText: "kr.name",
    },
  ];
  const generalDetails = [
    {
      head: t("sku"),
      type: "text",
      placeholder: "sku",
      name: "sku",
      register: "sku",
      error: "sku",
      helperText: "sku",
    },
    {
      head: t("status"),
      type: "text",
      placeholder: "status",
      name: "status",
      register: "status",
      error: "status",
      helperText: "status",
    },
    {
      head: t("price"),
      type: "number",
      placeholder: "price",
      name: "price",
      register: "price",
      error: "price",
      helperText: "price",
    },
    {
      head: t("qty"),
      type: "number",
      placeholder: "qty",
      name: "qty",
      register: "qty",
      error: "qty",
      helperText: "qty",
    },
  ];
  const Discription = [
    {
      head: t("arabic description"),
      type: "text",
      placeholder: t("ar.description"),
      name: "ar.description",
      register: "ar.description",
      error: "ar.description",
      helperText: "ar.description",
    },
    {
      head: t("kurdish description"),
      type: "text",
      placeholder: t("kr.description"),
      name: "kr.description",
      register: "kr.description",
      error: "kr.description",
      helperText: "kr.description",
    },
    {
      head: t("english description"),
      type: "text",
      placeholder: t("en.description"),
      name: "en.description",
      register: "en.description",
      error: "en.description",
      helperText: "en.description",
    },
  ];

  const handleCancel = () => navigate(-1);

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
    reset();
  };

  const hanldeCreate = (input) => {
    const withDesc = {
      ...input,
      description: input?.en?.description || "",
    };

    mutate(withDesc);
    setLoading(true);
  };

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
    generalDetails,
    control,
    brands,
    statuses,
    producttypes,
    Discription,
  };
};
