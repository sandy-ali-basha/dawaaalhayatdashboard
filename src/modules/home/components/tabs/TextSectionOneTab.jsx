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

const TextSectionOneTab = ({ textSectionOne, direction, onEdit }) => (
  textSectionOne?.value && (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Text Section One</Typography>
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
  )
);

export default TextSectionOneTab;
