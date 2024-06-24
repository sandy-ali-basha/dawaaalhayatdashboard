import * as yup from "yup";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 1000000;
export let schema = yup.object().shape({
  title_en: yup.string().required("Title English  is required"),
  title_ar: yup.string().required("Title Arabic  is required"),

  alt: yup.string().required("Alt is required"),
  read_time: yup.string().required("Read Time is required"),

  files: yup
    .mixed()
    .test(
      "required",
      "File size is required and must be less than 4MB",
      (value) => {
        return value && value.length;
      }
    ),
  images: yup
    .mixed()
    .test("File", "image is required", (value) => {
      return value?.length > 0;
    })
    .test("files", "", function (value) {
      let isValid = true;
      let errors = [];
      if (value) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].size > MAX_FILE_SIZE) {
            isValid = false;
            errors.push(`${value[i].name} is too large. / `);
          }
          if (!SUPPORTED_FORMATS.includes(value[i].type)) {
            isValid = false;
            errors.push(`Unsupported format for ${value[i].name}. / `);
          }
        }
      }
      return (
        isValid ||
        this.createError({ message: errors.join(", "), path: this.path })
      );
    }),
});
