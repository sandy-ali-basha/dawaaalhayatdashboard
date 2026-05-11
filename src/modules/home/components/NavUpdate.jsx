import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const languages = ["ar", "en", "kr"];

const defaultNavItem = {
  ar: { title: "", text: "" },
  en: { title: "", text: "" },
  kr: { title: "", text: "" },
  link: "",
};

const NavUpdate = ({ open, onClose, initialData, handleSave }) => {
  const [items, setItems] = useState([]);
  const [useItemsMode, setUseItemsMode] = useState(false);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentItem, setCurrentItem] = useState(defaultNavItem);

  useEffect(() => {
    if (!initialData) return;

    const initialItems = Array.isArray(initialData.value?.items)
      ? initialData.value.items
      : initialData.value
      ? [{ ...defaultNavItem, ...initialData.value }]
      : [];

    setItems(initialItems);
    setUseItemsMode(Array.isArray(initialData.value?.items));
  }, [initialData]);

  const openItemDialog = (index = null) => {
    if (index !== null && items[index]) {
      setCurrentItem(items[index]);
      setEditingIndex(index);
    } else {
      setCurrentItem(defaultNavItem);
      setEditingIndex(null);
    }
    setItemDialogOpen(true);
  };

  const closeItemDialog = () => {
    setItemDialogOpen(false);
    setEditingIndex(null);
    setCurrentItem(defaultNavItem);
  };

  const handleItemChange = (lang, field, value) => {
    setCurrentItem((prev) => ({
      ...prev,
      [lang]: {
        ...(prev[lang] ?? {}),
        [field]: value,
      },
    }));
  };

  const handleLinkChange = (value) => {
    setCurrentItem((prev) => ({ ...prev, link: value }));
  };

  const saveItem = () => {
    if (editingIndex !== null) {
      setItems((prev) =>
        prev.map((item, index) =>
          index === editingIndex ? currentItem : item
        )
      );
    } else {
      setItems((prev) => [...prev, currentItem]);
    }

    setUseItemsMode(true);
    closeItemDialog();
  };

  const handleDeleteItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setUseItemsMode(true);
  };

  const saveChanges = () => {
    const formDataNew = new FormData();
    formDataNew.append("id", 85);
    formDataNew.append("name", "home.page.navbar");

    if (useItemsMode || items.length > 1) {
      items.forEach((item, index) => {
        languages.forEach((lang) => {
          formDataNew.append(
            `navbar[items][${index}][${lang}][title]`,
            item?.[lang]?.title ?? " "
          );
          formDataNew.append(
            `navbar[items][${index}][${lang}][text]`,
            item?.[lang]?.text ?? " "
          );
        });
        formDataNew.append(
          `navbar[items][${index}][link]`,
          item?.link ?? " "
        );
      });
    } else if (items.length === 1) {
      const item = items[0];
      languages.forEach((lang) => {
        formDataNew.append(
          `navbar[${lang}][title]`,
          item?.[lang]?.title ?? " "
        );
        formDataNew.append(
          `navbar[${lang}][text]`,
          item?.[lang]?.text ?? " "
        );
      });
      formDataNew.append("navbar[link]", item?.link ?? " ");
    } else {
      languages.forEach((lang) => {
        formDataNew.append(`navbar[${lang}][title]`, " ");
        formDataNew.append(`navbar[${lang}][text]`, " ");
      });
      formDataNew.append("navbar[link]", " ");
    }

    handleSave(formDataNew);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Manage Navigation Items</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="subtitle1">Navigation items</Typography>
          <Button variant="contained" onClick={() => openItemDialog(null)}>
            Add new item
          </Button>
        </Box>

        {items.length === 0 ? (
          <Typography sx={{ mb: 2 }}>
            There are no navigation items yet. Use the button above to add one.
          </Typography>
        ) : (
          items.map((item, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="subtitle1">Item {index + 1}</Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => openItemDialog(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteItem(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Box>

              {languages.map((lang) => (
                <Box key={lang} sx={{ mt: 1 }}>
                  <Typography variant="subtitle2">{lang.toUpperCase()}</Typography>
                  <Typography>
                    <strong>Title:</strong> {item?.[lang]?.title || "-"}
                  </Typography>
                  <Typography>
                    <strong>Text:</strong> {item?.[lang]?.text || "-"}
                  </Typography>
                </Box>
              ))}

              <Typography sx={{ mt: 1 }}>
                <strong>Link:</strong> {item?.link || "-"}
              </Typography>
            </Box>
          ))
        )}

        {itemDialogOpen && (
          <Box sx={{ mb: 3, p: 2, border: "1px dashed", borderColor: "divider", borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {editingIndex !== null ? "Edit item" : "Add new item"}
            </Typography>

            {languages.map((lang) => (
              <Box key={lang} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {lang.toUpperCase()}
                </Typography>
                <TextField
                  fullWidth
                  label={`Title (${lang})`}
                  value={currentItem?.[lang]?.title ?? ""}
                  onChange={(e) => handleItemChange(lang, "title", e.target.value)}
                  sx={{ mb: 1 }}
                />
                <TextField
                  fullWidth
                  label={`Text (${lang})`}
                  value={currentItem?.[lang]?.text ?? ""}
                  multiline
                  minRows={2}
                  onChange={(e) => handleItemChange(lang, "text", e.target.value)}
                />
              </Box>
            ))}

            <TextField
              fullWidth
              label="Link"
              value={currentItem?.link ?? ""}
              onChange={(e) => handleLinkChange(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={saveItem}>
                {editingIndex !== null ? "Save item" : "Add item"}
              </Button>
              <Button variant="outlined" onClick={closeItemDialog}>
                Cancel
              </Button>
            </Stack>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={saveChanges}>
            Save Navigation
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default NavUpdate;
