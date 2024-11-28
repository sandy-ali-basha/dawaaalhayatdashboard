import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "components/shared/Loader";
import { useTranslation } from "react-i18next";
import { useDeleteProduct } from "hooks/product/useDeleteProduct";
import { useProduct } from "hooks/product/useProduct";
import { Box } from "@mui/material";
import deleteImg from "assets/images/trash.png"

const DeleteDialog = ({ id, page, count, open, setOpen }) => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);
  const deleteproduct = useDeleteProduct({ page, count });
  const handleClose = () => setOpen(false);
  const { refetch } = useProduct();
  const DeleteProduct = () => {
    setLoading(true);
    deleteproduct.mutate(id, {
      onSuccess: () => {
        setOpen(false);
        refetch();
      },
    });
  };
  return (
    <React.Fragment>
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
        <Box sx={{ width: "40%", margin: "0 auto" }}>
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
          <Button autoFocus sx={{}} variant="contained" onClick={DeleteProduct}>
            {t("Agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteDialog;
