import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

const EditorInput = ({
  control,
  register,
  name,
  setValue,
  errors,
  initialValue,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (initialValue) {
      const blocksFromHTML = convertFromHTML(initialValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [initialValue]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const currentContent = editorState.getCurrentContent();
    const rawContent = convertToRaw(currentContent);
    setValue(name, draftToHtml(rawContent));
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
        <Controller
          control={control}
          name={name}
          {...register(name)}
          render={({ field }) => (
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
            />
          )}
        />
      </Box>
      <Typography sx={{ color: "error.main" }}>{errors}</Typography>
    </>
  );
};

export default EditorInput;
