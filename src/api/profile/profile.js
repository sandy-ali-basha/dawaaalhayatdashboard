
import { _axios } from "../../interceptor/http-config";

export const _Profile = {
    index: async () => {
        return _axios
            .get(
                '/profile'
            )
            .then((res) => res.data);
    },

    changePassword: ({ formData }) =>
        _axios.post('/profile/change-password', formData).then((res) => res.data),
};

