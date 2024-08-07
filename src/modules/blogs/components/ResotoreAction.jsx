import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Loader from "components/shared/Loader";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRestore } from "../hooks/useRestore";
import { useProduct } from "hooks/product/useProduct";

const ResotoreAction = ({ id, children, action }) => {
  const { t } = useTranslation("index");
  const { refetch } = useProduct();
  const restorItem = useRestore({ id: id, isActive: action });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleRestore = () => {
    setLoading(true);
    restorItem.mutate(
      {},
      {
        onSuccess: () => {
          setOpen(false);
          setLoading(false);
          refetch();
        },
      }
    );
  };

  return (
    <>
      <Button onClick={handleClickOpen}>{children}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "&.MuiDialog-container": {
            backgroundColor: "red",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ color: "text.main", textTransform: "capitalize" }}
        >
          {action ? t("Restore") : t("Restore")} {t("Item")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "text.main" }}
          >
            {t("Are you Sure you want to")}{" "}
            {action ? t("Restore") : t("Restore")} {t("Item")}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("Disagree")}</Button>
          {loading && <Loader />}

          <Button autoFocus variant="contained" onClick={handleToggleRestore}>
            {t("Agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResotoreAction;
