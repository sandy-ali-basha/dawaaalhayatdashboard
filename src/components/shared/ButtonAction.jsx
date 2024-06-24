import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ButtonAction = ({ name, onClick, startIcon, type, endIcon }) => {
  return (
    <Box>
      <Button
        startIcon={startIcon}
        endIcon={endIcon}
        type={type}
        sx={{
          color: "#fff",
          backgroundColor: "origin.main",
          borderColor:"origin.main",
          "&:hover": { backgroundColor: "origin.main" },
        }}
        variant="outlined"
        onClick={onClick}
      >
        {name}
      </Button>
    </Box>
  );
};

export default ButtonAction;
