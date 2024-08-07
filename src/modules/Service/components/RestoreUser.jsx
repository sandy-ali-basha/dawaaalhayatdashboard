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
// import { useServiceprovidor } from "hooks/serviceprovidor/useServiceprovidor";
import { useRestore } from "../hooks/useRestore";

const RestoreUser = ({ id, action, open, setOpen }) => {
  const { t } = useTranslation("index");
  // const { refetch } = useServiceprovidor()
  const changeStatus = useRestore({ id: id, is_blocked: action });
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const handleToggleChangeStatus = () => {
    setLoading(true);
    changeStatus.mutate(
      {},
      {
        onSuccess: () => {
          setOpen(false);
          setLoading(false);
          //   refetch();
        },
      }
    );
  };

  return (
    <>
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
          sx={{ color: "text.main", textTransform: "capitalize" }}
        >
          {t("RESTORE")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "text.main" }}
          >
            {t("Are you Sure you want to")} {t("Restore")}?
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
  );
};

export default RestoreUser;
