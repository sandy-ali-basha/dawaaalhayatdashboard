import { _axios } from "../../interceptor/http-config";

const Link = "/product";

export const _Product = {
  index: () => _axios.get(Link).then((res) => res.data),

  post: (data) => _axios.post(Link, data).then((res) => res?.data),

  Duple: (id) =>
    _axios.post(`${Link}s/${id}/duplicate`).then((res) => res?.data),
  BulkDel: (data) =>
    _axios.post(Link + "s/bulk-delete", data).then((res) => res?.data),

  delete: (id) => _axios.delete(Link + "/" + id).then((res) => res.data),
  
  update: ({ editedID, formData }) =>
    _axios.post(Link + "/" + editedID, formData).then((res) => res?.data),

  deleteVariant: (id) => _axios.delete(Link + "/variants/" + id).then((res) => res.data),
  updateVariant: ({ id, formData }) =>
    _axios
      .post(Link + "/variants/" + id, formData)
      .then((res) => res?.data),
      
  createVariant: ({ product_id, formData }) =>
    _axios
      .post(Link + "/updatevariants/" + product_id, formData)
      .then((res) => res?.data),

  updatePurshasable: ({ editedID, formData }) =>
    _axios
      .post(Link + "/" + editedID + "/purchasable", formData)
      .then((res) => res?.data),

  AddImages: ({ editedID, formData }) =>
    _axios.post(Link + "/image/" + editedID, formData).then((res) => res?.data),
  AddImagesSlider: ({ editedID, formData }) =>
    _axios
      .post(Link + "/slider/" + editedID, formData)
      .then((res) => res?.data),
  attribute: ({ editedID, formData }) =>
    _axios.post("/attribute/" + editedID, formData).then((res) => res?.data),
  addDetails: ({ editedID, formData }) =>
    _axios.post("/accordion/" + editedID, formData).then((res) => res?.data),
  //FLAVOR ID IS 10 IN DATABASE
  flavors: () => _axios.get("/product_options/value/10").then((res) => res.data),
  AddFlavor: (data) =>
    _axios.post("/product_options/value/10", data).then((res) => res?.data),
// PACKING IS 11
  packings: () => _axios.get("/product_options/value/11").then((res) => res.data),
  AddPacking: (data) =>
    _axios.post("/product_options/value/11", data).then((res) => res?.data),
};
