import {
  TableCell,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ViewCarouselRoundedIcon from "@mui/icons-material/ViewCarouselRounded";
import LinkIcon from "@mui/icons-material/Link";
import ListAltRounded from "@mui/icons-material/ListAltRounded";
import { settingsStore } from "store/settingsStore";
import { DeleteTwoTone } from "@mui/icons-material";

const ProductMenu = ({
  product,
  count,
  page,
  handleEdit,
  handleView,
  handleAddImages,
  handleImagesSlider,
  handleCat,
  handleDelete,
  navigate,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [direction] = settingsStore((state) => [state.direction]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableCell align="center" sx={{ minWidth: 50 }}>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={() => {
            handleEdit(product?.id);
            handleClose();
          }}
        >
          <ListItemIcon>
            <ModeTwoToneIcon sx={{ color: "text.main" }} />
          </ListItemIcon>
          <ListItemText>{direction === "ltr" ? "Edit" : "تعديل"}</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleView(product?.id);
            handleClose();
          }}
        >
          <ListItemIcon>
            <VisibilityTwoToneIcon color="primary" />
          </ListItemIcon>
          <ListItemText>{direction === "ltr" ? "View" : "مشاهدة"}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleAddImages(product?.id);
            handleClose();
          }}
        >
          <ListItemIcon>
            <AddPhotoAlternateIcon sx={{ color: "text.main" }} />
          </ListItemIcon>
          <ListItemText>Add Images</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleImagesSlider(product?.id);
            handleClose();
          }}
        >
          <ListItemIcon>
            <ViewCarouselRoundedIcon sx={{ color: "text.main" }} />
          </ListItemIcon>
          <ListItemText>Add Images to slider</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCat(product?.id, product?.attributes);
            handleClose();
          }}
        >
          <ListItemIcon>
            <LinkIcon sx={{ color: "text.main" }} />
          </ListItemIcon>
          <ListItemText>Link to categories</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("details/" + product?.id);
            handleClose();
          }}
        >
          <ListItemIcon>
            <ListAltRounded sx={{ color: "text.main" }} />
          </ListItemIcon>
          <ListItemText>Details</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(product?.id);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteTwoTone color="error.main" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </TableCell>
  );
};

export default ProductMenu;
