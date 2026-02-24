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
import { useChangeStatus } from "modules/home/hooks/useChangeStatus";
import { useQueryClient } from "react-query";

const ChangeStatus = ({ id, children,  type }) => {
  const { t } = useTranslation("index");
  const changeStatus = useChangeStatus({
    id: id,
    type: type,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (e) => setOpen(true);
  const handleClose = () => setOpen(false);
  const queryClient = useQueryClient();

  const handleToggleChangeStatus = () => {
    setLoading(true);
    changeStatus.mutate(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["home"]);
          queryClient.invalidateQueries(["getHomeSection", id]);
          setOpen(false);
          setLoading(false);
        },
      }
    );
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {children}
      </Button>
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
          {t("change item status")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "text.main" }}
          >
            {t("Are you Sure you want to")} {t("change item status")}?
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

export default ChangeStatus;
