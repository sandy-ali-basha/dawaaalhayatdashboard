import { _axios } from "../../interceptor/http-config";

const Link = "/notifications";

export const _Notifications = {
  index: () => _axios.get(Link).then((res) => res.data),
  unreadCount: () =>
    _axios.get(`${Link}/unread-count`).then((res) => res.data),
  markRead: (id) => _axios.post(`${Link}/${id}/read`).then((res) => res.data),
  markAllRead: () => _axios.patch(`${Link}/read`).then((res) => res.data),
};
