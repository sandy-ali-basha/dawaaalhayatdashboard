import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Product } from "api/product/product";
import { _axios } from "interceptor/http-config";
import { _cities } from "api/cities/cities";

let schema = yup.object().shape({
  brand_id: yup.string().trim().required("brand is required"),
  product_type_id: yup.string().trim().required("medical form is required"),
  status: yup.string().trim().required("status is required"),
  price: yup.number().required("price is required"),
  qty: yup.number().required("qty is required"),

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
  const [cities, setCiteies] = useState([]);
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const [brands, setBrand] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const [producttypes, setproducttypes] = useState(null);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control, reset } =
    useForm(formOptions);
  const { errors } = formState;

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
    {
      head: t("points"),
      type: "number",
      placeholder: "points",
      name: "points",
      register: "points",
      error: "points",
      helperText: "points",
    },
    {
      head: t("price before sale"),
      type: "number",
      placeholder: "compare_price",
      name: "compare_price",
      register: "compare_price",
      error: "compare_price",
      helperText: "compare_price",
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
    const requests = selectedCities?.map((city_id) => {
      const productData = {
        ...input,
        city_id, // Current city_id for each request
        description: input?.en?.description || "",
      };

      return _Product.post(productData, setLoading);
    });

    Promise.all(requests)
      .then((responses) => {
        navigate(-1); // Navigate or display success message
      })
      .catch((error) => {
        console.error("Error creating products for multiple cities", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useMemo(() => {
    _cities.index().then((response) => {
      if (response.code === 200) {
        setCiteies(response.data);
      }
    });
  }, []);

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
    producttypes,
    Discription,
    cities,
    selectedCities,
    setSelectedCities,
  };
};
