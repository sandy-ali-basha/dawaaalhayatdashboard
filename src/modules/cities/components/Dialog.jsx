import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Loader from "components/shared/Loader";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDeleteCities } from "hooks/cities/useDeleteCities";
import { useCities } from "hooks/cities/useCities";
import { Box } from "@mui/material";
import deleteImg from "assets/images/trash.png";

const DeleteDialog = ({ id, page, count, products_count }) => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const deletecities = useDeleteCities({ page, count });
  const handleClickOpen = (e) => setOpen(true);
  const handleClose = () => setOpen(false);
  const { refetch } = useCities();
  const DeleteCities = () => {
    setLoading(true);
    deletecities.mutate(id, {
      onSuccess: () => {
        setOpen(false);
        refetch();
      },
    });
  };

  return (
    <React.Fragment>
      <Tooltip
        title={
          products_count !== 0 ? "you can't delete inv with products" : "Delete"
        }
      >
        <span>
          <IconButton disabled={products_count !== 0} onClick={handleClickOpen}>
            <DeleteTwoToneIcon
              sx={{
                color: products_count !== 0 ? "text.secondary" : "error.main",
              }}
            />
          </IconButton>
        </span>
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
          {t("Delete Item")}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: { xs: "100%", md: "40%" }, margin: "0 auto" }}>
            <img src={deleteImg} alt="" style={{ width: "100%" }} />
          </Box>
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
          <Button autoFocus sx={{}} variant="contained" onClick={DeleteCities}>
            {t("Agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteDialog;
