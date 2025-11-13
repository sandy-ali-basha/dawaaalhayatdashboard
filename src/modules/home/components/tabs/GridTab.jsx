import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";

const GridTab = ({ grid, direction, onEdit }) => (
  <Card sx={{ mt: 3 }}>
    <CardContent>
      <IconButton onClick={() => onEdit(grid)}>
        <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
          <ModeTwoToneIcon sx={{ color: "text.main" }} />
        </Tooltip>
      </IconButton>
      <Typography variant="h6">Grid</Typography>
      {["ar", "en", "kr"].map((lang) => (
        <div key={lang}>
          <Typography variant="h6">
            <b>{lang.toUpperCase()}:</b>
          </Typography>
          <Grid container>
            <Grid item md={6}>
              {grid.value.sections?.map((section, idx) => (
                <Typography key={idx}>
                  title - {idx} : {section?.[lang]?.title ?? "N/A"}
                </Typography>
              ))}
            </Grid>
            <Grid item md={6}>
              {grid.value.sections?.map((section, idx) => (
                <Typography key={idx}>
                  sub title {idx} : {section?.[lang]?.subtitle ?? "N/A"}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </div>
      ))}

      <Box mt={2}>
        <img
          src={grid?.image}
          alt="grid"
          width="100%"
          style={{ borderRadius: 8 }}
        />
      </Box>
    </CardContent>
  </Card>
);

export default GridTab;
