import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

const VideoUpdate = ({
  open,
  onClose,
  initialVideoData,
  initialTextData,
  handleSave,
}) => {
  const [newData, setNewData] = useState({
    videoText: initialTextData?.value || {}, // Initialize with the provided initial text data
    video:  null, // Initialize with the provided initial video data
  });
console.log("newData",newData)
  // Function to save changes and close the dialog

  const saveChanges = () => {
    const formDataNew = new FormData()
    if (newData.video) {
      formDataNew.append("video[vfile]", newData.video); // Append video file
    } else formDataNew.append("video[vfile]", " ");

     // Append videoText data
    for (const lang of ["ar", "en", "kr"]) {
      if (newData.videoText && newData.videoText[lang]) {
        formDataNew.append(`videoText[${lang}]`, newData.videoText[lang]);
      } else formDataNew.append(`videoText[${lang}]`, "");
    }

    handleSave(formDataNew); // Pass updated data to the save handler
    onClose(); // Close the dialog
  };

  // Handle change for text translations
  const handleTextChange = (e, lang) => {
    const updatedText = e.target.value;
    setNewData((prevData) => ({
      ...prevData,
      videoText: {
        ...prevData.videoText, // Preserve existing text for other languages
        [lang]: updatedText,   // Update the specific language text
      },
    }));
  };

  // Handle change for video file
  const handleVideoChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input

    if (file) {
      setNewData((prevData) => ({
        ...prevData,
        video: file, // Store the new video file
      }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Video</DialogTitle>
      <DialogContent>
        {/* Input field for video file */}
        <TextField
          sx={{ my: 2 }}
          label="Video File"
          type="file"
          onChange={handleVideoChange}
          fullWidth
        />

        {/* Input fields for each language text */}
        {["ar", "en", "kr"].map((lang) => (
          <TextField
            sx={{ my: 2 }}
            key={lang}
            label={`Text (${lang})`}
            defaultValue={initialTextData?.value[lang] || ""} // Set initial value for each language
            onChange={(e) => handleTextChange(e, lang)}
            fullWidth
          />
        ))}

        {/* Save button */}
        <Button onClick={saveChanges} variant="contained" color="primary">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default VideoUpdate;
