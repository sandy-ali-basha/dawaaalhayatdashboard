import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import SideBar from "./components/sideBard/SideBar";

export const drawerWidth = 270;

const DashboardComponent = () => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
    setMobileOpen(false);
  }, [isMobile]);

  const handleMobileToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "background.main",
        minHeight: "100vh",
      }}
    >
      <Header open={open} isMobile={isMobile} onOpenMobile={handleMobileToggle} />
      <SideBar
        open={open}
        setOpen={setOpen}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onCloseMobile={handleMobileClose}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, minWidth: 0, width: "100%", overflowX: "auto", p: { xs: 2, md: 3 } }}
      >
        <Box sx={{ marginTop: { xs: "56px", md: "50px" }, minWidth: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardComponent;
