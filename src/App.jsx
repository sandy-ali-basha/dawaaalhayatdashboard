import React, { useEffect } from "react";
import "./App.css";
import AppRouting from "./AppRouting";
import { Box } from "@mui/material";
import { HttpResponseInterceptor } from "interceptor/http-response.interceptor";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function App() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    HttpRequestInterceptor();
    HttpResponseInterceptor(navigate, enqueueSnackbar);
  }, []);

  return (
    <Box color="background.main">
      <AppRouting />
    </Box>
  );
}

export default App;