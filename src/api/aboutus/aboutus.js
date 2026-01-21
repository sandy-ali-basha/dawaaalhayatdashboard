
import { _axios } from "../../interceptor/http-config";

const Link = "/about"

export const _Aboutus = {
    index: () => _axios.get(Link).then((res) => res.data),
    AddPartner: (data) => _axios.post(Link + "/partners", data).then((res) => res.data),
    partners: () => _axios.get(Link + "/partners").then((res) => res.data),

    post: (data) => _axios.put(Link, data).then((res) => res?.data),

    delete: (id) => _axios.delete(Link+'/' + id).then((res) => res.data),

    update: ({ editedID, formData }) => _axios.post( Link +'/' + editedID, formData).then((res) => res?.data),
};
