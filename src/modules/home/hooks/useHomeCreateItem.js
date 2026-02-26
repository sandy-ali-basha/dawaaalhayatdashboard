import { useMemo, useState } from "react";
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
  "video/*",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 2MB

// Validation schema for single item form
export const useHomeCreateItem = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams(); // for home_section_id if needed
  const isReelSection = Number(params.id) === 4;

  const schema = useMemo(
    () =>
      yup.object().shape({
        title_ar: yup.string().required("Arabic title is required"),
        description_ar: yup.string().nullable(),
        title_en: yup.string().required("English title is required"),
        description_en: yup.string().nullable(),
        title_kr: yup.string().required("Kurdish title is required"),
        description_kr: yup.string().nullable(),
        cta_link: yup.string().url("Must be a valid URL").nullable(),
        image: isReelSection
          ? yup.mixed().nullable()
          : yup
              .mixed()
              .required("Image is required")
              .test("fileSize", "File too large", (value) => {
                return value && value[0]?.size <= MAX_FILE_SIZE;
              }),
        video_en: isReelSection
          ? yup.mixed().required("English video is required")
          : yup.mixed().nullable(),
        video_ar: isReelSection
          ? yup.mixed().required("Arabic video is required")
          : yup.mixed().nullable(),
        video_kr: isReelSection
          ? yup.mixed().required("Kurdish video is required")
          : yup.mixed().nullable(),
      }),
    [isReelSection],
  );

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

    // Append image for non-reel sections
    if (!isReelSection && data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    // Append reel videos for section 4
    if (isReelSection) {
      if (data.video_en && data.video_en[0]) {
        formData.append("video_en", data.video_en[0]);
      }

      if (data.video_ar && data.video_ar[0]) {
        formData.append("video_ar", data.video_ar[0]);
      }

      if (data.video_kr && data.video_kr[0]) {
        formData.append("video_kr", data.video_kr[0]);
      }
    }

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
    sectionId: Number(params.id),
  };
};
