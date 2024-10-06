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
              [{ header: "1" }, { header: "2" }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"], // Remove formatting button
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "list",
            "bullet",
            "link",
          ]}
        />
      </Box>
      {errors && <Typography sx={{ color: "error.main" }}>{errors}</Typography>}
    </>
  );
};

export default EditorInput;
