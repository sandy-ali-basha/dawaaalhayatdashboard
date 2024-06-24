import * as React from "react";
import Box from "@mui/material/Box";

import { IconButton, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { _AuthApi } from "api/auth";
import { useTranslation } from "react-i18next";

import LogoutIcon from "@mui/icons-material/Logout";
import { settingsStore } from "store/settingsStore";
const SettingsMenu = ({ open, hoverd }) => {
  const { t } = useTranslation("settingMenu");

  const [mode] = settingsStore((state) => [state.setMode, state.mode]);
  const [direction] = settingsStore((state) => [
    state.direction,
    state.setDirection,
  ])

  const logOut = (input) => {
    _AuthApi.destroyToken(input)
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "110px",
          justifyContent: "space-around",
        }}
      >
        <IconButton
          onClick={logOut}
          sx={{
            color: "darkGray.main",
          }}
        >
          <Tooltip title={direction === "ltr" ? t("Logout") : t("تسجيل خروج")}>
            {mode === "dark" ? (
              <LogoutIcon></LogoutIcon>
            ) : (
              <LogoutIcon></LogoutIcon>
            )}
          </Tooltip>
        </IconButton>
        <Typography
          variant="body1"
          sx={{
            textDecoration: "none",
            opacity: open || hoverd ? 1 : 0,

            color: "text.main",
          }}
        >
          {t("Logout")}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(SettingsMenu);
