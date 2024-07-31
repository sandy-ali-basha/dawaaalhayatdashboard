
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Heroimage } from "api/heroimage/heroimage";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
]
const MAX_FILE_SIZE = 1000000;

export const useHeroimageCreate = () => {
  const { t } = useTranslation("index")
  let schema = yup.object().shape({
    image: yup
      .mixed()
      .test("File", t("image") + ' ' + t("is required"), (value) => {
        return value;
      })
      .test("fileSize", t("The file is too large"), (value) => {
        return value && value[0]?.size <= MAX_FILE_SIZE;
      })
      .test("fileFormat", t("Unsupported Format"), (value) => {
        return value && SUPPORTED_FORMATS.includes(value[0]?.type);
      }),
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } = useForm(formOptions)
  const { errors } = formState
  const { mutate } = useMutation((data) => createPost(data))

  const [image, setImage] = useState()

  async function createPost(data) {
    _Heroimage
      .post(data, setLoading)
      .then(res => {
        if (res.success) navigate(-1)
        setLoading(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleCancel = () => navigate(-1)

  const hanldeCreate = (input) => {
    const formData = new FormData()
    formData.append('image', image);
    mutate(formData);
    setLoading(true);
  }

  return {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    setValue,
    loading,
    t,
    errors,
    control,
    setImage
  };
};

