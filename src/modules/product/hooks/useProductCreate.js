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
  sku: yup.string().required("sku is required"),
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
    mode: "onChange",
  };

  const { register, handleSubmit, formState, setValue, control, watch } =
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
      head: t("Name arabic"),
      type: "text",
      name: "ar.name",
      register: "ar.name",
      error: "ar.name",
      helperText: "ar.name",
    },

    {
      head: t("Name English"),
      type: "text",
      name: "en name",
      register: "en.name",
      error: "en.name",
      helperText: "en.name",
    },
    {
      head: t("Name kurdish"),
      type: "text",
      name: "kr name",
      register: "kr.name",
      error: "kr.name",
      helperText: "kr.name",
    },
    {
      head: "SKU",
      type: "text",
      name: "sku",
      register: "sku",
      error: "sku",
      helperText: "sku",
    },
  ];

  const Discription = [
    {
      head: t("Arabic Description"),
      type: "text",
      name: "ar.description",
      register: "ar.description",
      error: "ar.description",
      helperText: "ar.description",
    },
    {
      head: t("kurdish Description"),
      type: "text",
      name: "kr.description",
      register: "kr.description",
      error: "kr.description",
      helperText: "kr.description",
    },
    {
      head: t("English Description"),
      type: "text",
      name: "en.description",
      register: "en.description",
      error: "en.description",
      helperText: "en.description",
    },
  ];

  const handleCancel = () => navigate(-1);

  const hanldeCreate = (input) => {
    // Base product data
    const productData = {
      ...input,
      description: input?.en?.description || "",
    };

    // Add dimensions into each language block
    const dimensions = {
      length: productData.length,
      width: productData.width,
      height: productData.height,
      division: productData.division,
    };

    productData.ar = { ...productData.ar, ...dimensions };
    productData.kr = { ...productData.kr, ...dimensions };
    productData.en = { ...productData.en, ...dimensions };

    // Optional: if density should also be calculated automatically
    if (
      productData.length &&
      productData.width &&
      productData.height &&
      productData.weight
    ) {
      const volume =
        productData.length * productData.width * productData.height;
      productData.density = (productData.weight / volume).toFixed(4);
    }

    // Send to backend
    return _Product
      .post(productData, setLoading)
      .then((res) => {
        if (res?.code === 200) setNewProductId(res?.data?.products_id);
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
    _Regions.index().then((response) => {
      if (response.code === 200) {
        setRegions(response.data);
      }
    });
  }, []);

  const packings = ["packings1", "packings"];

  const addNewPacking = () => {
    console.log("addNewPacking");
  };
  return {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    setValue,
    loading,
    t,
    errors,
    details,
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
    watch,
    packings,
    addNewPacking,
  };
};
