import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Button,
  Stack,
} from "@mui/material";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeStatus from "modules/home/pages/slider/ChangeStatus";

const NavTab = ({ data, direction, onEdit, onAdd, onRemove }) => {
  const items = Array.isArray(data?.value?.items)
    ? data.value.items
    : data?.value
    ? [data.value]
    : [];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Offers Nav</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="outlined" size="small" onClick={onAdd}>
              Add new item
            </Button>
            <ChangeStatus
              id={data?.id}
              action={data.status === 1 && "change-status"}
              type="setting"
            >
              {data.status === 1 ? "Active" : "Not Active"}
            </ChangeStatus>
          </Stack>
        </Box>

        {items.length === 0 ? (
          <Typography sx={{ mt: 2 }}>No navigation items available.</Typography>
        ) : (
          items.map((item, index) => (
            <Card key={index} sx={{ mt: 2, p: 2, border: "1px solid", borderColor: "divider" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Typography variant="subtitle1">Item {index + 1}</Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => onEdit(data)}>
                    <Tooltip title={direction === "ltr" ? "Edit" : "ØªØ¹Ø¯ÙŠÙ„"}>
                      <ModeTwoToneIcon sx={{ color: "text.main" }} />
                    </Tooltip>
                  </IconButton>
                  {item?.id && (
                    <IconButton onClick={() => onRemove(item.id)}>
                      <Tooltip title={direction === "ltr" ? "Remove" : "Ø¥Ø²Ø§Ù„Ø©"}>
                        <DeleteIcon sx={{ color: "error.main" }} />
                      </Tooltip>
                    </IconButton>
                  )}
                </Stack>
              </Box>

              {['ar', 'en', 'kr'].map((lang) => (
                <Box key={lang} sx={{ mt: 1 }}>
                  <Typography variant="subtitle2">{lang.toUpperCase()}</Typography>
                  <Typography>
                    <b>Title:</b> {item?.[lang]?.title ?? "N/A"}
                  </Typography>
                  <Typography>
                    <b>Text:</b> {item?.[lang]?.text ?? "N/A"}
                  </Typography>
                </Box>
              ))}

              <Typography sx={{ mt: 1 }}>
                <b>Link:</b> {item?.link ?? "N/A"}
              </Typography>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default NavTab;

