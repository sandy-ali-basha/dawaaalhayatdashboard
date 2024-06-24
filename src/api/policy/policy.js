
import { _axios } from "../../interceptor/http-config";

const Link = "/policy"

export const _policy = {

    index: () => _axios.get(Link).then((res) => res.data),

    post: (data) => _axios.post(Link, data).then((res) => res?.data),

    delete: () => _axios.delete(Link).then((res) => res.data),

    update: ({ editedID, formData }) => _axios.post(Link + '/' + editedID, formData).then((res) => res?.data),

};
