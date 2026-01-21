
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
  updateSlide: (id, data) =>
    _axios.post(`/home/slides/update/${id}`, data).then((res) => res.data),
  updateOrder: (id, data) =>
    _axios.post(`/home/order/update/${id}`, data).then((res) => res.data),
  getSortableSections: () =>
    _axios.get("home/tabs").then((res) => res.data?.data),

  // items
    getSection: ({ id }) =>
      _axios.get("home_page/section/" + id).then((res) => res.data?.data),
  getAllSections: () =>
    _axios.get("home_page/sections").then((res) => res.data?.data),
  postItem: (data) =>
    _axios.post("home_page/item", data).then((res) => res?.data),
  deleteItem: (id) =>
    _axios.delete("home_page/item/delete/" + id).then((res) => res.data),
  updateItem: ({ editedID, formData }) =>
    _axios
      .post("home_page/item/update/" + editedID, formData)
      .then((res) => res?.data),
  reorderSections: ({ sections }) =>
    _axios
      .post("home_page/reorder", sections)
      .then((res) => res?.data),
};
