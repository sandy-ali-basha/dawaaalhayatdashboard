import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Aboutus } from "api/aboutus/aboutus";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg",
  "image/gif",
];
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  logo_url: yup
    .mixed()
    .required("image is required")
    .test("fileFormat", "Unsupported Format", (value) => {
      const file = value?.[0]; // 👈 هون الحل
      return file && SUPPORTED_FORMATS.includes(file.type);
    }),
});

export const useAboutusCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Aboutus
      .AddPartner(data, setLoading)
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

    formData.append("name", input.name);
   formData.append("image", input.logo_url[0]);

    mutate(formData);
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
    control,
  };
};
