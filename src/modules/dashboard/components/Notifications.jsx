import React, { useState } from "react";
import {
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemText,
} from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";

export default function NotificationDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const notifications = [
    {
      id: 1,
      title: "Congratulations Lettie 🎉",
      message: "Won the monthly best seller gold badge",
      time: "1h ago", 
    },
    {
      id: 2,
      title: "Charles Franklin",
      message: "Accepted your connection",
      time: "12h ago",
    },
    {
      id: 3,
      title: "New Message ✉️",
      message: "You have new message from Natalie",
      time: "1h ago",
    },
    {
      id: 4,
      title: "Whoo! You have new order 🛒",
      message: "ACME Inc. made new order $1,154",
      time: "1d ago",
    },
  ];

  return (
    <Box>
      <IconButton color="text.main" onClick={handleClick}>
        <Badge badgeContent={8} color="primary">
          <NotificationsOutlined />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 340, maxHeight: 400 },
        }}
      >
        <Box sx={{ p: 2, pb: 0, display: "flex" }}>
          <Typography variant="h6">Notifications</Typography>
          <Typography variant="caption" color="text.secondary">
            8 New
          </Typography>
        </Box>
        <Divider sx={{ my: 1, color: "text.secondary" }} />

        {notifications.map((n) => (
          <MenuItem
            key={n.id}
            onClick={handleClose}
            sx={{ alignItems: "flex-start" }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {n.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {n.message}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {n.time}
                  </Typography>
                </>
              }
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
