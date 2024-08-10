
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _policy } from "api/policy/policy";

let schema = yup.object().shape({
  title_en: yup.string().required("title en is required"),
  message_en: yup.string().required("message en is required"),
  title_de: yup.string().required("title de is required"),
  message_de: yup.string().required("message de is required"),
})

export const usePolicyCreate = () => {
  const { t } = useTranslation("index")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } = useForm(formOptions)
  const { errors } = formState
  const { mutate } = useMutation((data) => createPost(data))
  const [details, setDetails] = useState([])

  async function createPost(data) {
    _policy
      .post(data, setLoading)
      .then(res => {
        if (res.code === 200) navigate(-1)
        setLoading(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleCancel = () => navigate(-1)

  const handleReset = () => {
    const form = document.querySelector('form');
    if (form) form.reset()
  }

  const hanldeCreate = (input) => {
    const formData = new FormData()

    formData.append('title_en', input.title_en);
    formData.append('message_en', input.message_en);
    formData.append('title_de', input.title_de);
    formData.append('message_de', input.message_de);

    mutate(formData);
    setLoading(true);

  }

  useEffect(() => {
    const fields = [
      ["title_en", "text"],
      ["title_de", "text"],
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
  };
};

