
import { _axios } from "../../interceptor/http-config";

const Link = "/contact_info"

export const _Contactus = {
    index: () => _axios.get(Link).then((res) => res.data),

    post: (data) => _axios.put(Link, data).then((res) => res?.data),

    delete: (id) => _axios.delete(Link+'/' + id).then((res) => res.data),

    update: ({ editedID, formData }) => _axios.put( Link +'/' + editedID, formData).then((res) => res?.data),
};
