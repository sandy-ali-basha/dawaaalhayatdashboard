import { useState, useEffect } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as mammoth from "mammoth";
import { FileOpenRounded } from "@mui/icons-material";

const EditorInput = ({ name, initialValue, onChange, errors }) => {
  const [editorContent, setEditorContent] = useState(initialValue || "");

  useEffect(() => {
    if (initialValue) {
      setEditorContent(initialValue);
      onChange(name, initialValue); // Initialize with default value
    }
  }, [initialValue, onChange, name]);

  // Function to handle Word import using mammoth.js
  const handleWordImport = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.warn("No file selected or file reading canceled.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      mammoth
        .convertToHtml({ arrayBuffer })
        .then((result) => {
          const htmlContent = result.value;
          const updatedContent = editorContent + htmlContent;
          setEditorContent(updatedContent);
          onChange(name, updatedContent); // Update the content
        })
        .catch((err) => {
          console.error("Error converting Word document: ", err);
        });
    };
    reader.onerror = (error) => {
      console.error("Error reading file: ", error);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Box
        sx={{
          padding: "10px",
          margin: "10px",
          width: "100%",
          color: "text.primary",
          border: "1px solid",
          borderColor: errors ? "error.main" : "text.primary",
          borderRadius: "5px",
        }}
      >
        <Tooltip title="Import Microsoft Word File">
          <Button variant="outlined" component="label">
            <FileOpenRounded />
            <input
              accept=".doc,.docx"
              type="file"
              hidden
              onChange={handleWordImport}
            />
          </Button>
        </Tooltip>

        <ReactQuill
          value={editorContent}
          onChange={(content) => {
            setEditorContent(content);
            onChange(name, content); // Update the content
          }}
          theme="snow"
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline", "strike"],
              ["clean"],
            ],
          }}
        />
      </Box>
      <Typography sx={{ color: "error.main" }}>{errors}</Typography>
    </>
  );
};

export default EditorInput;
