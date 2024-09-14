import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillBetterTable from "quill-better-table";
import "quill-better-table/dist/quill-better-table.css";
import { Box, Typography } from "@mui/material";

Quill.register(
  {
    "modules/better-table": QuillBetterTable,
  },
  true
);

const EditorInput = ({
  control,
  register,
  name,
  setValue,
  errors,
  initialValue,
}) => {
  const [editorValue, setEditorValue] = useState(initialValue || "");

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [{ header: "1" }, { header: "2" }, { align: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["table"], // Add table button
      ["clean"], // remove formatting button
    ],
    table: true,
    "better-table": {
      operationMenu: {
        items: {
          unmergeCells: {
            text: "Unmerge cells",
          },
        },
        color: {
          colors: [
            "#fff",
            "red",
            "blue",
            "green",
            "yellow",
            "orange",
            "purple",
          ],
        },
      },
    },
    keyboard: {
      bindings: QuillBetterTable.keyboardBindings,
    },
  };

  const formats = [
    "font",
    "size",
    "header",
    "align",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "sub",
    "super",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
    "table", // Add table to formats
  ];

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorValue(content);
    setValue(name, content);
  };

  return (
    <>
      <Box
        sx={{
          color: "text.main",
          border: "1px solid",
          borderColor: errors ? "error.main" : "text.main",
          padding: "10px",
          borderRadius: "5px",
          margin: "10px",
          width: "100%",
        }}
      >
        <ReactQuill
          value={editorValue}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          theme="snow"
        />
      </Box>
      <Typography sx={{ color: "error.main" }}>{errors}</Typography>
    </>
  );
};

export default EditorInput;
