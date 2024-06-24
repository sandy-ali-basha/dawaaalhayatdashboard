import { _axios } from "interceptor/http-config";

export const _AuthApi = {
  login: (data) => {
    return _axios
      .post("/login", data)
      // .then((res) => console.log(res));
      .then((res) => _AuthApi.storeToken(res?.data?.data?.token));
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
      .post("/resetPassword", data)
      .then((res) => console.log("done"));
  },
  verifyCode: (data) => {
    return _axios
      .post("/checkCode", data)
      .then((res) => console.log("done"));
  },
  passEdit: (data) => {
    return _axios
      .post("/editPassword", data)
      .then((res) => console.log("done"));
  },
};
