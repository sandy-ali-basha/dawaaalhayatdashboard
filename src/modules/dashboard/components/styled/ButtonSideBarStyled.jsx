import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const ButtonSideBarStyled = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  backgroundColor: "inherit",
  textDecoration: "none",
  minWidth: "20px",
  color: theme.palette.text?.main,
  display: "flex",
  justifyContent: "start",
  padding: "6px 12px 6px 12px",
  borderRadius: "6px",
  alignItems: "center",
  minHeight: 40,
  columnGap: "15px",

  "& .MuiSvgIcon-root": {
    transition: "250ms",
  },
  ...(active && {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  }),
}));
