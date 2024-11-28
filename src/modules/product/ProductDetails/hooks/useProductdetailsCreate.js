import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _Productdetails } from "api/productdetails/productdetails";

const schema = yup.object().shape({
  kr: yup.object().shape({
    title: yup.string().required("Kurdish title is required"),
    description: yup.string().required("Kurdish description is required"),
  }),
  ar: yup.object().shape({
    title: yup.string().required("Arabic title is required"),
    description: yup.string().required("Arabic description is required"),
  }),
  en: yup.object().shape({
    title: yup.string().required("English title is required"),
    description: yup.string().required("English description is required"),
  }),
});

export const useProductdetailsCreate = ({ id }) => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [alert, setAlert] = useState([]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));
  const handleCreatePost = (data) => {
    setLoading(true);
    // Ensure id is an array
    const ids = Array.isArray(id) ? id : [id];
    // Map over the array of ids to create a request for each
    const requests = ids.map((productId) =>
      _Productdetails.post(
        { ...data, product_id: productId }, // Include product_id for each request
        setLoading
      )
    );

    // Execute all requests concurrently
    Promise.all(requests)
      .then((responses) => {
        responses.forEach((res, index) => {
          if (res?.code === 200) {
            setAlert((prev) => [
              ...prev,
              `Details for Product ${ids[index]} saved successfully.`,
            ]);
          } else {
            setAlert((prev) => [
              ...prev,
              `Failed to save Details for Product ${ids[index]}.`,
            ]);
          }
        });
      })
      .catch((error) => {
        console.error("Error while saving product details:", error);
        setAlert((prev) => [
          ...prev,
          "An error occurred while saving details.",
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  async function createPost(data) {
    if (id && Array.isArray(id)) {
      handleCreatePost(data);
    } else {
      _Productdetails
        .post(data, setLoading)
        .then((res) => {
          if (res?.code === 200) navigate(-1);
          setLoading(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  const handleCancel = () => navigate(-1);

  const handleReset = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
  };
  const params = useParams();

  const hanldeCreate = (input) => {
    const inputWithProductId = { ...input, product_id: params?.id };
    mutate(inputWithProductId);
    setLoading(true);
  };

  const languages = [
    { code: "ar", name: "Arabic" },
    { code: "kr", name: "Kurdish" },
    { code: "en", name: "English" },
  ];
  const Discription = [
    {
      head: t("arabic description"),
      type: "text",
      placeholder: t("ar.description"),
      name: "ar.description",
      register: "ar.description",
      error: "ar.description",
      helperText: "ar.description",
    },
    {
      head: t("kurdish description"),
      type: "text",
      placeholder: t("kr.description"),
      name: "kr.description",
      register: "kr.description",
      error: "kr.description",
      helperText: "kr.description",
    },
    {
      head: t("english description"),
      type: "text",
      placeholder: t("en.description"),
      name: "en.description",
      register: "en.description",
      error: "en.description",
      helperText: "en.description",
    },
  ];
  const details = languages.map((lang, index) => ({
    head: t("title " + lang.name.toLowerCase()),
    type: "text",
    placeholder: t("title"),
    register: lang.code + ".title",
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
    alert,
    Discription,
  };
};
