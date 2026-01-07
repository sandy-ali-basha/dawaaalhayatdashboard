import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { _Home } from "api/home/home";

/* ------------------ Sortable Item ------------------ */
const SortableItem = ({ id, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      divider
      secondaryAction={
        <IconButton edge="end" {...attributes} {...listeners}>
          <DragIndicatorIcon />
        </IconButton>
      }
    >
      <ListItemText primary={title} />
    </ListItem>
  );
};

/* ------------------ Dialog ------------------ */
const SortHomeSectionsDialog = ({ open, onClose, sections, onSaved }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(sections || []);
  }, [sections]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.findIndex(i => i.id === active.id);
      const newIndex = prev.findIndex(i => i.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleSave = async () => {
    const payload = items.map((section, index) => ({
      id: section.id,
      order: index + 1,
    }));

    await _Home.reorderSections({ sections: payload });
    onSaved?.();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Sort Home Sections</DialogTitle>

      <DialogContent>
        <Box mt={1}>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map(i => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <List>
                {items.map((section) => (
                  <SortableItem
                    key={section.id}
                    id={section.id}
                    title={section.title || section.type}
                  />
                ))}
              </List>
            </SortableContext>
          </DndContext>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SortHomeSectionsDialog;
