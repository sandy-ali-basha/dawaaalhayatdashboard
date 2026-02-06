import { _axios } from "../../interceptor/http-config";

const Link = "/notifications";

export const _Notifications = {
  index: () => _axios.get(Link).then((res) => res.data),
};
