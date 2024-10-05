import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import EditorInput from "./HomeTextEditor";

const StatsUpdate = ({ open, onClose, initialData, handleSave }) => {
  const [stats, setStats] = useState(initialData);

  // Update the state when initialData changes
  useEffect(() => { 
    setStats(initialData);
  }, [initialData]);

  
  const handleChange = (e, lang, field) => {
    setStats((prevStats) => ({
      ...prevStats,
      status: {
        ...prevStats.value,
        [lang]: {
          ...prevStats.value[lang],
          [field]: e.target.value,
        },
      },
    }));
  };

  const saveChanges = () => {
    handleSave(stats);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Stats</DialogTitle>
      <DialogContent>
        {["ar", "en", "kr"].map((lang) => (
          <div key={lang}>
            <Typography variant="body1" color="initial">
              {lang}
            </Typography>
            <TextField
              sx={{ my: 1 }}
              label={`Title 1 (${lang})`}
              defaultValue={stats?.value[lang]?.title1 || ""}
              onChange={(e) => handleChange(e, lang, "title1")}
              fullWidth
            />
            {/* Replace Subtitle 1 with EditorInput */}
            <Typography variant="body1" color="text.primary">
              Subtitle 1 ({lang})
            </Typography>
            <EditorInput
              initialValue={stats?.value[lang]?.subtitle1 || ""}
              onChange={(name, value) => {
                setStats((prevStats) => ({
                  ...prevStats,
                  value: {
                    ...prevStats.value,
                    [lang]: {
                      ...prevStats.value[lang],
                      subtitle1: value,
                    },
                  },
                }));
              }}
            />
            <TextField
              sx={{ my: 1 }}
              label={`Title 2 (${lang})`}
              defaultValue={stats?.value[lang]?.title2 || ""}
              onChange={(e) => handleChange(e, lang, "title2")}
              fullWidth
            />
            {/* Replace Subtitle 2 with EditorInput */}
            <Typography variant="body1" color="text.primary">
              Subtitle 2 ({lang})
            </Typography>
            <EditorInput
              initialValue={stats?.value[lang]?.subtitle2 || ""}
              onChange={(name, value) => {
                setStats((prevStats) => ({
                  ...prevStats,
                  value: {
                    ...prevStats.value,
                    [lang]: {
                      ...prevStats.value[lang],
                      subtitle2: value,
                    },
                  },
                }));
              }}
            />
          </div>
        ))}
        <Button onClick={saveChanges} variant="contained" color="primary">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default StatsUpdate;
