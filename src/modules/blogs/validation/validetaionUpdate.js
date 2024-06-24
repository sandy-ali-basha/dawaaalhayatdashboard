import * as yup from "yup";

export let schema = yup.object().shape({
  title_en: yup.string().required("Title English  is required"),
  title_ar: yup.string().required("Title Arabic  is required"),
  content_en: yup.string().required("Content English is required"),
  content_ar: yup.string().required("Content English is required"),
});
