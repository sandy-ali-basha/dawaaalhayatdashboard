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
import ChangeStatus from "modules/home/pages/slider/ChangeStatus";

const StatusTab = ({ status, t, direction, onEdit }) =>
  status?.value && (
    <Card sx={{ mt: 3 }}>
      <CardContent>
      <Box sx={{display:'flex'}}>
        <Typography variant="h6">Status Section</Typography>
        <ChangeStatus id={"status"} action={status.status === "active" && "change-status"}>
          {status.status === "Active" ? "Active" : "Not Active"}
        </ChangeStatus>
      </Box>
        <Typography variant="subtitle2" color="text.secondary">
          Multi-language Titles and Info
        </Typography>

        <Box sx={{ my: 2 }}>
          <Grid container spacing={2}>
            {["ar", "en", "kr"].map((lang) => (
              <Grid item xs={12} md={4} key={lang}>
                <Typography variant="h6">
                  {lang === "ar"
                    ? "Arabic"
                    : lang === "en"
                    ? "English"
                    : "Kurdish"}
                </Typography>
                <Typography>
                  {status?.value?.[lang]?.title1 ?? "N/A"}
                </Typography>
                <Typography>
                  {status?.value?.[lang]?.subtitle1 ?? "N/A"}
                </Typography>
                <Typography>
                  {status?.value?.[lang]?.title2 ?? "N/A"}
                </Typography>
                <Typography>
                  {status?.value?.[lang]?.subtitle2 ?? "N/A"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
        <IconButton onClick={() => onEdit(status)}>
          <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
            <ModeTwoToneIcon sx={{ color: "text.main" }} />
          </Tooltip>
        </IconButton>
      </CardContent>
    </Card>
  );

export default StatusTab;
