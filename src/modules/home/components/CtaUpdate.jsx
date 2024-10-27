import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

const CtaUpdate = ({ open, onClose, initialData, handleSave }) => {
  const [cta, setCta] = useState(initialData);
  // Update the cta state when initialData changes
  useEffect(() => {
    if (initialData) {
      setCta(initialData);
    }
  }, [initialData]);

  const handleChange = (e, lang, field) => {
    setCta((prevCta) => ({
      ...prevCta,
      cta: {
        ...prevCta.value,
        [field]: {
          ...prevCta?.value?.[field], // Ensure field exists before accessing lang
          [lang]: e.target.value,
        },
      },
    }));
  };

  const saveChanges = () => {
    const formDataNew = new FormData();

    // Append CTA data
    for (const lang of ["ar", "en", "kr"]) {
      if (cta?.cta && cta?.cta?.subtitle[lang]) {
        formDataNew.append(`cta[subtitle][${lang}]`, cta?.cta?.subtitle[lang]);
      } else formDataNew.append(`cta[subtitle][${lang}]`, " ");
      if (cta?.cta && cta?.cta?.title[lang]) {
        formDataNew.append(`cta[title][${lang}]`, cta?.cta?.title[lang]);
      } else formDataNew.append(`cta[title][${lang}]`, " ");
    }
   
    handleSave(formDataNew); // Pass the updated cta object to the save handler
    console.log(formDataNew);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit CTA</DialogTitle>
      <DialogContent>
        {["ar", "en", "kr"].map((lang) => (
          <div key={lang}>
            <TextField
              sx={{ my: 1 }}
              label={`Title (${lang})`}
              defaultValue={cta?.value?.title?.[lang] || ""} // Use value instead of defaultValue, safely access title
              onChange={(e) => handleChange(e, lang, "title")}
              fullWidth
            />
            <TextField
              sx={{ my: 1 }}
              label={`Subtitle (${lang})`}
              defaultValue={cta?.value?.subtitle?.[lang] || ""} // Use value instead of defaultValue, safely access subtitle
              onChange={(e) => handleChange(e, lang, "subtitle")}
              fullWidth
            />
          </div>
        ))}
        <TextField
          sx={{ my: 1 }}
          label="Link"
          defaultValue={cta?.value?.link || ""} // Use value instead of defaultValue
          onChange={(e) =>
            setCta({ ...cta, cta: { ...cta.value, link: e.target.value } })
          }
          fullWidth
        />
        <Button
          sx={{ my: 1 }}
          onClick={saveChanges}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CtaUpdate;
