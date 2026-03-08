import React, { useEffect } from "react";
import "./App.css";
import AppRouting from "./AppRouting";
import { Box } from "@mui/material";
import { HttpResponseInterceptor } from "interceptor/http-response.interceptor";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { registerDeviceTokenIfNeeded, saveDeviceToken } from "services/notificationDeviceToken";
import { initPushToken } from "services/pushToken";

function App() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    HttpRequestInterceptor();
    HttpResponseInterceptor(navigate, enqueueSnackbar);

    const run = async () => {
      const token = await initPushToken();
      if (token) {
        saveDeviceToken(token);
        await registerDeviceTokenIfNeeded();
      }
    };

    run().catch(console.error);
  }, [enqueueSnackbar, navigate]);

  return (
    <Box color="background.main">
      <AppRouting />
    </Box>
  );
}

export default App;