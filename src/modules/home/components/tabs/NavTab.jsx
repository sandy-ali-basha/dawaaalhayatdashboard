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

const NavTab = ({ data, direction, onEdit }) =>
  data?.value && (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6">Offers Nav</Typography>
          <ChangeStatus
            id={data?.id}
            action={data.status === 1 && "change-status"}
            type="setting"
          >
            {data.status === 1 ? "Active" : "Not Active"}
          </ChangeStatus>
        </Box>

        {["ar", "en", "kr"].map((lang) => (<>
            <b>{lang.toUpperCase()}:</b>{" "}
          <Typography key={lang}>
            title :  {data.value?.[lang]?.title ?? "N/A"} 
          </Typography>
          <Typography variant={"subtitle1"}  sx={{ mt: 1 }}>
            text :  {data.value?.[lang]?.text ?? "N/A"}
          </Typography>
        </>
        ))}

        <Typography sx={{ mt: 1 }}>
          <b>Link:</b> {data.value?.link}
        </Typography>
        <IconButton onClick={() => onEdit(data)}>
          <Tooltip title={direction === "ltr" ? "Edit" : "ØªØ¹Ø¯ÙŠÙ„"}>
            <ModeTwoToneIcon sx={{ color: "text.main" }} />
          </Tooltip>
        </IconButton>
      </CardContent>
    </Card>
  );

export default NavTab;

