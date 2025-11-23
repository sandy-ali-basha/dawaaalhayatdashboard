import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import EditorInput from "./HomeTextEditor";
import { BoxStyled } from "components/styled/BoxStyled";

const GridUpdate = ({ open, onClose, handleSave }) => {
  const [sections, setSections] = useState([]);

  // Handle text change for title or subtitle
  const handleTextChange = (sectionIndex, lang, field, value) => {
    setSections((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex
          ? {
              ...section,
              [lang]: {
                ...section[lang],
                [field]: value,
              },
            }
          : section
      )
    );
  };

  // Handle image upload per section
  const handleImageChange = (sectionIndex, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSections((prev) =>
      prev.map((section, idx) =>
        idx === sectionIndex ? { ...section, newImage: file } : section
      )
    );
  };

  // Build FormData to submit
  const saveChanges = () => {
    const formData = new FormData();

    sections.forEach((section, index) => {
      // Append titles and subtitles for each language
      ["ar", "en", "kr"].forEach((lang) => {
        formData.append(
          `grid[sections][${index}[title_${lang}]]`,
          section[lang]?.title ?? ""
        );
        formData.append(
          `grid[sections][${index}][description_${lang}]`,
          section[lang]?.subtitle ?? ""
        );
      });

      // Append image
      if (section.newImage) {
        formData.append(
          `grid[sections][${index}][image]`,
          section.newImage
        );
      } else {
        formData.append(`grid[sections][${index}][image]`, section.image ?? "");
      }
    });

    handleSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Home Page Grid</DialogTitle>
      <DialogContent>
        {sections.map((section, sectionIndex) => (
          <BoxStyled sx={{ p: 2, my: 2 }} key={sectionIndex}>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Section {sectionIndex + 1}
            </Typography>
            {["ar", "en", "kr"].map((lang) => (
              <div key={lang}>
                <Typography variant="body1" sx={{ mt: 1 }} color="text.primary">
                  {lang.toUpperCase()}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }} color="text.primary">
                  Title {lang}
                </Typography>

                <EditorInput
                  name={`title-${lang}-${sectionIndex}`}
                  initialValue={section[lang]?.title || ""}
                  onChange={(name, value) =>
                    handleTextChange(sectionIndex, lang, "title", value)
                  }
                />
  <Typography variant="body1" sx={{ mt: 1 }} color="text.primary">
                  Subtitle {lang}
                </Typography>
                <EditorInput
                  name={`subtitle-${lang}-${sectionIndex}`}
                  initialValue={section[lang]?.subtitle || ""}
                  onChange={(name, value) =>
                    handleTextChange(sectionIndex, lang, "subtitle", value)
                  }
                />
              </div>
            ))}

            <TextField
              sx={{ my: 2 }}
              type="file"
              fullWidth
              label="Section Image"
              onChange={(e) => handleImageChange(sectionIndex, e)}
            />
            {section.image && (
              <Typography variant="caption" color="text.secondary">
                Current Image: {section.image}
              </Typography>
            )}
          </BoxStyled>
        ))}

        <Button
          onClick={saveChanges}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save All
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default GridUpdate;
