import { Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import React from "react";
import { AppBar } from "../styled/AppBar";
import SettingsMenu from "./SettingsMenu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import Qatar from "assets/icons/qatar.png";
import Uk from "assets/icons/uk.png";

const Header = ({ open }) => {
  const { i18n, t } = useTranslation("header");

  const [setMode, mode] = settingsStore((state) => [state.setMode, state.mode]);
  const [direction, setDirection] = settingsStore((state) => [
    state.direction,
    state.setDirection,
  ]);

  const toggleLang = () => {
    setDirection(direction === "ltr" ? "rtl" : "ltr");
    i18n.changeLanguage(direction === "ltr" ? "ar" : "en");
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box></Box>
        <Box
          sx={{
            display: "flex",
            columnGap: "10px",
            marginRight: "20px",
          }}
        >
          {/* <IconButton sx={{ width: "39px" }} onClick={toggleLang}>
            <Tooltip
              title={
                direction === "ltr"
                  ? t("arabic language")
                  : t("english language")
              }
            >
              {direction === "ltr" ? (
                <img src={Qatar} width="100%" alt="AR" />
              ) : (
                <img src={Uk} width="100%" alt="UK" />
              )}
            </Tooltip>
          </IconButton> */}
          <IconButton
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            sx={{
              color: "darkGray.main",
            }}
          >
            <Tooltip title={mode === "dark" ? "light mode" : "dark mode"}>
              {mode === "dark" ? <LightModeIcon sx={{color:"text.main"}}/> : <DarkModeIcon sx={{color:"text.main"}}/>}
            </Tooltip>
          </IconButton>
          {/* <IconButton>
            <NotificationsRoundedIcon sx={{ color: "darkGray.main" }} />
          </IconButton> */}
          <SettingsMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
