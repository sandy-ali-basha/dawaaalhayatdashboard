import React, { useEffect } from "react";
import "./App.css";
import AppRouting from "./AppRouting";
import { Box } from "@mui/material";
import { HttpResponseInterceptor } from "interceptor/http-response.interceptor";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    HttpRequestInterceptor();
    HttpResponseInterceptor(navigate, enqueueSnackbar);
  }, [enqueueSnackbar, navigate]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "page_view",
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href,
      is_dashboard_page: location.pathname.toLowerCase().startsWith("/dashboard"),
    });
  }, [location.pathname]);


  return (
    <Box color="background.main">
      <AppRouting />
    </Box>
  );
}

export default App;