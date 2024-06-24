import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const BoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette?.card?.main,
  borderRadius: "6px",
  padding: "20px 0 20px 0",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 4px 18px 0px rgba(15, 20, 34, 0.1)"
      : "0px 4px 18px 0px rgba(47, 43, 61, 0.1)",
}));

// border: 1px solid ${theme.palette.borderColor.light} ;
