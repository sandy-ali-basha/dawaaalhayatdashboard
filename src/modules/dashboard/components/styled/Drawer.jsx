import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "modules/dashboard/DashboardComponent";

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) =>
    prop !== "open" && prop !== "hoverd" && prop !== "ismobile",
})(({ theme, open, hoverd, ismobile }) => {
  const isMobile = Boolean(ismobile);

  return {
    width: drawerWidth,
    zIndex: "1200",
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "& .MuiDrawer-paper": {
      borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
      backgroundColor: "#0F0F0F",
      width: drawerWidth,
    },
    ...(isMobile
      ? {}
      : {
          ...(open && {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
          }),
          ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
          }),
          ...(!open &&
            hoverd && {
              ...openedMixin(theme),
              "& .MuiDrawer-paper": openedMixin(theme),
            }),
          ...(!open &&
            !hoverd && {
              ...closedMixin(theme),
              "& .MuiDrawer-paper": closedMixin(theme),
            }),
        }),
  };
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "80px",
  // width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});
