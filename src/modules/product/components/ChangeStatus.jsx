
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
  import { useChangeStatus } from "../hooks/useChangeStatus";
  import { useProduct } from "hooks/product/useProduct";
  const ChangeStatus = ({ id, children, action }) => {
    const { t } = useTranslation("index")
    const { refetch } = useProduct()
    const changeStatus = useChangeStatus({ id: id, is_blocked: action });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (e) => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleToggleChangeStatus = () => {
      setLoading(true);
      changeStatus.mutate({}, {
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
              backgroundColor: "error.main",
            },
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ color: "primary.main", textTransform: "capitalize" }}
          >
            {t('change item status')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ color: "primary.main" }}
            >
              {t("Are you Sure you want to")}{" "}
              {t('change item status')}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t("Disagree")}</Button>
            {loading && <Loader />}
            <Button
              autoFocus
              variant="contained"
              onClick={handleToggleChangeStatus}
            >
              {t("Agree")}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
  
  export default ChangeStatus;
  