import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Link,
} from "@mui/material";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import ChangeStatus from "modules/home/pages/slider/ChangeStatus";

const CtaTab = ({ cta, direction, onEdit }) =>
  cta?.value && (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <IconButton onClick={() => onEdit(cta)}>
            <Typography variant="h6">Call To Action</Typography>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          
          <ChangeStatus
            id={16}
            action={cta?.status === 1 && "change-status"}
            type="setting"
          >
            {cta.status === 1 ? "Active" : "Not Active"}
          </ChangeStatus>
          
        </Box>
        <Box sx={{ my: 2 }}>
          {["ar", "en", "kr"].map((lang) => (
            <Typography key={lang}>
              {lang.toUpperCase()}: {cta.value?.title?.[lang] ?? "N/A"} -{" "}
              {cta.value?.subtitle?.[lang] ?? "N/A"}
            </Typography>
          ))}
        </Box>
        <Link
          href={cta.value?.link ?? "#"}
          target="_blank"
          rel="noopener"
          underline="hover"
        >
          {cta.value?.link ?? "No link provided"}
        </Link>
      </CardContent>
    </Card>
  );

export default CtaTab;
