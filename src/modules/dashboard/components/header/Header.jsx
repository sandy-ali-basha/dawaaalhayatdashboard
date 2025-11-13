import { Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import React from "react";
import { AppBar } from "../styled/AppBar";
import SettingsMenu from "./SettingsMenu";
import { settingsStore } from "store/settingsStore";
import Notifications from "../Notifications";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const Header = ({ open }) => {
  const [setMode, mode] = settingsStore((state) => [state.setMode, state.mode]);

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
          <IconButton
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            sx={{
              color: "darkGray.main",
            }}
          >
            <Tooltip title={mode === "dark" ? "light mode" : "dark mode"}>
              {mode === "dark" ? (
                <LightModeOutlined sx={{ color: "text.main" }} />
              ) : (
                <DarkModeOutlined sx={{ color: "text.main" }} />
              )}
            </Tooltip>
          </IconButton>
          <Notifications />
          <SettingsMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
