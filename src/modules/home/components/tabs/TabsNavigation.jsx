import React from "react";
import { Tabs, Tab } from "@mui/material";

const TabsNavigation = ({ tabValue, handleTabChange }) => (
  <Tabs
    value={tabValue}
    onChange={handleTabChange}
    variant="scrollable"
    scrollButtons
    sx={{
      "& .MuiTabs-scrollButtons": {
        color: "text.main",
        "&.Mui-disabled": { opacity: 0.3 },
      },
    }}
  >
    <Tab label="Slides" />
    <Tab label="Status Section" />
    <Tab label="Call To Action" />
    <Tab label="Text Section One" />
    <Tab label="Text Section Two" />
    <Tab label="Video Section" />
    <Tab label="Grid" />
    <Tab label="Parallax" />
    <Tab label="Social" />
  </Tabs>
);

export default TabsNavigation;
