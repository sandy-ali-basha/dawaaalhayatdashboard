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

export const usePharmaciesUpdate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, watch, reset } =
    useForm(formOptions);
  const { errors } = formState;

  const { mutate } = useMutation(
    ({ id, payload }) => _Pharmacies.update({ id, payload }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(["pharmacies"]);
        queryClient.invalidateQueries(["pharmacies", variables.id]);
        navigate(-1);
      },
    }
  );

  const handleUpdate = (id, input) => {
    setLoading(true);
    mutate(
      { id, payload: input },
      {
        onSettled: () => setLoading(false),
      }
    );
  };

  const handleCancel = () => navigate(-1);

  return {
    handleCancel,
    handleUpdate,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    loading,
    errors,
  };
};
