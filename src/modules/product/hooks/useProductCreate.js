import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Product } from "api/product/product";
import { _axios } from "interceptor/http-config";
import { _cities } from "api/cities/cities";
import { _Regions } from "api/regions/regions";
import { useSettings } from "hooks/settings/useSettings";

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

export const useProductCreate = ({ setNewProductId }) => {
  const [cities, setCiteies] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegions] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const [brands, setBrand] = useState(null);
  const [producttypes, setproducttypes] = useState(null);
  const { data: point_price } = useSettings();

  const navigate = useNavigate();
  const formOptions = {
    resolver: yupResolver(schema),
    defaultValues: {
      points: 0, // Set the initial value for "points"
    },
  };

  const { register, handleSubmit, formState, setValue, control, reset, watch } =
    useForm(formOptions);
  const { errors } = formState;
  const price = watch("price"); // Watch for changes in the "price" field

  useEffect(() => {
    // Update the "points" field whenever "price" or "point_price" changes
    if (price && point_price) {
      setValue(
        "points",
        Math.round(price / point_price?.data?.point_price?.value) // تقريب القيمة
      );
  
    } else {
      setValue("points", 0);
    }
  }, [price, point_price, setValue]);

  useEffect(() => {
    _axios.get("/brand").then((res) => {
      setLoading(false);
      setBrand(res?.data?.data?.brands);
    });
    _axios.get("/product_type").then((res) => {
      setLoading(false);
      setproducttypes(res?.data?.data?.producttypes);
    });
  }, [setValue]);

  const details = [
    {
      head: t("arabic name"),
      type: "text",
      placeholder: t("ar name"),
      name: "ar.name",
      register: "ar.name",
      error: "ar.name",
      helperText: "ar.name",
    },

    {
      head: t("english name"),
      type: "text",
      placeholder: t("en.name"),
      name: "en name",
      register: "en.name",
      error: "en.name",
      helperText: "en.name",
    },

    {
      head: t("kurdish name"),
      type: "text",
      placeholder: t("kr.name"),
      name: "kr name",
      register: "kr.name",
      error: "kr.name",
      helperText: "kr.name",
    },
  ];

  const generalDetails = [
    {
      head: t("price before sale"),
      type: "number",
      placeholder: "compare price",
      name: "compare_price",
      register: "compare_price",
      error: "compare_price",
      helperText: "compare_price",
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
      head: t("sku"),
      type: "text",
      placeholder: "sku",
      name: "sku",
      register: "sku",
      error: "sku",
      helperText: "sku",
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
    if (selectedRegion) {
      const productData = {
        ...input,
        region_id: selectedRegion,
        region_price: input.price,
        description: input?.en?.description || "",
      };

      // Return a single POST request
      return _Product
        .post(productData, setLoading)
        .then((res) => {
          if (res?.code === 200) setNewProductId(res?.data?.products_id);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // If multiple cities, map them to API calls and handle them
      const requests = selectedCities?.map((city_id) => {
        const productData = {
          ...input,
          city_id, // Current city_id for each request
          description: input?.en?.description || "",
        };

        // Return the promise for this POST request
        return _Product.post(productData, setLoading);
      });

      // Run all requests in parallel and return the promise
      return Promise.all(requests)
        .then((res) => {
          const newProductIds = res.map((response) => response?.data?.id);
          setNewProductId(newProductIds); // Set the IDs as an array
        })
        .catch((error) => {
          console.error("Error creating products for multiple cities", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useMemo(() => {
    _cities.index().then((response) => {
      if (response.code === 200) {
        setCiteies(response.data);
      }
    });
    _Regions.index().then((response) => {
      if (response.code === 200) {
        setRegions(response.data);
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
    selectedRegion,
    setSelectedRegions,
    regions,
  };
};
