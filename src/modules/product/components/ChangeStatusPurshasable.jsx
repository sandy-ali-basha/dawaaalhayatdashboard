import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
} from "@mui/material";
import Loader from "components/shared/Loader";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useProduct } from "hooks/product/useProduct";
import { _Product } from "api/product/product";

const ChangeStatusPurchasable = ({ id, currentStatus }) => {
  const { t } = useTranslation("index");
  const { refetch } = useProduct();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState(currentStatus === "always");

  // Setup mutation to toggle status
  const mutation = useMutation(
    () =>
      _Product.updatePurshasable({
        editedID: id,
        formData: {
          purchasable: currentStatus === "always" ? false : true,
        },
      }),
    {
      onSuccess: () => {
        setLoading(false);
        setOpen(false);
        refetch();
      },
      onError: () => setLoading(false),
    }
  );

  // Handle dialog open/close
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle the status change
  const handleToggleChangeStatus = () => {
    setLoading(true);
    mutation.mutate();
  };

  return (
    <>
      <Switch checked={status} onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ color: "text.main", textTransform: "capitalize" }}
        >
          {t("change item status")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "text.main" }}
          >
            {t("Are you sure you want to")} {t("change item status")}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("Disagree")}</Button>
          {loading && <Loader />}
          <Button
            autoFocus
            variant="contained"
            onClick={handleToggleChangeStatus}
            disabled={loading}
          >
            {t("Agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangeStatusPurchasable;
