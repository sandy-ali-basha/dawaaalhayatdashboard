import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { _Admin } from "api/admin/admin";
let schema = yup.object().shape({
  role: yup.string().required("role is required"),
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "The Password must be of six characters")
    .max(20, "The Password must be of 20 characters"),

  password_confirmation: yup
    .string()
    .required("Confirm password is required")
    .min(6, "The confirm password must be of six characters")
    .max(20, "The confirm password must be of 20 characters")
    .oneOf([yup.ref("password")], "your password does not match"),
});

export const useAdminCreate = () => {
  const { t } = useTranslation("index");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [Err, setErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));
  const details = [
    {
      head: t("Name"),
      type: "text",
      placeholder: t("Name"),
      name: "name",
      register: "name",
      error: "name",
      helperText: "name",
    },

    {
      head: t("Email"),
      type: "email",
      placeholder: t("Email"),
      name: "email",
      register: "email",
      error: "email",
      helperText: "email",
    },
    {
      head: t("Password"),
      type: "password",
      placeholder: t("Password"),
      name: "password",
      register: "password",
      error: "password",
      helperText: "password",
    },
    {
      head: t("Password Confirmation"),
      type: "password",
      placeholder: t("Password Confirmation"),
      name: "password_confirmation",
      register: "password_confirmation",
      error: "password_confirmation",
      helperText: "password_confirmation",
    },
  ];

  async function createPost(data) {
    await axios;
    _Admin.post(data, setLoading).then((res) => {
      setLoading(true);

      setLoading(false);
      if (res?.data?.code === 200) navigate(-1);
      else setErr(res?.data?.error?.errors);
    });
  }

  const hanldeCreate = (input) => {
    mutate(input);
    setLoading(true);
  };

  return {
    hanldeCreate,
    register,
    handleSubmit,
    setValue,
    loading,
    t,
    errors,
    details,
    showPassword,
    handleTogglePasswordVisibility,
    Err,
  };
};
