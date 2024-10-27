import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

import { useState, useEffect } from "react";
import EditorInput from "./HomeTextEditor";

const TextSectionOneUpdate = ({ open, onClose, initialData, handleSave }) => {
  const [data, setData] = useState({
    textSectionOne: {
      ar: "",
      en: "",
      kr: "",
    },
    image: null, // Initialize the image as null
  });

  // Populate initial data when the dialog opens
  useEffect(() => {
    if (initialData) {
      setData((prev) => ({
        ...prev,
        textSectionOne: {
          ar: initialData.value.text.ar || "",
          en: initialData.value.text.en || "",
          kr: initialData.value.text.kr || "",
        },
        image: initialData.value.image || null, // Initialize image if available
      }));
    }
  }, [initialData, open]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setData((prev) => ({
      ...prev,
      image: file, // Store the file in the state
    }));
  };

  const saveChanges = () => {
    const formDataNew = new FormData();

    for (const lang of ["ar", "en", "kr"]) {
      if (data.textSectionOne && data.textSectionOne[lang]) {
        formDataNew.append(
          `textSectionOne[text][${lang}]`,
          data.textSectionOne[lang]
        );
      } else formDataNew.append(`textSectionOne[text][${lang}]`, " ");
    }

    // Append image file if available
    if (data.image) {
      formDataNew.append("textSectionOne[image_file]", data.image);
    } else {
      formDataNew.append("textSectionOne[image_file]", "");
    }

    // Call the save function with the formData containing text and image data
    handleSave(formDataNew);

    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Text Section One</DialogTitle>
      <DialogContent>
        {["ar", "en", "kr"].map((lang) => (
          <div key={lang}>
            <Typography
              variant="body1"
              color="text.primary"
            >{`Text ${lang}`}</Typography>
            <EditorInput
              sx={{ my: 2 }}
              name={`Text ${lang}`} // Use a naming convention that suits your structure
              initialValue={data.textSectionOne[lang] || ""}
              onChange={(name, value) => {
                setData((prev) => ({
                  ...prev,
                  textSectionOne: {
                    ...prev.textSectionOne,
                    [lang]: value, // Update the specific language content
                  },
                }));
              }}
            />
          </div>
        ))}
        <TextField
          sx={{ my: 2 }}
          type="file"
          label="Image"
          onChange={handleImageChange} // Update the image file on change
          fullWidth
        />
        <Button onClick={saveChanges} variant="contained" color="primary">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TextSectionOneUpdate;
