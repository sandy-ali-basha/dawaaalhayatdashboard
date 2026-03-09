import { _axios } from "interceptor/http-config";

const cleanupSession = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
  localStorage.removeItem("registered_device_token");
  window.location.reload();
};

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
    const deviceToken = localStorage.getItem("device_token");

    if (!deviceToken) {
      cleanupSession();
      return;
    }

    _axios
      .delete("/notifications/device-token", { data: { token: deviceToken } })
      .catch(() => {
        // Best-effort cleanup; session should still be cleared on failures.
      })
      .finally(() => {
        cleanupSession();
      });
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
