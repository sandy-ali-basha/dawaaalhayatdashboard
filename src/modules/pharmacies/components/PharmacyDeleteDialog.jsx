import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Loader from "components/shared/Loader";
import { useTranslation } from "react-i18next";
import { useDeletePharmacy } from "hooks/pharmacies/useDeletePharmacy";

const PharmacyDeleteDialog = ({ id }) => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const deletePharmacy = useDeletePharmacy();

  const handleDelete = () => {
    setLoading(true);
    deletePharmacy.mutate(id, {
      onSuccess: () => setOpen(false),
      onSettled: () => setLoading(false),
    });
  };

  return (
    <>
      <Tooltip title={t("Delete") ?? "Delete"}>
        <DeleteTwoToneIcon
          sx={{ color: "error.main", cursor: "pointer" }}
          onClick={() => setOpen(true)}
        />
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ color: "text.main" }}>
          {t("Delete Item")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "text.main" }}>
            {t("Are you Sure you want to Delete it ?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t("Disagree")}</Button>
          {loading && <Loader />}
          <Button variant="contained" onClick={handleDelete}>
            {t("Agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PharmacyDeleteDialog;
