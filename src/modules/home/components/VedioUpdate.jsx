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
  const [newData, setNewData] = useState({}); // Initialize text translations

  // Function to save changes and close the dialog
  const saveChanges = () => {
    if (newData) {
      handleSave(newData); // Pass updated data to the save handler
    }
    onClose(); // Close the dialog
  };

  // Handle change for text translations
  const handleTextChange = (e, lang) => {
    const updatedText = e.target.value;
    setNewData((prevText) => ({
      ...prevText,
      videoText: {
        [lang]: updatedText,
      },
    }));
  };

  // Handle change for video file
  const handleVideoChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input

    if (file) {
      const videoUrl = URL.createObjectURL(file); // Create a URL for the video file
      setNewData((prevVideo) => ({
        ...prevVideo,
        video: videoUrl, // Store the video URL
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
          type={"file"}
          onChange={handleVideoChange}
          fullWidth
        />

        {/* Input fields for each language text */}
        {["ar", "en", "kr"].map((lang) => (
          <TextField
            sx={{ my: 2 }}
            key={lang}
            label={`Text (${lang})`}
            defaultValue={initialTextData?.value[lang] || ""} // Correctly access text for each language
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
