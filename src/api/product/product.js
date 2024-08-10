import { _axios } from "../../interceptor/http-config";

const Link = "/product";

export const _Product = {
  index: () => _axios.get(Link).then((res) => res.data),

  post: (data) => _axios.post(Link, data).then((res) => res?.data),

  delete: (id) => _axios.delete(Link + "/" + id).then((res) => res.data),

  update: ({ editedID, formData }) =>
    _axios.post(Link + "/" + editedID, formData).then((res) => res?.data),

  AddImages: ({ editedID, formData }) =>
    _axios.post(Link + "/image/" + editedID, formData).then((res) => res?.data),
  AddImagesSlider: ({ editedID, formData }) =>
    _axios.post(Link + "/slider/" + editedID, formData).then((res) => res?.data),
  attribute: ({ editedID, formData }) =>
    _axios.post("/attribute/" + editedID, formData).then((res) => res?.data),
  addDetails: ({ editedID, formData }) =>
    _axios.post("/accordion/" + editedID, formData).then((res) => res?.data),
};
