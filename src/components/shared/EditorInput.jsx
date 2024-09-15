import { useState, useEffect } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as mammoth from "mammoth";
import { FileOpenRounded } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { useSnackbar } from "notistack";

const EditorInput = ({
  control,
  register,
  name,
  setValue,
  errors,
  initialValue,
}) => {
  const [editorContent, setEditorContent] = useState(initialValue || "");

  useEffect(() => {
    if (initialValue) {
      setEditorContent(initialValue);
      setValue(name, initialValue); // Initialize with default value
    }
  }, [initialValue, setValue, name]);

  // Function to handle Word import using mammoth.js
  const handleWordImport = (event) => {
    // Get the file from the input
    const file = event.target.files[0];

    // Check if a file was selected
    if (!file) {
      console.warn("No file selected or file reading canceled.");
      return;
    }

    // Check if the file is a Blob (i.e., a valid file object)
    if (!(file instanceof Blob)) {
      console.error("Selected file is not of type 'Blob'.");
      return;
    }

    // Initialize FileReader
    const reader = new FileReader();

    // Define the onload event for the FileReader
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;

      // Convert the ArrayBuffer to HTML using mammoth.js
      mammoth
        .convertToHtml({ arrayBuffer })
        .then((result) => {
          const htmlContent = result.value;
          const updatedContent = editorContent + htmlContent;
          setEditorContent(updatedContent);
          setValue(name, updatedContent); // Update the form field with the converted content
        })
        .catch((err) => {
          console.error("Error converting Word document: ", err);
        });
    };

    // Define the onerror event for the FileReader
    reader.onerror = (error) => {
      console.error("Error reading file: ", error);
      
    };

    // Read the file as an ArrayBuffer
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

        <Controller
          control={control}
          name={name}
          {...register(name)}
          render={({ field }) => (
            <ReactQuill
              value={editorContent}
              onChange={(content) => {
                setEditorContent(content);
                setValue(name, content); // Update the form field with the content
              }}
              theme="snow"
              modules={{
                toolbar: [
                  [
                    {
                      color: [
                        "#000000",
                        "#FFFFFF",
                        "#FF0000",
                        "#E60000",
                        "#FF4D4D",
                        "#FFA500",
                        "#FF9900",
                        "#FFCC00",
                        "#FFFF00",
                        "#FFD700",
                        "#008000",
                        "#00CC00",
                        "#00FF00",
                        "#008080",
                        "#00CED1",
                        "#0000FF",
                        "#0066CC",
                        "#6699FF",
                        "#4B0082",
                        "#9933FF",
                        "#800080",
                        "#A52A2A",
                        "#D2691E",
                        "#8B4513",
                        "#808080",
                        "#A9A9A9",
                        "#C0C0C0",
                      ],
                    },
                  ],
                  [
                    {
                      background: [
                        "#FFFFFF",
                        "#F5F5F5",
                        "#FF4D4D",
                        "#FFE4E1",
                        "#FF9900",
                        "#FFF8E1",
                        "#FFFF99",
                        "#FFFFE0",
                        "#00CC00",
                        "#E6FFE6",
                        "#00CED1",
                        "#E0FFFF",
                        "#6699FF",
                        "#E0EFFF",
                        "#9933FF",
                        "#E6E6FA",
                        "#D3D3D3",
                        "#F5F5F5",
                        "#000000",
                        "#333333",
                      ],
                    },
                  ],
                  [{ font: [] }],
                  [{ size: ["small", false, "large", "huge"] }],
                  [{ header: "1" }, { header: "2" }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ script: "sub" }, { script: "super" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  [{ direction: "rtl" }],
                  [{ align: [] }],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "script",
                "indent",
                "direction",
                "align",
                "link",
                "image",
                "video",
                "color",
                "background",
              ]}
              {...field}
            />
          )}
        />
      </Box>
      <Typography sx={{ color: "error.main" }}>{errors}</Typography>
    </>
  );
};

export default EditorInput;
