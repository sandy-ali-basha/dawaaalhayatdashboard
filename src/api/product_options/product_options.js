import { _axios } from "../../interceptor/http-config";

const Link = "/product_options";

export const _Product_options = {
  flavors: () => _axios.get(Link + "/value/10").then((res) => res.data),
  packings: () => _axios.get(Link + "/value/11").then((res) => res.data),
  //FLAVOR ID IS 10 IN DATABASE
  AddFlavor: (data) =>
    _axios.post("/product_options/value/10", data).then((res) => res?.data),
  // PACKING IS 11
  AddPacking: (data) =>
    _axios.post("/product_options/value/11", data).then((res) => res?.data),
};
