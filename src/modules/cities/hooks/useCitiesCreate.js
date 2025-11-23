import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _cities } from "api/cities/cities";
import { useCurrencies } from "hooks/currencies/useCurrencies";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  inv_name: yup.string().required("Inventory name is required"),
  shipping_price: yup
    .number()
    .typeError("Must be a number")
    .required("Shipping price is required"),
  currency_id: yup.number().required("Currency is required"),
});

export const useCitiesCreate = () => {
  const { t } = useTranslation("index");
  const { data: Currencies, isLoading: CurrenciesisLoading } = useCurrencies();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _cities
      .post(
        {
          data: [
            {
              name: data?.name,
              inv_name: data?.inv_name,
              shipping_price: data?.shipping_price,
              currency_id: data?.currency_id,
            },
          ],
        },
        setLoading
      )
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
    mutate(input);
    setLoading(true);
  };

  const details = [
    {
      head: t("name"),
      type: "text",
      placeholder: t("name"),
      register: "name",
    },
    {
      head: t("inventory name"),
      type: "text",
      placeholder: t("inventory name"),
      register: "inv_name",
    },
    {
      head: t("Shipping Price"),
      type: "number",
      placeholder: t("Shipping Price"),
      register: "shipping_price",
    },
  ];

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
    Currencies,
    CurrenciesisLoading,
  };
};
