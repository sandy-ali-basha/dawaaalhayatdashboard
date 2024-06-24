
import { _axios } from "../../interceptor/http-config";

export const _Subservices = {
    index: async ({ id, query }) => {
        return _axios
            .get(
                `/sub-service?service_id=${id}&only_trashed=${query ? '1' : '0'}`
            )
            .then((res) => res.data);
    },

    post: (data, setLoading, navigate) =>
        _axios.post("/sub-service", data).then((res) => res?.data),

    delete: (id) => _axios.delete('/sub-service/' + id).then((res) => res.data),

    update: ({ editedID, formData, loading, setLoading, setOpen }) =>
        _axios.post('/sub-service/' + editedID, formData).then((res) => res?.data),
};
