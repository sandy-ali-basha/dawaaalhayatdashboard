
import { _axios } from "../../interceptor/http-config";

const Link = "/DashboardAnalytics"

export const _Analytics = {
    index: () => _axios.get(Link).then((res) => res.data),
};
