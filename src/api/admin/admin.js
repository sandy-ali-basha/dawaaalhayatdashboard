import { _axios } from "../../interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _Admin = {
  index: async ({ query, page, count = 10 }) => {
    return _axios
      .get(
        `/admins?page=${page}&count=${count}${query !== "" ? `&value=${query}` : ""
        }`,
        {
          headers: {
            ...HttpRequestInterceptor(),
          },
        }
      )
      .then((res) => res.data);
  },
  post: (data, setLoading, navigate) =>
    _axios.post("/admins", data).then((res) => {
      setLoading(true);
      navigate(-1);
    }),
  delete: (id) => _axios.delete(`/admins/${id}`).then((res) => res.data),

  update: ({ editedID, formData, loading, setLoading, setOpen }) =>
    _axios.post(`/admins/${editedID}`, formData).then((res) => {
      setLoading(false);
      setOpen(false);
    }),
};
