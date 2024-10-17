import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _Admin = {
  index: async ({ query, page, count = 10 }) => {
    return _axios
      .get(`/admin`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  post: (data, setLoading) =>
    _axios.post("/admin", data).then((res) => {
      setLoading(true);
      return res;
    }),
  delete: (id) => _axios.delete(`/admin/${id}`).then((res) => res.data),

  update: ({ editedID, data }) =>
    _axios
      .put(`/admin/${editedID}`, data) // Changed to PUT and correctly passing 'data'
      .then((res) => {
        return res;
      }),
};
