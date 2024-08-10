import { _axios } from "../../interceptor/http-config";

const Link = "/brand_pages";

export const _Brand_pages = {
  index: () => _axios.get(Link).then((res) => res.data),

  post: (data) => _axios.post(Link, data).then((res) => res?.data),
  slides: (data) =>
    _axios.post(Link + "/slides", data).then((res) => res?.data),

  delete: (id) => _axios.delete(Link + "/" + id).then((res) => res.data),

  update: ({ editedID, formData }) =>
    _axios.post(Link + "/" + editedID, formData).then((res) => res?.data),
};
