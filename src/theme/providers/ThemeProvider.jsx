import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { settingsStore } from "../../store/settingsStore";
import { createTheme } from "../index";
import { GlobalStyle } from "../globalStyle";

export const ThemeProviderWraper = ({ children }) => {
  const [direction, mode, responsiveFontSizes] = settingsStore((state) => [
    state.direction,
    state.mode,
    state.responsiveFontSizes,
  ]);

  const theme = createTheme({ direction, mode, responsiveFontSizes });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
