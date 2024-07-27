import { _axios } from "../../interceptor/http-config";

const Link = "/product_options/value";

export const _Product_medicalForm = {
  index: (id) => _axios.get(Link + "/" + id).then((res) => res.data),
  post: (data, id) => _axios.post(Link + "/" + id, data).then((res) => res?.data),
  delete: (id) => _axios.delete(Link + "/" + id).then((res) => res.data),
};
