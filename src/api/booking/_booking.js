
import { _axios } from "../../interceptor/http-config";
const Link = "admin/booking"

export const _booking = {
    index: async () => {
        return _axios
            .get(
                Link
            )
            .then((res) => res.data);
    },

    post: (data) => _axios.post(Link, data).then((res) => { return res?.data }),

    delete: (id) => _axios.delete(`${Link}/` + id).then((res) => res),

    update: ({ editedID, formData }) =>
        _axios.post(`${Link}/` + editedID, formData).then((res) => res?.data),
};

