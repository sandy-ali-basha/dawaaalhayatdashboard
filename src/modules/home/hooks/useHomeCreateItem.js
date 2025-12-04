import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Home } from "api/home/home";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg",
  "image/gif",
];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// Validation schema for single item form
const schema = yup.object().shape({
  title_ar: yup.string().required("Arabic title is required"),
  description_ar: yup.string().nullable(),
  title_en: yup.string().required("English title is required"),
  description_en: yup.string().nullable(),
  title_kr: yup.string().required("Kurdish title is required"),
  description_kr: yup.string().nullable(),
  cta_link: yup.string().url("Must be a valid URL").nullable(),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "File too large", (value) => {
      return value && value[0]?.size <= MAX_FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      return value && SUPPORTED_FORMATS.includes(value[0]?.type);
    }),
});

export const useHomeCreateItem = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams(); // for home_section_id if needed

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const { mutate } = useMutation((formData) => _Home.postItem(formData));

  const handleCancel = () => navigate(-1);

  const handleReset = () => reset();

  const handleCreate = (data) => {
    const formData = new FormData();
    formData.append("home_section_id", params.id); // from URL

    // Append titles and descriptions
    formData.append("title_ar", data.title_ar);
    formData.append("description_ar", data.description_ar || "");
    formData.append("title_en", data.title_en);
    formData.append("description_en", data.description_en || "");
    formData.append("title_kr", data.title_kr);
    formData.append("description_kr", data.description_kr || "");

    // Append CTA link if provided
    if (data.cta_link) formData.append("cta_link", data.cta_link);

    // Append image
    if (data.image && data.image[0]) formData.append("image", data.image[0]);

    // Execute mutation
    mutate(formData, {
      onSuccess: (res) => {
        if (res.code === 200) navigate(-1);
      },
    });

    setLoading(true);
  };

  return {
    handleCancel,
    handleReset,
    handleCreate,
    register,
    handleSubmit,
    loading,
    errors,
    t,
  };
};
