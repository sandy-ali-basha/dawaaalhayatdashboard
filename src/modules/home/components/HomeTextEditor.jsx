import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorInput = ({ name, initialValue, onChange, errors }) => {
  const [editorContent, setEditorContent] = useState(initialValue || "");
  const quillRef = useRef(null);

  // Set the initial content of the editor when initialValue changes
  useEffect(() => {
    if (initialValue) {
      setEditorContent(initialValue);
    }
  }, [initialValue, onChange, name]);

  // Handle change in the editor and trigger onChange prop
  const handleEditorChange = (content) => {
    setEditorContent(content);
    onChange(name, content);
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
        <ReactQuill
          ref={quillRef}
          value={editorContent}
          onChange={handleEditorChange}
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
        />
      </Box>
      {errors && <Typography sx={{ color: "error.main" }}>{errors}</Typography>}
    </>
  );
};

export default EditorInput;
