import { Box, Typography } from "@mui/material";
import notFoundImg from "../assets/images/not found.jpeg";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        background: "#f0f1f3",
        height:'100vh'
      }}
    >
      <img src={notFoundImg} />
      <Typography variant="h2" color="text.secondary">
        404
      </Typography>
      <Typography variant="h2" color="text.secondary">
        Page Not Found
      </Typography>
    </Box>
  );
};
export default NotFound;
