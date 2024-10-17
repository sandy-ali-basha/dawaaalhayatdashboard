import { _axios } from "../../interceptor/http-config";
const Link = "/product_attributes_values/attribute";

export const _Product_attributes_values = {
  index: ({ id }) =>
    _axios
      .get(`${"product_attributes_values/attribute"}/${id}?all=true`)
      .then((res) => res.data),

  post: (data) =>
    _axios.post("product_attributes_values", data).then((res) => res?.data),

  delete: (id) =>
    _axios.delete("product_attributes_values/" + id).then((res) => res.data),

  update: ({ editedID, formData }) =>
    _axios
      .post("product_attributes_values/" + editedID, formData)
      .then((res) => res?.data),
};
