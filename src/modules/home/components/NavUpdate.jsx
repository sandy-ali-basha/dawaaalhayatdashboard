import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";

const languages = ["ar", "en", "kr"];

const NavUpdate = ({ open, onClose, initialData, handleSave }) => {
  const [nav, setNav] = useState({
    value: {
      ar: { title: "", text: "" },
      en: { title: "", text: "" },
      kr: { title: "", text: "" },
      link: "",
    },
  });

  useEffect(() => {
    if (!initialData) return;

    setNav((prev) => ({
      ...prev,
      value: {
        ...prev.value,
        ...initialData.value,
        ar: {
          title: initialData.value?.ar?.title ?? "",
          text: initialData.value?.ar?.text ?? "",
        },
        en: {
          title: initialData.value?.en?.title ?? "",
          text: initialData.value?.en?.text ?? "",
        },
        kr: {
          title: initialData.value?.kr?.title ?? "",
          text: initialData.value?.kr?.text ?? "",
        },
        link: initialData.value?.link ?? "",
      },
    }));
  }, [initialData]);

  const handleLangChange = (lang, field, value) => {
    setNav((prev) => ({
      ...prev,
      value: {
        ...prev.value,
        [lang]: {
          ...(prev.value?.[lang] ?? {}),
          [field]: value,
        },
      },
    }));
  };

  const saveChanges = () => {
    const formDataNew = new FormData();
    formDataNew.append("id", 85);
    formDataNew.append("name", "home.page.navbar");

    languages.forEach((lang) => {
      formDataNew.append(
        `navbar[${lang}][title]`,
        nav?.value?.[lang]?.title ?? " "
      );
      formDataNew.append(
        `navbar[${lang}][text]`,
        nav?.value?.[lang]?.text ?? " "
      );
    });

    formDataNew.append("navbar[link]", nav?.value?.link ?? " ");

    handleSave(formDataNew);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Navigation</DialogTitle>
      <DialogContent>
        {languages.map((lang) => (
          <div key={lang}>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              {lang.toUpperCase()}
            </Typography>
            <TextField
              sx={{ my: 1 }}
              label={`Title (${lang})`}
              value={nav?.value?.[lang]?.title ?? ""}
              onChange={(e) => handleLangChange(lang, "title", e.target.value)}
              fullWidth
            />
            <TextField
              sx={{ my: 1 }}
              label={`Text (${lang})`}
              value={nav?.value?.[lang]?.text ?? ""}
              multiline
              minRows={2}
              onChange={(e) => handleLangChange(lang, "text", e.target.value)}
              fullWidth
            />
          </div>
        ))}
        <TextField
          sx={{ my: 2 }}
          label="Link"
          value={nav?.value?.link ?? ""}
          onChange={(e) =>
            setNav((prev) => ({
              ...prev,
              value: { ...prev.value, link: e.target.value },
            }))
          }
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={saveChanges} sx={{ mb: 1 }}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NavUpdate;
