import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProviderWraper } from "./theme/providers/ThemeProvider";
import { RTLProvider } from "./theme/providers/RTLProvider";
import "./I18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Suspense fallback="Loading">
      <RTLProvider>
        <ThemeProviderWraper>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </ThemeProviderWraper>
      </RTLProvider>
    </Suspense>
  </BrowserRouter>
);
