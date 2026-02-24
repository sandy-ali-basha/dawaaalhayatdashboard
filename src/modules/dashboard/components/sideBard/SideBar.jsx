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
  ContactSupportOutlined,
  CurrencyBitcoinOutlined,
  DataArrayOutlined,
  DiscountOutlined,
  GavelOutlined,
  HomeOutlined,
  Inventory2Outlined,
  LocalPharmacyOutlined,
  Person2Outlined,
  PublicOutlined,
  ShoppingBagOutlined,
  ShoppingCartCheckoutOutlined,
  ShortTextOutlined,
  SpaceDashboardOutlined,
  WorkOutlined,
  WorkOutlineRounded,
} from "@mui/icons-material";
const SideBar = ({ open, setOpen, isMobile, mobileOpen, onCloseMobile }) => {
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
      link: "/dashboard/anylatics",
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
        {
          name: t("Products"),
          link: "/dashboard/product",
          icon: <ShoppingBagOutlined />,
        },
        {
          name: t("Medical form"),
          link: "/dashboard/product_type",
          icon: <CategoryOutlined />,
        },
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
      name: t("pharmacies"),
      link: "/dashboard/pharmacies",
      icon: <LocalPharmacyOutlined />,
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
      name: t("terms"),
      link: "/dashboard/terms",
      icon: <GavelOutlined />,
    },
    {
      name: t("Careers"),
      icon: <WorkOutlineRounded />,
      subOptions: [
        {
          name: t("Careers"),
          link: "/dashboard/careers",
          icon: <WorkOutlineRounded />,
        },
        {
          name: t("Careers Categories"),
          link: "/dashboard/careersCategory",
          icon: <WorkOutlined />,
        },
      ],
    },
    {
      name: t("blog"),
      link: "/dashboard/blog",
      icon: <ShortTextOutlined color={"secondary.main"} />,
    },
    {
      name: t("Home"),
      link: "/dashboard/home",
      icon: <HomeOutlined color={"secondary.main"} />,
    },
    {
      name: t("customers"),
      link: "/dashboard/customers",
      icon: <Person2Outlined color={"secondary.main"} />,
    },
    {
      name: t("about us"),
      link: "/dashboard/aboutus",
      icon: <DataArrayOutlined color={"secondary.main"} />,
    },
    {
      name: t("contact us"),
      link: "/dashboard/contactus",
      icon: <ContactSupportOutlined color={"secondary.main"} />,
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
        {
          name: t("Careers"),
          link: "/dashboard/careers",
          icon: <WorkOutlined />,
        },
        {
          name: t("Careers Categories"),
          link: "/dashboard/careersCategory",
          icon: <WorkOutlineRounded />,
        },
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
      name: t("about us"),
      link: "/dashboard/aboutus",
      icon: <HomeOutlined color={"secondary.main"} />,
    },
    {
      name: t("contact us "),
      link: "/dashboard/contactus",
      icon: <ContactSupportOutlined color={"secondary.main"} />,
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
      name: t("Inventories"),
      link: "/dashboard/Inventories",
      icon: <PublicOutlined />,
    },
    {
      name: t("pharmacies"),
      link: "/dashboard/pharmacies",
      icon: <LocalPharmacyOutlined />,
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

  const isDrawerExpanded = open || hovered || (isMobile && mobileOpen);

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : open}
      onClose={isMobile ? onCloseMobile : undefined}
      ModalProps={isMobile ? { keepMounted: true } : undefined}
      hoverd={!isMobile && hovered ? "true" : ""}
      ismobile={isMobile ? "true" : ""}
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
        open={isDrawerExpanded}
        setOpen={setOpen}
        hoverd={isDrawerExpanded ? "true" : ""}
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
                  <SideBarLink text={t(link.name)} icon={link.icon} open={isDrawerExpanded} />
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
                    <NavLink
                      to={subOption.link}
                      key={subIndex}
                      onClick={isMobile ? onCloseMobile : undefined}
                    >
                      {({ isActive }) => (
                        <SideBarLink
                          style={{ paddingTop: "5px" }}
                          text={t(subOption.name)}
                          active={isActive}
                          icon={subOption.icon}
                          open={isDrawerExpanded}
                        />
                      )}
                    </NavLink>
                  ))}
                </Collapse>
              </>
            ) : (
              <NavLink
                to={link.link}
                key={index}
                onClick={isMobile ? onCloseMobile : undefined}
              >
                {({ isActive }) => (
                  <SideBarLink
                    text={t(link.name)}
                    active={isActive}
                    icon={link.icon}
                    open={isDrawerExpanded}
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
