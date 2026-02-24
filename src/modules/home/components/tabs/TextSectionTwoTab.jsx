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

const TextSectionTwoTab = ({ textSectionTwo, direction, onEdit }) =>
  textSectionTwo?.value && (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6">Text Section Two</Typography>
          <ChangeStatus
            id={18}
            action={textSectionTwo.value.status === 1 && "change-status"}
            type="setting"
          >
            {textSectionTwo.value.status === 1 ? "Active" : "Not Active"}
          </ChangeStatus>
        </Box>
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
  );

export default TextSectionTwoTab;
