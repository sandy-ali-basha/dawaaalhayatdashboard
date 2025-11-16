import React, { useState } from "react";
import { Drawer } from "../styled/Drawer";
import { Box, Collapse } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBarHeader from "./SideBarHeader";
import SideBarLink from "./SideBarLink";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  AdminPanelSettingsOutlined,
  BookmarkOutlined,
  CategoryOutlined,
  CurrencyBitcoinOutlined,
  DiscountOutlined,
  GavelOutlined,
  HomeOutlined,
  Inventory2Outlined,
  MoneyOutlined,
  PublicOutlined,
  ShoppingBagOutlined,
  ShoppingCartCheckoutOutlined,
  SpaceDashboardOutlined,
  WorkOutlined,
} from "@mui/icons-material";
const SideBar = ({ open, setOpen }) => {
  const { t } = useTranslation("sidebar");
  const [hovered, setHovered] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleToggleSection = (sectionName) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };
  const role = localStorage.getItem("role");

  const links = [
    {
      name: t("Dashboard"),
      link: "/dashboard",
      icon: <SpaceDashboardOutlined />,
    },
    {
      name: t("Admin"),
      link: "/dashboard/admin",
      icon: <AdminPanelSettingsOutlined />,
    },
    {
      name: t("Products"),
      icon: <ShoppingBagOutlined />,
      subOptions: [
        { name: t("Products"), link: "/dashboard/product" },
        { name: t("Medical form"), link: "/dashboard/product_type" },
      ],
    },

    {
      name: t("Categories"),
      icon: <CategoryOutlined />,
      link: "/dashboard/products/categories",
    },

    {
      name: t("orders"),
      link: "/dashboard/orders",
      icon: <ShoppingCartCheckoutOutlined />,
    },
    {
      name: t("Inventories"),
      link: "/dashboard/Inventories",
      icon: <Inventory2Outlined />,
    },
    {
      name: t("currencies"),
      link: "/dashboard/currencies",
      icon: <CurrencyBitcoinOutlined />,
    },

    {
      name: t("brands"),
      link: "/dashboard/brands",
      icon: <SellOutlinedIcon />,
    },
    {
      name: t("discounts"),
      link: "/dashboard/discounts",
      icon: <DiscountOutlined />,
    },
    {
      name: t("point price"),
      link: "/dashboard/settings",
      icon: <MoneyOutlined />,
    },
    {
      name: t("terms"),
      link: "/dashboard/terms",
      icon: <GavelOutlined />,
    },
    {
      name: t("Careers"),
      icon: <WorkOutlined />,
      subOptions: [
        { name: t("Careers"), link: "/dashboard/careers" },
        { name: t("Careers Categories"), link: "/dashboard/careersCategory" },
      ],
    },

    {
      name: t("blog"),
      link: "/dashboard/blog",
      icon: <BookmarkOutlined color={"secondary.main"} />,
    },
    {
      name: t("Home"),
      link: "/dashboard/home",
      icon: <HomeOutlined color={"secondary.main"} />,
    },
    {
      name: t("customers"),
      link: "/dashboard/customers",
      icon: <HomeOutlined color={"secondary.main"} />,
    },
  ];
  const website_admin = [
    {
      name: t("brands"),
      link: "/dashboard/brands",
      icon: <SellOutlinedIcon />,
    },
    {
      name: t("terms"),
      link: "/dashboard/terms",
      icon: <GavelOutlined />,
    },
    {
      name: t("Careers"),
      icon: <WorkOutlined />,
      subOptions: [
        { name: t("Careers"), link: "/dashboard/careers" },
        { name: t("Careers Categories"), link: "/dashboard/careersCategory" },
      ],
    },
    {
      name: t("blog"),
      link: "/dashboard/blog",
      icon: <BookmarkOutlined color={"secondary.main"} />,
    },
    {
      name: t("Home"),
      link: "/dashboard/home",
      icon: <HomeOutlined color={"secondary.main"} />,
    },
  ];
  const orders_admin = [
    {
      name: t("orders"),
      link: "/dashboard/orders",
      icon: <ShoppingCartCheckoutOutlined />,
    },
  ];
  const ecommerce_admin = [
    {
      name: t("Medical form"),
      link: "/dashboard/product_type",
      icon: <ShoppingCartCheckoutOutlined />,
    },
    {
      name: t("Products"),
      link: "/dashboard/product",
      icon: <ShoppingBagOutlined />,
    },
    {
      name: t("Categories"),
      link: "/dashboard/products/categories",
      icon: <CategoryOutlined />,
    },
    {
      name: t("orders"),
      link: "/dashboard/orders",
      icon: <ShoppingCartCheckoutOutlined />,
    },

    {
      name: t("point price"),
      link: "/dashboard/settings",
      icon: <MoneyOutlined />,
    },
    {
      name: t("Inventories"),
      link: "/dashboard/Inventories",
      icon: <PublicOutlined />,
    },

    {
      name: t("brands"),
      link: "/dashboard/brands",
      icon: <SellOutlinedIcon />,
    },
    {
      name: t("discounts"),
      link: "/dashboard/discounts",
      icon: <DiscountOutlined />,
    },
  ];

  const returnLinks = () => {
    if (role === "super_admin") return links;
    if (role === "website_admin") return website_admin;
    if (role === "ecommerce_admin") return ecommerce_admin;
    if (role === "order_admin") return orders_admin;
    else return [];
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      hovered={hovered ? "true" : ""}
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
        hovered={hovered ? "true" : ""}
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
        {returnLinks().map((link, index) => (
          <React.Fragment key={index}>
            {link.subOptions ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleToggleSection(link.name)}
                >
                  <SideBarLink
                    text={t(link.name)}
                    icon={link.icon}
                    open={open || hovered}
                  />
                  {openSections[link.name] ? (
                    <ExpandLessIcon sx={{ color: "text.main" }} />
                  ) : (
                    <ExpandMoreIcon sx={{ color: "text.main" }} />
                  )}
                </Box>
                <Collapse
                  in={openSections[link.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  {link.subOptions.map((subOption, subIndex) => (
                    <NavLink to={subOption.link} key={subIndex}>
                      {({ isActive }) => (
                        <SideBarLink
                          style={{ paddingTop: "5px" }}
                          text={t(subOption.name)}
                          active={isActive}
                          icon={null}
                          open={open || hovered}
                        />
                      )}
                    </NavLink>
                  ))}
                </Collapse>
              </>
            ) : (
              <NavLink to={link.link} key={index}>
                {({ isActive }) => (
                  <SideBarLink
                    text={t(link.name)}
                    active={isActive}
                    icon={link.icon}
                    open={open || hovered}
                  />
                )}
              </NavLink>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Drawer>
  );
};

export default SideBar;
