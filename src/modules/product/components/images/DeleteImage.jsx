import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "components/shared/Loader";
import { useTranslation } from "react-i18next";
import { _axios } from "interceptor/http-config";
import { useQueryClient } from "react-query";
import { Box } from "@mui/material";
import deleteImg from "assets/images/trash.png"
const DeleteImage = ({ link, open, setOpen }) => {
  const { t } = useTranslation("index");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);
  const queryClient = useQueryClient();
  const DeleteProduct = () => {
    setLoading(true);
    _axios
    .delete(link)
    .then((res) => res?.data)
    .then((res) => {
      if (res.code === 200) {
        setOpen(false);
      }
      setLoading(false);
    });
    queryClient.invalidateQueries(["product"]);
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

export default DeleteImage;
