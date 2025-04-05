import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify"; // For sanitizing the HTML content

const TextEditor = ({ editorContent, setEditorContent }) => {
  // Function to clean up empty <p><br></p> and other unnecessary tags
  const cleanEditorContent = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Remove all <p><br></p> or empty <p> tags
    tempDiv.querySelectorAll("p").forEach((p) => {
      if (p.innerHTML.trim() === "" || p.innerHTML.trim() === "<br>") {
        p.remove();
      }
    });

    return DOMPurify.sanitize(tempDiv.innerHTML);
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
        <ReactQuill
          value={editorContent}
          onChange={(content) => {
            const cleanedContent = cleanEditorContent(content);
            setEditorContent(cleanedContent);
          }}
          onBlur={() => {
            const cleanedContent = cleanEditorContent(editorContent);
            setEditorContent(cleanedContent);
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
        />
      </Box>
    </>
  );
};

export default TextEditor;
