import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { _Pharmacies } from "api/pharmacies/pharmacies";

const schema = yup.object().shape({
  name: yup.string().required("name is required"),
  city: yup.string().required("city is required"),
  phone: yup.string().required("phone is required"),
  address: yup.string().required("address is required"),
  lat: yup
    .number()
    .typeError("lat is required")
    .required("lat is required"),
  lng: yup
    .number()
    .typeError("lng is required")
    .required("lng is required"),
});

export const usePharmaciesCreate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, watch } =
    useForm(formOptions);
  const { errors } = formState;

  const { mutate } = useMutation((payload) => _Pharmacies.create(payload), {
    onSuccess: () => {
      navigate(-1);
      queryClient.invalidateQueries(["pharmacies"]);
    },
  });

  const hanldeCreate = (input) => {
    setLoading(true);
    mutate(input, {
      onSettled: () => setLoading(false),
    });
  };

  const handleCancel = () => navigate(-1);

  return {
    handleCancel,
    hanldeCreate,
    register,
    handleSubmit,
    setValue,
    watch,
    loading,
    errors,
  };
};
