import { _axios as Axios } from "../interceptor/http-config";

const showSnackbar = (enqueueSnackbar, message, variant) => {
  if (typeof message !== "string") {
    console.error("Invalid message passed to showSnackbar:", message);
    return;
  }

  enqueueSnackbar(message, {
    variant,
    autoHideDuration: 4000,
    anchorOrigin: { vertical: "bottom", horizontal: "right" },
  });
};

export const HttpResponseInterceptor = (navigate, enqueueSnackbar) => {
  Axios.interceptors.response.use(function (response) {
    const { code } = response.data;
    const errMessage = response?.data?.error?.message;
    if (response?.status === 404)
      showSnackbar(enqueueSnackbar, errMessage, "warning");
    if (code !== undefined) {
      switch (code) {
        case 200:
          console.log("success");
          break;

        case 422:
          showSnackbar(enqueueSnackbar, errMessage, "error");
          break;

        case 500:
          showSnackbar(enqueueSnackbar, errMessage, "error");
          break;

        case 405:
          Object.keys(errMessage).forEach((key) =>
            showSnackbar(enqueueSnackbar, errMessage[key], "error")
          );
          break;

        case 401:
          navigate("/");
          showSnackbar(enqueueSnackbar, errMessage, "error");
          break;

        case 403:
          navigate("/");
          break;
        // Handle other codes if necessary
        default:
          showSnackbar(
            enqueueSnackbar,
            errMessage || "Unknown response code: " + code,
            "info"
          );
          // showSnackbar(enqueueSnackbar, response.data, "info");

          break;
      }
    } else {
      switch (response?.config?.method) {
        case "post":
          showSnackbar(enqueueSnackbar, response.data.error.message, "success");
          break;
        case "put":
          showSnackbar(enqueueSnackbar, "Updated", "success");
          break;
        case "patch":
          showSnackbar(enqueueSnackbar, response.data.error.message, "success");
          break;
        case "delete":
          showSnackbar(enqueueSnackbar, "Deleted", "success");
          break;
        default:
          break;
      }
    }

    return response;
  });
};
