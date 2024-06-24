import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validation/validation";
import { _BlogsApi } from "api/blogs/blogs";

export const useBlogsCreate = () => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const [Coverimage, setCoverImage] = useState("");
  const [images, setImages] = useState([]);
  const [NewImage, setNewImage] = useState([]);
  const contentEnRef = useRef(null);
  const contentArRef = useRef(null);
  const mode = localStorage.getItem("mode");

  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(schema) };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm(formOptions);
  const { mutate } = useMutation((data) => createPost(data));
  const conver2base64 = (file) => {
    if (!file) {
      setCoverImage(null);
      setValue("image", "");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result.toString());
      setValue("image", reader.result.toString());
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (watch("files")) {
      conver2base64(watch("files")[0]);
    } else {
      setCoverImage(null);
    }
  }, [watch("files")]);

  async function createPost(data) {
    await axios;
    _BlogsApi
      .post(data, setLoading, navigate)
      .then(setLoading(true))
      .finally(() => setLoading(false));
  }

  const details = [
    {
      head: t("Title English"),
      type: "text",
      placeholder: t("Title English"),
      name: "title_en",
      register: "title_en",
      error: "title_en",
      helperText: "title_en",
    },
    {
      head: t("Title Arabic"),
      type: "text",
      placeholder: t("Title Arabic"),
      name: "title_ar",
      register: "title_ar",
      error: "title_ar",
      helperText: "title_ar",
    },
    {
      head: t("Alt"),
      type: "text",
      placeholder: t("Alt"),
      name: "alt",
      register: "alt",
      error: "alt",
      helperText: "alt",
    },
    {
      head: t("Read Time"),
      type: "number",
      placeholder: t("Read Time"),
      name: "read_time",
      register: "read_time",
      error: "read_time",
      helperText: "read_time",
    },
  ];
  //images

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

  const hanldeCreate = (input) => {
    const formData = new FormData();

    formData.append("title_en", input.title_en);
    formData.append("title_ar", input.title_ar);
    formData.append("read_time", input.read_time);
    formData.append("alt", input.alt);
    formData.append(
      "content_ar",
      contentArRef.current?.getEditor().root.innerHTML
    );
    formData.append(
      "content_en",
      contentEnRef.current?.getEditor().root.innerHTML
    );
    formData.append("cover", input.files[0]);
    if (images.length > 0) {
      images.map((item, index) => formData.append(`images[${index}]`, item));
    }

    mutate(formData);
    setLoading(true);
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, true] }],

      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  return {
    t,
    mode,
    watch,
    errors,
    details,
    formats,
    modules,
    loading,
    control,
    register,
    NewImage,
    Coverimage,
    contentEnRef,
    contentArRef,
    hanldeCreate,
    handleSubmit,
    handleImages,
  };
};
