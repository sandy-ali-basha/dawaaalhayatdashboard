import { _axios } from "../../interceptor/http-config";

const Link = "/home";

export const _Home = {
  index: () =>
    _axios
      .get(Link + "/settings", {
        headers: {
          translations: "true",
        },
      })
      .then((res) => res.data?.data),
  getSlides: () =>
    _axios
      .get(Link + "/slides", {
        headers: {
          translations: "true",
        },
      })
      .then((res) => res.data?.data),

  post: (data) => _axios.post(Link, data).then((res) => res?.data),

  delete: (id) => _axios.delete(Link + "/" + id).then((res) => res.data),

  update: ({ editedID, formData }) =>
    _axios.post(Link + "/settings", formData).then((res) => res?.data),

  slides: (data) =>
    _axios.post(Link + "/slides/add", data).then((res) => res?.data),
  deleteSlide: (id) =>
    _axios.delete("/home/slides/delete/" + id).then((res) => res.data),
};
