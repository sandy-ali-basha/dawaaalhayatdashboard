import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Productdetails } from "api/productdetails/productdetails";

const schema = yup.object().shape({
  // Validation for Kurdish
  kr: yup.object().shape({
    title: yup.string().required("Kurdish title is required"),
    description: yup.string().required("Kurdish description is required"),
  }),
  // Validation for Arabic
  ar: yup.object().shape({
    title: yup.string().required("Arabic title is required"),
    description: yup.string().required("Arabic description is required"),
  }),
  // Validation for English
  en: yup.object().shape({
    title: yup.string().required("English title is required"),
    description: yup.string().required("English description is required"),
  }),
});

// Assuming 'id' is a single value (for editing) or null (for creation)
export const useProductdetailsCreate = ({ id }) => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Changed 'alert' to a single string/object state, as multi-product array is removed
  const [alertMessage, setAlertMessage] = useState(null); 
  const params = useParams();

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, reset, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;

  // API handler for a single product detail creation/update
  async function createOrUpdateDetails(data) {
    setLoading(true);
    try {
      // If 'id' is passed as a prop, it's for an existing product. 
      // If 'params.id' exists, it's for creating details linked to that product ID.
      const productId = id || params?.id;
      
      // Attach the product_id to the data payload
      const payload = productId ? { ...data, product_id: productId } : data;

      const res = await _Productdetails.post(payload, setLoading);
      
      // Handle the API response
      if (res?.code === 200) {
        setAlertMessage(t("Details saved successfully."));
      } else {
        setAlertMessage(res?.message || t("Failed to save details."));
      }

    } catch (error) {
      console.error("Error while saving product details:", error);
      setAlertMessage(t("An unexpected error occurred while saving details."));
    } finally {
      setLoading(false);
    }
  }

  // Use the standard pattern for React Query mutations
  const { mutate } = useMutation(createOrUpdateDetails);
  
  // Simplified handler: now just calls mutate
  const hanldeCreate = (input) => {
    mutate(input);
  };
  
  const handleCancel = () => navigate(-1);

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
    reset();
    setAlertMessage(null); // Clear any existing alert
  };

  // --- UI Data Mapping (Remains the same as it relies on i18n and t function) ---
  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "kr", name: "Kurdish" },
    { code: "en", name: "English" },
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
  
  const details = languages.map((lang, index) => ({
    head: t("title " + lang.name.toLowerCase()),
    type: "text",
    placeholder: t("title"),
    register: lang.code + ".title",
  }));
  // --------------------------------------------------------------------------

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
    alertMessage, // Changed 'alert' to 'alertMessage'
    Discription,
    handleReset,
  };
};