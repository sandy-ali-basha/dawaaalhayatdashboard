import * as yup from "yup";
const HotelLoginSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "The Password must be of six characters")
    .max(20, "The Password must be of 20 characters"),
  phone: yup.string().required("Phone is required"),
});

export { HotelLoginSchema };
