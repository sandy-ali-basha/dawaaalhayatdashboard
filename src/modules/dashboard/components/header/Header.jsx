import { Box, IconButton, Toolbar, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { AppBar } from "../styled/AppBar";
import SettingsMenu from "./SettingsMenu";
import { settingsStore } from "store/settingsStore";
import Notifications from "../Notifications";
import { DarkModeOutlined, LightModeOutlined, Menu } from "@mui/icons-material";

const Header = ({ open, isMobile, onOpenMobile }) => {
  const [setMode, mode] = settingsStore((state) => [state.setMode, state.mode]);
  const theme = useTheme();
  const isMobileViewport = useMediaQuery(theme.breakpoints.down("md"));
  const showMobileToggle = isMobile ?? isMobileViewport;

  return (
    <AppBar position="fixed" open={open} ismobile={showMobileToggle ? "true" : ""}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          {showMobileToggle && (
            <IconButton
              onClick={onOpenMobile}
              sx={{ color: "text.main" }}
              aria-label="open navigation"
            >
              <Menu />
            </IconButton>
          )}
        </Box>
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
