import { Box } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import SideBar from "./components/sideBard/SideBar";

export const drawerWidth = 270;

const DashboardComponent = () => {
  const [open, setOpen] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "background.main",
        minHeight: "100vh",
      }}
    >
      <Header open={open} />
      <SideBar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ marginTop: "50px" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardComponent;
