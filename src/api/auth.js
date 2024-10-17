import { _axios } from "interceptor/http-config";

export const _AuthApi = {
  login: (data) => {
    return _axios.post("/admin/login", data).then((res) => {
      _AuthApi.storeToken(res?.data?.data?.token);
      return res;
    });
  },

  storeToken: (access_token) => {
    localStorage.setItem("access_token", access_token);
  },

  getToken: () => localStorage.getItem("access_token"),

  destroyToken: () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  },

  resetPass: (data) => {
    return _axios
      .post("/admin/resetPassword", data)
      .then((res) => console.log("done"));
  },
  verifyCode: (data) => {
    return _axios.post("/admin/checkCode", data).then((res) => console.log("done"));
  },
  passEdit: (data) => {
    return _axios
      .post("/admin/editPassword", data)
      .then((res) => console.log("done"));
  },
};
