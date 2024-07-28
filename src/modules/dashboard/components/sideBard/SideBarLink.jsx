import { Typography } from "@mui/material";
import React, { memo } from "react";
import { ButtonSideBarStyled } from "../styled/ButtonSideBarStyled";

const SideBarLink = (props) => {
  if (props.icon)
    return (
      <ButtonSideBarStyled
        variant="contained"
        startIcon={props.icon}
        fullWidth
        active={props.active}
      >
        <Typography
          variant="body1"
          sx={{
            textDecoration: "none",
            opacity: props.open ? 1 : 0,
            color: "text.main",
          }}
        >
          {props.text}
        </Typography>
      </ButtonSideBarStyled>
    );

  return (
    <ButtonSideBarStyled variant="contained" fullWidth active={props.active}>
      <Typography  variant="body1" color="text.main">{props.text}</Typography>
    </ButtonSideBarStyled>
  );
};

export default memo(SideBarLink);



  