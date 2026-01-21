import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import ChangeStatus from "modules/home/pages/slider/ChangeStatus";

const TextSectionOneTab = ({ textSectionOne, direction, onEdit }) =>
  textSectionOne?.value && (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6">Text Section One</Typography>
          <ChangeStatus
            id={17}
            action={textSectionOne.status === "1" && "change-status"}
            type="setting"
          >
            {textSectionOne.status === "1" ? "Active" : "Not Active"}
          </ChangeStatus>
        </Box>
        {["ar", "en", "kr"].map((lang) => (
          <Typography
            key={lang}
            dangerouslySetInnerHTML={{
              __html: `<b>${lang.toUpperCase()}:</b> ${
                textSectionOne.value.text?.[lang] ?? "N/A"
              }`,
            }}
          />
        ))}
        <Box mt={2}>
          <img
            src={textSectionOne?.image}
            alt="Text Section One"
            width="100%"
            style={{ borderRadius: 8 }}
          />
        </Box>
        <IconButton onClick={() => onEdit(textSectionOne)}>
          <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
            <ModeTwoToneIcon sx={{ color: "text.main" }} />
          </Tooltip>
        </IconButton>
      </CardContent>
    </Card>
  );

export default TextSectionOneTab;
