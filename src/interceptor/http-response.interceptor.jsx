import { _axios as Axios } from "../interceptor/http-config";

const showSnackbar = (enqueueSnackbar, message, variant) => {
  if (typeof message !== "string" || !message.trim()) return;

  enqueueSnackbar(message, {
    variant,
    autoHideDuration: 4000,
    anchorOrigin: { vertical: "bottom", horizontal: "right" },
  });
};

const extractMessage = (response) => {
  return (
    response?.data?.message ||
    response?.data?.error?.message ||
    response?.data?.data?.message ||
    "Operation completed"
  );
};

export const HttpResponseInterceptor = (navigate, enqueueSnackbar) => {
  Axios.interceptors.response.use(
    function (response) {
      const { code } = response.data || {};
      const message = extractMessage(response);

      if (response?.status === 404) {
        showSnackbar(enqueueSnackbar, message, "warning");
      }

      if (code !== undefined) {
        switch (code) {
          case 200:
            break;
          case 422:
          case 500:
            showSnackbar(enqueueSnackbar, message, "error");
            break;
          case 405: {
            const errMessage = response?.data?.error?.message;
            if (errMessage && typeof errMessage === "object") {
              Object.keys(errMessage).forEach((key) =>
                showSnackbar(enqueueSnackbar, String(errMessage[key]), "error")
              );
            } else {
              showSnackbar(enqueueSnackbar, message, "error");
            }
            break;
          }
          case 401:
            navigate("/");
            showSnackbar(enqueueSnackbar, message, "error");
            break;
          case 403:
            navigate("/");
            break;
          default:
            showSnackbar(enqueueSnackbar, message || `Unknown response code: ${code}`, "info");
            break;
        }
      } else {
        switch (response?.config?.method) {
          case "post":
            showSnackbar(enqueueSnackbar, message, "success");
            break;
          case "put":
            showSnackbar(enqueueSnackbar, message || "Updated", "success");
            break;
          case "patch":
            showSnackbar(enqueueSnackbar, message, "success");
            break;
          case "delete":
            showSnackbar(enqueueSnackbar, message || "Deleted", "success");
            break;
          default:
            break;
        }
      }

      return response;
    },
    function (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error?.message ||
        error?.message ||
        "Request failed";

      if (error?.response?.status === 401) {
        navigate("/");
      }

      showSnackbar(enqueueSnackbar, String(message), "error");
      return Promise.reject(error);
    }
  );
};
