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

const TextSectionTwoUpdate = ({ open, onClose, initialData, handleSave }) => {
  const [data, setData] = useState({
    textSectionTwo: {
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
        textSectionTwo: {
          ar: initialData.value.text.ar || "",
          en: initialData.value.text.en || "",
          kr: initialData.value.text.kr || "",
        },
      }));
    }
  }, [initialData, open]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setData((prev) => ({
      ...prev,
      textSectionTwoImage: {
        image: file, // Store the file in the state
      },
    }));
  };

  const saveChanges = () => {
    const formDataNew = new FormData();
    if (data) {
      if (data?.textSectionTwoImage?.image)
        formDataNew.append(
          "textSectionTwo[image_file]",
          data.textSectionTwoImage?.image
        );
      else formDataNew.append("textSectionTwo[image_file]", " ");
      for (const lang of ["ar", "en", "kr"]) {
        if (data.textSectionTwo && data.textSectionTwo[lang]) {
          formDataNew.append(
            `textSectionTwo[text][${lang}]`,
            data.textSectionTwo[lang]
          );
        } else formDataNew.append(`textSectionTwo[text][${lang}]`, " ");
      }
    }
    if (data) handleSave(formDataNew); // Call the save function with the updated data
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Text Section Two</DialogTitle>
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
              initialValue={data.textSectionTwo[lang] || ""}
              onChange={(name, value) => {
                setData((prev) => ({
                  ...prev,
                  textSectionTwo: {
                    ...prev.textSectionTwo,
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

export default TextSectionTwoUpdate;
