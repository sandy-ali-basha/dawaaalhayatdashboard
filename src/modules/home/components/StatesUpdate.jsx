import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import EditorInput from "./HomeTextEditor";

const StatsUpdate = ({ open, onClose, initialData, handleSave }) => {
  const [status, setStatus] = useState(initialData);

  // Update the state when initialData changes
  useEffect(() => {
    setStatus(initialData);
  }, [initialData]);

  // Handle change for title and subtitle fields in different languages
  const handleChange = (e, lang, field) => {
    const value = e.target.value;
    setStatus((prevStatus) => ({
      ...prevStatus,
      value: {
        ...prevStatus.value,
        [lang]: {
          ...prevStatus.value[lang],
          [field]: value,
        },
      },
    }));
  };

  // Handle change for info fields
  const handleInfoChange = (e, lang, index, field) => {
    const value = e.target.value;
    setStatus((prevStatus) => {
      const updatedInfo = [...prevStatus.value.info]; // Copy the info array
      if (!updatedInfo[index]) {
        updatedInfo[index] = {}; // Ensure index exists
      }
      if (field === "number") {
        updatedInfo[index][field] = value; // Update number field
      } else {
        if (!updatedInfo[index][lang]) {
          updatedInfo[index][lang] = {}; // Ensure language object exists
        }
        updatedInfo[index][lang][field] = value; // Update text field
      }
      return {
        ...prevStatus,
        value: {
          ...prevStatus.value,
          info: updatedInfo,
        },
      };
    });
  };
  
  // Save changes
  const saveChanges = () => {
    // Ensure the correct structure before sending data
    const updatedStatus = {
      ...status,
      value: {
        ...status.value,
      },
    };

    handleSave(updatedStatus); // Send the updated status to the parent component
  };

  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Status</DialogTitle>
      <DialogContent>
        {["ar", "en", "kr"].map((lang) => (
          <div key={lang}>
            <Typography variant="body1">{lang}</Typography>
            {/* Title 1 */}
            <TextField
              sx={{ my: 1 }}
              label={`Title 1 (${lang})`}
              defaultValue={status?.value[lang]?.title1 || ""}
              onChange={(e) => handleChange(e, lang, "title1")}
              fullWidth
            />
            {/* Subtitle 1 */}
            <Typography variant="body1">Subtitle 1 ({lang})</Typography>
            <EditorInput
              initialValue={status?.value[lang]?.subtitle1 || ""}
              onChange={(name, value) => {
                setStatus((prevStatus) => ({
                  ...prevStatus,
                  value: {
                    ...prevStatus.value,
                    [lang]: {
                      ...prevStatus.value[lang],
                      subtitle1: value,
                    },
                  },
                }));
              }}
            />
            {/* Title 2 */}
            <Typography variant="body1">Title 2 ({lang})</Typography>
            <TextField
              sx={{ my: 1 }}
              label={`Title 2 (${lang})`}
              defaultValue={status?.value[lang]?.title2 || ""}
              onChange={(e) => handleChange(e, lang, "title2")}
              fullWidth
            />
            {/* Subtitle 2 */}
            <Typography variant="body1">Subtitle 2 ({lang})</Typography>
            <EditorInput
              initialValue={status?.value[lang]?.subtitle2 || ""}
              onChange={(name, value) => {
                setStatus((prevStatus) => ({
                  ...prevStatus,
                  value: {
                    ...prevStatus.value,
                    [lang]: {
                      ...prevStatus.value[lang],
                      subtitle2: value,
                    },
                  },
                }));
              }}
            />
          </div>
        ))}

        <hr />
        <Typography>INFO</Typography>
        <Grid container spacing={1}>
          {["ar", "en", "kr"].map((lang) => (
            <>
              <Grid item xs={12}>
                <Typography>{lang}</Typography>
              </Grid>
              {[0, 1, 2].map((index) => (
                <Grid item xs={4} key={`${lang}-${index}`}>
                  <Typography variant="body1">
                    Info {index + 1} ({lang})
                  </Typography>
                  {/* Info text */}
                  <TextField
                    sx={{ my: 1 }}
                    label={`Info (${lang})`}
                    defaultValue={
                      Array.isArray(status?.value?.info) &&
                      status?.value.info[index]?.[lang]?.text
                        ? status?.value.info[index]?.[lang]?.text
                        : ""
                    }
                    onChange={(e) => handleInfoChange(e, lang, index, "text")}
                    fullWidth
                  />
                </Grid>
              ))}
            </>
          ))}
          <Grid item xs={12}>
            <Typography>Numbers</Typography>
          </Grid>
          {[0, 1, 2].map((index) => (
            <Grid item xs={4} key={`number-${index}`}>
              <Typography variant="body1">Info {index + 1} Number</Typography>
              {/* Info number */}
              <TextField
                sx={{ my: 1 }}
                label={`Info number`}
                value={
                  Array.isArray(status?.value?.info) &&
                  status?.value?.info[index]?.number
                    ? status.value.info[index].number
                    : ""
                }
                onChange={(e) => handleInfoChange(e, null, index, "number")}
                fullWidth
              />
            </Grid>
          ))}
        </Grid>

        <Button onClick={saveChanges} variant="contained" color="primary">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default StatsUpdate;
