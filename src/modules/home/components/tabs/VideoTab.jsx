import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";

import ChangeStatus from "modules/home/pages/slider/ChangeStatus";

const VideoTab = ({ video, videoText, direction, onEdit }) => (
  <Card sx={{ mt: 3 }}>
    <CardContent>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h6">Video Section</Typography>
        <ChangeStatus
          type={19}
          id={"video"}
        >
          {video.status === "1" ? "Active" : "Not Active"}
        </ChangeStatus>
      </Box>
      <Box sx={{ mt: 2, width: { xs: "100%", md: "50vw" } }}>
        <video width="100%" controls style={{ borderRadius: 8 }}>
          <source src={video?.video ?? ""} type="video/mp4" />
        </video>
      </Box>
      {videoText?.value && (
        <Box sx={{ mt: 2 }}>
          {["ar", "en", "kr"].map((lang) => (
            <Typography
              key={lang}
              dangerouslySetInnerHTML={{
                __html: `<b>${lang.toUpperCase()}:</b> ${
                  videoText?.value?.[lang] ?? "N/A"
                }`,
              }}
            />
          ))}
        </Box>
      )}
      <IconButton onClick={() => onEdit(video)}>
        <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
          <ModeTwoToneIcon sx={{ color: "text.main" }} />
        </Tooltip>
      </IconButton>
    </CardContent>
  </Card>
);

export default VideoTab;
