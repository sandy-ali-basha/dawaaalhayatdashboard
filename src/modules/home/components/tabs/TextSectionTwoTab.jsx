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

const TextSectionTwoTab = ({ textSectionTwo, direction, onEdit }) => (
  textSectionTwo?.value && (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Text Section Two</Typography>
        {["ar", "en", "kr"].map((lang) => (
          <Typography
            key={lang}
            dangerouslySetInnerHTML={{
              __html: `<b>${lang.toUpperCase()}:</b> ${
                textSectionTwo.value.text?.[lang] ?? "N/A"
              }`,
            }}
          />
        ))}
        <Box mt={2}>
          <img
            src={textSectionTwo?.image}
            alt="Text Section Two"
            width="100%"
            style={{ borderRadius: 8 }}
          />
        </Box>
        <IconButton onClick={() => onEdit(textSectionTwo)}>
          <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
            <ModeTwoToneIcon sx={{ color: "text.main" }} />
          </Tooltip>
        </IconButton>
      </CardContent>
    </Card>
  )
);

export default TextSectionTwoTab;
