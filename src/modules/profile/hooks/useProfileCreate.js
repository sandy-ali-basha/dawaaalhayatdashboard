import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Profile } from "api/profile/profile";
import { useMutation } from "react-query";

let schema = yup.object().shape({
  first_name: yup.string().trim().required("first name is required"),
});

export const useProfileCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));
  const [details, setDetails] = useState([]);

  async function createPost(data) {
    _Profile
      .post(data, setLoading)
      .then(setLoading(true))
      .finally(() => {
        setLoading(false);
        navigate(-1);
      });
  }

  const handleCancel = () => navigate(-1);

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
  };

  const hanldeCreate = (input) => {
    const formData = new FormData();
    const inputWithoutBirthday = { ...input };
    delete inputWithoutBirthday.birthday;
    for (const [key, value] of Object.entries(inputWithoutBirthday)) {
      formData.append(key, value);
    }
    mutate(formData);
    setLoading(true);
  };

  useEffect(() => {
    const fields = [["first_name", "text"]];
    const data = [];
    fields.map((item) => {
      const key = item[0];
      const type = item[1];
      var element = {
        head: t(key).replace("_", " "),
        type: type,
        placeholder: t(key).replace("_", " "),
        name: key,
        register: key,
        error: key,
        helperText: key,
      };
      data.push(element);
    });
    setDetails(data);
  }, [t]);

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
