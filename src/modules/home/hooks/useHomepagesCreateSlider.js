import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

const schema = yup.object().shape({
  slides: yup.array().of(
    yup.object().shape({
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

      image: yup
        .mixed()
        .test("File", "image" + " " + "is required", (value) => {
          return value;
        })
        .test("fileSize", "The file is too large", (value) => {
          return value && value[0]?.size <= MAX_FILE_SIZE;
        })
        .test("fileFormat", "Unsupported Format", (value) => {
          return value && SUPPORTED_FORMATS.includes(value[0]?.type);
        }),
    })
  ),
});

export const useHomepagesCreateSlider = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Home
      .slides(data, setLoading)
      .then((res) => {
        if (res.code === 200) navigate(-1);
        setLoading(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleCancel = () => navigate(-1);

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
  };
  const hanldeCreate = (input) => {
    const formData = new FormData();

    // Loop through the slides and append them to the FormData
    input.slides.forEach((slide, slideIndex) => {
      for (const [langCode, langData] of Object.entries(slide)) {
        // Only append title and text if they are defined
        if (langData.title) {
          formData.append(
            `slides[${slideIndex}][${langCode}][title]`,
            langData.title
          );
        }
        if (langData.text) {
          formData.append(
            `slides[${slideIndex}][${langCode}][text]`,
            langData.text
          );
        }
      }
      if (slide.customLink)
        formData.append(`slides[${slideIndex}][link]`, slide.customLink);
      // Handle the image file
      if (slide.image && slide.image[0]) {
        formData.append(`slides[${slideIndex}][image_file]`, slide.image[0]);
      }
    });

    // Execute the mutation with the prepared FormData
    mutate(formData);
    setLoading(true);
  };

  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "kr", name: "Kurdish" },
    { code: "en", name: "English" },
  ];

  const details = languages.map((lang, index) => ({
    head: t("name " + lang.name.toLowerCase()),
    type: "text",
    placeholder: t("name"),
    register: lang.code + ".name",
  }));

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
