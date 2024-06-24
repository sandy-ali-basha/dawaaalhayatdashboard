
import { _axios } from "../../interceptor/http-config";

export const _Service = {
    index: async ({ query }) => {
        return _axios
            .get(
                `/service?only_trashed=${query ? 1 : 0}`
            )
            .then((res) => res.data);
    },

    post: (data) => _axios.post("/service", data).then((res) => { return res?.data }),

    delete: (id) => _axios.delete('/service/' + id).then((res) => res),

    update: ({ editedID, formData }) =>
        _axios.post('/service/' + editedID, formData).then((res) => res?.data),
};

