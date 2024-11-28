import { _axios } from "../../interceptor/http-config";

const Link = "/regions";

export const _Regions = {
  index: () => _axios.get(Link).then((res) => res.data),

  post: (data) => _axios.post(Link, data).then((res) => res?.data),

  delete: (id) => _axios.delete(Link + "/" + id).then((res) => res.data),

  update: ({ editedID, formData }) =>
    _axios.put(Link + "/" + editedID, formData).then((res) => res?.data),
  updateRegionPrice: ({ editedID, formData }) =>
    _axios
      .post(Link + "/" + editedID + "/update-price", formData)
      .then((res) => res?.data),
  Link: ({ editedID, formData }) =>
    _axios
      .post(Link + "/" + editedID + "/update-cities", formData)
      .then((res) => res?.data),
};
