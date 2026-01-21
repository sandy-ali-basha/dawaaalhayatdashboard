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
  CircularProgress,
  Backdrop,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { _Home } from "api/home/home";

/* ================== Helpers ================== */

const getItemId = (item) => `${item.type}-${item.data.id}`;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

/* ================== Sortable Item ================== */

const SortableItem = ({ id, title, disabled }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      divider
      secondaryAction={
        <IconButton
          edge="end"
          {...attributes}
          {...listeners}
          disabled={disabled}
        >
          <DragIndicatorIcon />
        </IconButton>
      }
    >
      <ListItemText primary={title || "Unnamed"} />
    </ListItem>
  );
};

/* ================== Dialog ================== */

const SortHomeSectionsDialog = ({ open, onClose, sections }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItems(sections || []);
  }, [sections]);

  /* ---------- Update backend with delay ---------- */
  const updateAllOrders = async (orderedItems) => {
    setLoading(true);

    for (let i = 0; i < orderedItems.length; i++) {
      const item = orderedItems[i];

      try {
        await _Home.updateOrder(item.data.id, {
          type: item.type,
          order: i + 1,
        });

        await sleep(200);
      } catch (err) {
        console.error(
          `Failed updating order for ${item.type}-${item.data.id}`,
          err
        );
      }
    }

    setLoading(false);
  };

  /* ---------- Drag End ---------- */
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(
      (i) => getItemId(i) === active.id
    );
    const newIndex = items.findIndex(
      (i) => getItemId(i) === over.id
    );

    const newItems = arrayMove(items, oldIndex, newIndex);

    setItems(newItems);
    await updateAllOrders(newItems);
  };

  return (
    <>
      {/* 🔄 Loader overlay */}
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Sort Home Sections</DialogTitle>

        <DialogContent>
          <Box mt={1}>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map(getItemId)}
                strategy={verticalListSortingStrategy}
              >
                <List>
                  {items.map((section) => {
                    const title =
                      section.type === "section"
                        ? section?.data?.title?.en
                        : section?.data?.name;

                    return (
                      <SortableItem
                        key={getItemId(section)}
                        id={getItemId(section)}
                        title={title}
                        disabled={loading}
                      />
                    );
                  })}
                </List>
              </SortableContext>
            </DndContext>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SortHomeSectionsDialog;