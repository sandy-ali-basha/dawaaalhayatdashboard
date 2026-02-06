import React, { useMemo, useState } from "react";
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
import { useNotifications } from "hooks/notifications/useNotifications";

export default function NotificationDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { data, isLoading } = useNotifications();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const notifications = useMemo(() => {
    if (!data) return [];
    return Object.entries(data)
      .map(([id, notification]) => ({
        id,
        ...notification,
      }))
      .filter((notification) => notification.is_active);
  }, [data]);

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort(
      (a, b) => (b.created_at || 0) - (a.created_at || 0)
    );
  }, [notifications]);

  const unreadCount = useMemo(() => {
    return notifications.filter((item) => item.is_active && !item.is_read)
      .length;
  }, [notifications]);

  const formatTimestamp = (createdAt) => {
    if (!createdAt) return "";
    const date =
      typeof createdAt === "number"
        ? new Date(createdAt * 1000)
        : new Date(createdAt);
    return date.toLocaleString();
  };

  return (
    <Box>
      <IconButton color="text.main" onClick={handleClick}>
        <Badge
          badgeContent={unreadCount}
          color="primary"
          invisible={unreadCount === 0}
        >
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
            {unreadCount} New
          </Typography>
        </Box>
        <Divider sx={{ my: 1, color: "text.secondary" }} />

        {isLoading && (
          <MenuItem sx={{ alignItems: "flex-start" }}>
            <ListItemText
              primary={<Typography variant="subtitle2">Loading...</Typography>}
            />
          </MenuItem>
        )}

        {!isLoading && sortedNotifications.length === 0 && (
          <MenuItem sx={{ alignItems: "flex-start" }}>
            <ListItemText
              primary={
                <Typography variant="subtitle2">
                  No notifications yet.
                </Typography>
              }
            />
          </MenuItem>
        )}

        {sortedNotifications.map((n) => (
          <MenuItem
            key={n.id}
            onClick={handleClose}
            sx={{ alignItems: "flex-start" }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: n.is_read ? 500 : 700 }}
                >
                  {n.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {n.body}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {formatTimestamp(n.created_at)}
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
