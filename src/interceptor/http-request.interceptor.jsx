import { _AuthApi } from "api/auth";
import { _axios as Axios } from "./http-config";

export const HttpRequestInterceptor = () => {
  Axios.interceptors.request.use(
    function (request) {
      // Do something before request is sent
      const access_token = _AuthApi.getToken();
      if (request.headers) {
        request.headers.Authorization = access_token
          ? `Bearer ${access_token}`
          : "";
        request.headers.Accept = "application/json";

        request.headers.locale =  ["en", "ar", "kr"].includes(
          localStorage.getItem("i18nextLng")
        )
          ? localStorage.getItem("i18nextLng")
          : "en";
      }

      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
