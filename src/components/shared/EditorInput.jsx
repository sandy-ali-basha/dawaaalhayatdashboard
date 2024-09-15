import { useState } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as mammoth from "mammoth";
import { FileOpenRounded } from "@mui/icons-material";

const EditorInput = ({ setValue }) => {
  const [editorContent, setEditorContent] = useState("");

  // Function to handle Word import using mammoth.js
  const handleWordImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      mammoth
        .convertToHtml({ arrayBuffer })
        .then((result) => {
          const htmlContent = result.value;
          setEditorContent(editorContent + htmlContent);
          setValue("content", editorContent + htmlContent); // Update the form field with the converted content
        })
        .catch((err) => {
          console.error("Error converting Word document: ", err);
        });
    };

    reader.readAsArrayBuffer(file); // Reads the file as an ArrayBuffer to process with mammoth.js
  };

  return (
    <>
      <Box
        sx={{
          padding: "10px",
          margin: "10px",
          width: "100%",
          color: "text.primary",
        }}
      >
        <Tooltip label="import Microsoft Word File">
          <Button variant="outlined" component="label">
            <FileOpenRounded />
            <input type="file" hidden onChange={handleWordImport} />
          </Button>
        </Tooltip>
        <ReactQuill
          value={editorContent}
          onChange={(content) => {
            setEditorContent(content);
            setValue("content", content);
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
              [{ font: [] }], // Add more fonts
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: "1" }, { header: "2" }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
              [{ indent: "-1" }, { indent: "+1" }], // Indentation
              [{ direction: "rtl" }], // Text direction
              [{ align: [] }], // Text alignment
              ["link", "image", "video"],

              ["clean"], // Remove formatting
            ],
          }}
          formats={[
            "header",
            "font", // Font family
            "size", // Font size
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "script", // Superscript/subscript
            "indent", // Indentation
            "direction", // Text direction
            "align", // Text alignment
            "link",
            "image",
            "video",
            "color", // Text color
            "background", // Background color
          ]}
        />
      </Box>
    </>
  );
};

export default EditorInput;
