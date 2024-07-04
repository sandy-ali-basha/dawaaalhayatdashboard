import React, { useState } from "react";
import { Drawer } from "../styled/Drawer";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBarHeader from "./SideBarHeader";
import SideBarLink from "./SideBarLink";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import {
  BookOnline,
  Image,
  InsertEmoticonTwoTone,
  Reviews,
  Security,
  Settings,
  WorkOutlineTwoTone,
} from "@mui/icons-material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import GavelIcon from "@mui/icons-material/Gavel";

const SideBar = ({ open, setOpen }) => {
  const { t } = useTranslation("sidebar");
  const [hoverd, setHoverd] = useState(false);

  const handleMouseEnter = () => {
    setHoverd(true);
  };
  const handleMouseLeave = () => {
    setHoverd(false);
  };

  const links = [
    {
      name: t("Admin"),
      link: "/dashboard/admin",
      icon: <AdminPanelSettingsTwoToneIcon />,
    },

    // {
    //   name: t("Profile"),
    //   link: "/dashboard/profile",
    //   icon: <PeopleAltTwoToneIcon />,
    // },
    // {
    //   name: t("hero image"),
    //   link: "/dashboard/heroImage",
    //   icon: <Image />,
    // },
    {
      name: t("terms"),
      link: "/dashboard/terms",
      icon: <GavelIcon />,
    },
    // {
    //   name: t("policy"),
    //   link: "/dashboard/policy",
    //   icon: <Security />,
    // },

    // {
    //   name: t("transaction"),
    //   link: "/dashboard/transaction",
    //   icon: <ReceiptIcon />,
    // },
    // {
    //   name: t("review"),
    //   link: "/dashboard/review",
    //   icon: <Reviews />,
    // },
    {
      name: t("Careers"),
      link: "/dashboard/careers",
      icon: <WorkOutlineTwoTone />,
    },
    { 
      name: t("Careers Categories"),
      link: "/dashboard/careersCategory",
      icon: <WorkOutlineTwoTone />,
    },
    { 
      name: t("Products"),
      link: "/dashboard/products",
      icon: <WorkOutlineTwoTone />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      hoverd={hoverd ? "true" : ""}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        "& .MuiDrawer-paper": {
          boxShadow: "0px 4px 18px 0px rgba(47, 43, 61, 0.1)",
          borderRight: "none",
        },
      }}
    >
      <SideBarHeader
        open={open}
        setOpen={setOpen}
        hoverd={hoverd ? "true" : ""}
      />
      <Box
        sx={{
          padding: "0 16px",
          pt: "20px",
          display: "flex",
          flexDirection: "column",
          rowGap: "4px",
          marginTop: "20px",
        }}
      >
        {links.map((link, index) => (
          <NavLink to={link.link} key={index}>
            {({ isActive }) => (
              <SideBarLink
                text={t(link.name)}
                active={isActive}
                icon={link.icon}
                open={open || hoverd}
              />
            )}
          </NavLink>
        ))}
      </Box>
    </Drawer>
  );
};

export default SideBar;
