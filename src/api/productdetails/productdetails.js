import { _axios } from "../../interceptor/http-config";

const Link = "/accordion";

export const _Productdetails = {
  index: ({ id }) =>
    _axios.get("/product/" + id + Link).then((res) => res.data),

  post: (data) => _axios.post(Link, data).then((res) => res?.data),

  delete: (id) => _axios.delete(Link + "/" + id).then((res) => res.data),

  update: ({ editedID, formData }) =>
    _axios.post(Link + "/" + editedID, formData).then((res) => res?.data),
};
