
import { _axios } from "../../interceptor/http-config";

const Link = "/home/settings"

export const _Home = {
    index: () => _axios.get(Link).then((res) => res.data?.data),

    post: (data) => _axios.post(Link, data).then((res) => res?.data),

    delete: (id) => _axios.delete(Link+'/' + id).then((res) => res.data),

    update: ({ editedID, formData }) => _axios.post( Link , formData).then((res) => res?.data),
};
