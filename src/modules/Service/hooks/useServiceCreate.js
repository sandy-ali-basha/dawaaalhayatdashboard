
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Service } from "api/service/service";
import { useValidation } from "./useValidation";

export const useServiceCreate = () => {
  const { t } = useTranslation("index")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { validate } = useValidation()
  const formOptions = { resolver: yupResolver(validate) };
  const { register, handleSubmit, formState, setValue, control } = useForm(formOptions)
  const { errors } = formState
  const { mutate } = useMutation((data) => createPost(data))
  const [details, setDetails] = useState([])
  const [image, setImage] = useState([])

  async function createPost(data) {
    _Service
      .post(data, setLoading)
      .then((res) => {
        if (res?.success === true) navigate(-1)
      })
      .finally((res) => {
        setLoading(false)
      })
  }

  const handleCancel = () => navigate(-1)

  const handleReset = () => {
    const form = document.querySelector('form');
    if (form) form.reset()
  }

  const params = useParams()

  const hanldeCreate = (input) => {
    const formData = new FormData()
    const inputWithoutBirthday = { ...input };
    delete inputWithoutBirthday.image;
    for (const [key, value] of Object.entries(inputWithoutBirthday)) {
      formData.append(key, value);
    }
    formData.append('image', image)
    formData.append('service_id', params.id)

    mutate(formData)
    setLoading(true)
  }

  useEffect(() => {
    const fields = [
      ["name_en", "text"],
      ["name_de", "text"],
    ]

    const data = []
    fields.map(item => {
      const key = item[0]
      const type = item[1];
      var element = {
        head: t(key).replace('_', ' '),
        type: type,
        placeholder: t(key).replace('_', ' '),
        name: key,
        register: key,
        error: key,
        helperText: key
      }
      data.push(element)
      return data
    })
    setDetails(data)
  }, [t])

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
    setImage
  };
};

