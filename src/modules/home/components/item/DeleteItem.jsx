import React, { useState } from "react";
import { useQueryClient } from "react-query";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "components/shared/Loader";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FolderDeleteOutlined } from "@mui/icons-material";
import { useDeleteItem } from "hooks/home/useDeleteItem";

const DeleteItem = ({ id, sectionId }) => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const delete_item = useDeleteItem();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const Delete_item = () => {
    setLoading(true);
    delete_item.mutate(id, {
      onSuccess: () => {
        setOpen(false);
        queryClient.invalidateQueries(["getHomeSection", sectionId]);
      },
    });
  };

  return (
    <React.Fragment>
      <Tooltip title={"Delete slide"}>
        <FolderDeleteOutlined
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
        <DialogTitle id="alert-dialog-title" sx={{ color: "text.main" }}>
          {t("Delete item")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "text.main" }}
          >
            {t("Are you Sure you want to Delete it ?")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("Disagree")}</Button>
          {loading && <Loader />}
          <Button
            autoFocus
            sx={{}}
            variant="contained"
            onClick={Delete_item}
          >
            {t("Agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteItem;
