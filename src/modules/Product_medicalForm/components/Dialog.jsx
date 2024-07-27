
  import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Loader from "components/shared/Loader";
import { Tooltip } from "@mui/material";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { useDeleteProduct_medicalForm } from "hooks/Product_medicalForm/useDeleteProduct_medicalForm";
import { useProduct_medicalForm } from "hooks/Product_medicalForm/useProduct_medicalForm";
const DeleteDialog = ({ id, page, count }) => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const deleteProduct_medicalForm = useDeleteProduct_medicalForm({ page, count });
  const handleClickOpen = (e) => setOpen(true)
  const handleClose = () => setOpen(false)
  const { refetch } = useProduct_medicalForm();
  const DeleteProduct_medicalForm = () => {
    setLoading(true);
    deleteProduct_medicalForm.mutate(id, {
      onSuccess: () => {
        setOpen(false);
        refetch()
      },
    });
  }
  const { direction } = settingsStore();
  return (
    <React.Fragment>
      <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
        <DeleteTwoToneIcon
          sx={{ color: "error.main" }}
          onClick={handleClickOpen}
        />
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-container": {
            backgroundColor: "error.main",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "primary.main" }}>
          {t("Delete Item")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "primary.main" }}
          >
            {t("Are you Sure you want to Delete it ?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('Disagree')}</Button>
          {loading && <Loader />}
          <Button autoFocus sx={{}} variant="contained" onClick={DeleteProduct_medicalForm}>
            {t("Agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteDialog;
