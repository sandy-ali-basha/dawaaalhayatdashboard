import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _BlogsApi = {
  index: async ({ query, page, count = 10 }) => {
    return _axios
      .get(
        `/blog?page=${page}&count=${count}${
          query !== "" ? `&value=${query}` : ""
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
    _axios.post("/blog", data).then((res) => {
      setLoading(true);
      navigate(-1);
    }),
  delete: (id) => _axios.delete(`/blog/${id}`).then((res) => res.data),

  update: ({ editedID, formData, setLoading, setOpen }) =>
    _axios.post(`/blog/${editedID}`, formData).then((res) => {
      setLoading(false);
      setOpen(false);
    }),
};
