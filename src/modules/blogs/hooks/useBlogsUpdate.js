import { useState } from "react";
import { categoryStore } from "store/categoryStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { schema } from "../validation/validetaionUpdate";
import { _BlogsApi } from "api/blogs/blogs";

export const useBlogsUpdate = () => {
  const { t } = useTranslation("index");

  const [editedID, setEditedID] = categoryStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = { resolver: yupResolver(schema) };
  const { register, handleSubmit, formState, setValue, control } =
    useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [NewImage, setNewImage] = useState([]);
  const [image, setimage] = useState(null);
  const [Newimage, setNewimage] = useState(null);
  const handleimage = (e) => {
    if (e.target.files.length > 0) {
      setimage(e.target.files[0]);
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewimage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const { data, isLoading } = useQuery(
    ["blog", `id-${editedID}`],
    async () => {
      return await _axios
        .get(`/admin/blog/${editedID}`)
        .then((res) => res.data?.blogs);
    },
    {}
  );
  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };
  const handleImages = (event) => {
    setImages([]);

    if (event.target.files.length > 0) {
      setImages((pre) => [...pre, ...Array.from(event.target.files)]);
    }

    const files = event.target.files;
    if (files.length > 0) {
      const newImages = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result);
          if (newImages.length === files.length) {
            setNewImage(newImages);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (input) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("title_en", input.title_en);
      formData.append("title_ar", input.title_ar);
      formData.append("content_en", input.content_en);
      formData.append("content_ar", input.content_ar);

      if (image !== null) {
        formData.append("cover", image);
      }
      if (images.length > 0) {
        images.map((item, index) => formData.append(`images[${index}]`, item));
      }

      formData.append("_method", "put");
      return _BlogsApi.update({
        editedID,
        formData,
        setOpen,
        setLoading,
      });
    },
    {
      onMutate: async () => {
        await queryClient.prefetchQuery(["blog"]);

        const previousData = queryClient.getQueryData(["blog"]);

        queryClient.setQueryData(["blog", editedID], (oldData) => ({
          ...oldData,
        }));
        setLoading(true);
        return { previousData };
      },

      onSettled: (error) => {
        if (!error) {
          setOpen(false);
        }

        queryClient.invalidateQueries(["blog"]);
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
  const details = [
    {
      head: t("Title Arabic"),
      type: "text",
      placeholder: t("Title Arabic"),
      name: "title_ar",
      register: "title_ar",
      error: "title_ar",
      helperText: "title_ar",
      defaultValue: data?.translations[0]?.title,
    },
    {
      head: t("Title English"),
      type: "text",
      placeholder: t("Title English"),
      name: "title_en",
      register: "title_en",
      error: "title_en",
      helperText: "title_en",
      defaultValue: data?.translations[1]?.title,
    },
    {
      head: t("Content Arabic"),
      type: "text",
      placeholder: t("Content Arabic"),
      name: "content_ar",
      register: "content_ar",
      error: "content_ar",
      helperText: "content_ar",
      defaultValue: data?.translations[0].content,
    },
    {
      head: t("Content English"),
      type: "text",
      placeholder: t("Content English"),
      name: "content_en",
      register: "content_en",
      error: "content_en",
      helperText: "content_en",
      defaultValue: data?.translations[1].content,
    },
  ];
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
    handleimage,
    handleImages,
    NewImage,
    Newimage,
    setValue,
    control,
  };
};
