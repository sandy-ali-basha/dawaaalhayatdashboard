import { useState } from "react";
import { categoryStore } from "store/categoryStore";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { _Admin } from "api/admin/admin";

let schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
export const useAdminUpdate = () => {
  const { t } = useTranslation("index");

  const [editedID, setEditedID] = categoryStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(true);

  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useQuery(
    ["admin", `id-${editedID}`],
    async () => {
      return await _axios
        .get(`/admin/admins/${editedID}`)
        .then((res) => res.data?.admin);
    },
    {}
  );
  const details = [
    {
      head: t("Name"),
      type: "text",
      placeholder: t("Name"),
      name: "name",
      register: "name",
      error: "name",
      helperText: "name",
      defaultValue: data?.name,
    },
    {
      head: t("Email"),
      type: "email",
      placeholder: t("Email"),
      name: "email",
      register: "email",
      error: "email",
      helperText: "email",
      defaultValue: data?.email,
    },
  ];
  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (input) => {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("_method", "put");

      return _Admin.update({
        editedID,
        formData,
        setOpen,
        setLoading,
      });
    },
    {
      onMutate: async () => {
        await queryClient.prefetchQuery(["admin"]);

        const previousData = queryClient.getQueryData(["admin"]);

        queryClient.setQueryData(["admin", editedID], (oldData) => ({
          ...oldData,
        }));
        setLoading(true);
        return { previousData };
      },
      onError: (error, variables, context) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const { message } = error.response.data;
          Object.keys(message).forEach((field) => {
            const errorMessages = message[field];
            alert(`${field}: ${errorMessages.join(", ")}`);
            window.location.reload();
          });
        } else {
          alert("An error occurred.");
        }
      },
      onSettled: (data, error, variables, context) => {
        if (!error) {
          setOpen(false);
        }

        queryClient.invalidateQueries(["admin"]);
      },
      onSuccess: () => {
        setLoading(false);
        setEditedID(false);
      },
    }
  );

  const handleSubmit1 = async (input) => {
    setLoading(true);
    await mutation.mutateAsync(input);
  };
  return {
    register,
    handleSubmit,
    loading,
    t,
    errors,
    details,
    handleSubmit1,
    handleClose,
    isLoading,
    open,
    data,
  };
};
