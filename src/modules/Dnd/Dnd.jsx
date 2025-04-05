import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Typography } from "@mui/material";
import BasicCard from "./component/BasicCard";
import TextWithBtn from "./component/TextWithBtn";

// Custom Draggable Component
const CustomDraggableComponent = ({ id, index, children }) => (
  <Draggable draggableId={id} index={index}>
    {(provided, snapshot) => (
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        sx={{
          my: 1,
          backgroundColor: snapshot.isDragging ? "lightgreen" : "white",
          borderRadius: "4px",
          boxShadow: snapshot.isDragging
            ? "0px 4px 6px rgba(0,0,0,0.1)"
            : "none",
        }}
      >
        {children}
      </Box>
    )}
  </Draggable>
);

const Dnd = () => {
  const [column1, setColumn1] = useState(["column2-item-3", "column2-item-4"]); // IDs for items in column 1
  const [column2, setColumn2] = useState([]); // IDs for items in column 2

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination, do nothing
    if (!destination) return;

    const sourceColumn =
      source.droppableId === "customColumn" ? column1 : column2;
    const destinationColumn =
      destination.droppableId === "customColumn" ? column1 : column2;
    const setSourceColumn =
      source.droppableId === "customColumn" ? setColumn1 : setColumn2;
    const setDestinationColumn =
      destination.droppableId === "customColumn" ? setColumn1 : setColumn2;

    // If dropped in the same column
    if (source.droppableId === destination.droppableId) {
      const updatedColumn = Array.from(sourceColumn);
      const [movedItem] = updatedColumn.splice(source.index, 1);
      updatedColumn.splice(destination.index, 0, movedItem);
      setSourceColumn(updatedColumn);
    } else {
      // If moved to a different column
      const updatedSource = Array.from(sourceColumn);
      const updatedDestination = Array.from(destinationColumn);

      const [movedItem] = updatedSource.splice(source.index, 1);
      updatedDestination.splice(destination.index, 0, movedItem);

      setSourceColumn(updatedSource);
      setDestinationColumn(updatedDestination);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", gap: "16px" }}
        >
          {/* First Column */}
          <Droppable droppableId="customColumn">
            {(provided, snapshot) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  // backgroundColor: snapshot.isDraggingOver
                  //   ? "lightblue"
                  //   : "lightgrey",
                  backgroundColor: "#acacac",
                  backdropFilter: "blur(5px)",
                  padding: "10px",
                  borderRadius: "5px",
                  minHeight: "90vh",
                  width: "20vw",
                }}
              >
                {column1.includes("column2-item-3") && (
                  <CustomDraggableComponent id="column2-item-3" index={0}>
                    <BasicCard />
                  </CustomDraggableComponent>
                )}
                {column1.includes("column2-item-4") && (
                  <CustomDraggableComponent id="column2-item-4" index={1}>
                    <Box>Hi</Box>
                  </CustomDraggableComponent>
                )}
                {column1.includes("column2-item-5") && (
                  <CustomDraggableComponent id="column2-item-5" index={2}>
                    <TextWithBtn />
                  </CustomDraggableComponent>
                )}

                {provided.placeholder}
              </Box>
            )}
          </Droppable>

          {/* Second Column */}
          <Droppable droppableId="customColumn2">
            {(provided, snapshot) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  backgroundColor: "#acacac",
                  backdropFilter: "blur(5px)",
                  padding: "10px",
                  borderRadius: "5px",
                  minHeight: "90vh",
                  width: "80vw",
                }}
              >
                {column2.includes("column2-item-3") && (
                  <CustomDraggableComponent id="column2-item-3" index={0}>
                    <BasicCard />
                  </CustomDraggableComponent>
                )}
                {column2.includes("column2-item-4") && (
                  <CustomDraggableComponent id="column2-item-4" index={1}>
                    <Box>Hi</Box>
                  </CustomDraggableComponent>
                )}
                {column2.includes("column2-item-5") && (
                  <CustomDraggableComponent id="column2-item-5" index={2}>
                    <TextWithBtn />
                  </CustomDraggableComponent>
                )}

                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default Dnd;
