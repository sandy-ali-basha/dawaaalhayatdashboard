import React from "react";
import { Tabs, Tab } from "@mui/material";

const TabsNavigation = ({ tabValue, handleTabChange, sections }) => (
  
  <Tabs
    value={tabValue}
    onChange={handleTabChange}
    variant="scrollable"
    scrollButtons
    sx={{
      width: "70vw",
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

    {Array.isArray(sections) &&
      sections.map((section, index) => (
        <Tab label={section?.type} key={section.id} />
      ))}

  </Tabs>
);

export default TabsNavigation;
