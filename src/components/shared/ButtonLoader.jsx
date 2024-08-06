import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";

const ButtonLoader = (props) => {
  const { loading, disableOnLoading, ...rest } = props;

  return (
    <Button
      {...rest}
      disabled={disableOnLoading === true && loading}
      sx={{
        width: 150,
      }}
      variant="contained"
      color={"secondary"}
    >
      {props.loading && (
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "white" }} size="25px" />
        </Box>
      )}
      <Typography sx={{ visibility: props.loading ? "hidden" : "visible" }}>
        {props.children}
      </Typography>
    </Button>
  );
};

export default ButtonLoader;
