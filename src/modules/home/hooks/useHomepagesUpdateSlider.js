// src/modules/homepages/hooks/useHomepagesUpdateSlider.js

import { useState, useEffect } from "react";
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

const schema = yup.object().shape({
  en: yup.object().shape({
    title: yup.string().required("English title is required"),
    text: yup.string().required("English text is required"),
  }),
  ar: yup.object().shape({
    title: yup.string().required("Arabic title is required"),
    text: yup.string().required("Arabic text is required"),
  }),
  kr: yup.object().shape({
    title: yup.string().required("Kurdish title is required"),
    text: yup.string().required("Kurdish text is required"),
  }),
  customLink: yup.string().nullable(),
  image: yup
    .mixed()
    .test("fileSize", "The file is too large", (value) => {
      if (!value || !value[0]) return true;
      return value[0].size <= MAX_FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (!value || !value[0]) return true;
      return SUPPORTED_FORMATS.includes(value[0].type);
    }),
});

export const useHomepagesUpdateSlider = () => {
  const { t } = useTranslation("index");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(false);
  const navigate = useNavigate();

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;

  const { mutate } = useMutation((data) => updateSlide(data));

  async function updateSlide(formData) {
    _Home
      .updateSlide(id, formData)
      .then((res) => {
        if (res.code === 200) navigate(-1);
      })
      .finally(() => setLoading(false));
  }

  // load slide details
  useEffect(() => {
    async function fetchSlide() {
      setLoading(true);
      const slides = await _Home.getSlides();
      const slide = slides.home_slides?.find((s) => s.id === Number(id));
      if (slide) {
        setName(slide?.name);
        setValue(`ar.title`, slide.translations[0]?.title || "");
        setValue(`ar.text`, slide.translations[0]?.text || "");
        setValue(`en.title`, slide.translations[1]?.text || "");
        setValue(`en.text`, slide.translations[1]?.text || "");
        setValue(`en.title`, slide.translations[1]?.title || "");
        setValue(`kr.title`, slide.translations[2]?.title || "");
        setValue(`kr.text`, slide.translations[2]?.text || "");
        setValue("customLink", slide.link || "");
      }
      setLoading(false);
    }
    fetchSlide();
  }, [id, setValue]);

  const handleCancel = () => navigate(-1);

  const handleUpdate = (input) => {
    const formData = new FormData();
    formData.append("slides[name]", name);
    for (const [langCode, langData] of Object.entries(input)) {
      // Only append title and text if they are defined
      if (langData.title) {
        formData.append(`slides[${langCode}][title]`, langData.title);
      }
      if (langData.text) {
        formData.append(`slides[${langCode}][text]`, langData.text);
      }
    }
    if (input.customLink) formData.append(`slides[link]`, input.customLink);
    // Handle the image file
    if (input.image && input.image[0]) {
      formData.append(`slides[image_file]`, input.image[0]);
    }

    mutate(formData);
    setLoading(true);
  };

  return {
    handleCancel,
    handleSubmit,
    handleUpdate,
    register,
    control,
    errors,
    t,
    loading,
  };
};
