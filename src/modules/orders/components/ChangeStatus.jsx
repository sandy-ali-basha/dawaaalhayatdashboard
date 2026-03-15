import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Loader from "components/shared/Loader";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOrders } from "hooks/orders/useOrders";
import { _Orders } from "api/orders/orders";
import { useMutation } from "react-query";

const ChangeStatus = ({ id, children }) => {
  const { t } = useTranslation("index");
  const { refetch } = useOrders();
  const [status, setStatus] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate } = useMutation((data) => createPost(data));

  async function createPost(data) {
    _Orders
      .updateStatus({
        editedID: id,
        formData: data,
      })
      .then((res) => {
        if (res.code === 200) {
          refetch();
          handleClose();
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false); // Handle error and stop loading
      });
  }

  // Updated to pass the correct input data
  const handleUpdate = () => {
    const inputData = { status };
    if (status === "order_canceled") {
      inputData.cancel_reason = cancelReason.trim();
    }
    setLoading(true);
    mutate(inputData);
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
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="status-select-label">
              {t("Select Status")}
            </InputLabel>
            <Select
              labelId="status-select-label"
              value={status}
              onChange={(e) => {
                const nextStatus = e.target.value;
                setStatus(nextStatus);
                if (nextStatus !== "order_canceled") {
                  setCancelReason("");
                }
              }}
              label={t("Select Status")}
            >
              <MenuItem value="order_requested">order requested</MenuItem>
              <MenuItem value="order_processing">order processing</MenuItem>
              <MenuItem value="order_processed">order processed</MenuItem>
              <MenuItem value="order_under_delivery">
                order under delivery
              </MenuItem>
              <MenuItem value="order_delivered">order delivered</MenuItem>
              <MenuItem value="order_canceled">cancel order</MenuItem>
            </Select>
          </FormControl>
          {status === "order_canceled" && (
            <TextField
              fullWidth
              multiline
              minRows={3}
              sx={{ mt: 2 }}
              label={t("Cancel reason")}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder={t("Write the reason for cancellation")}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("Disagree")}</Button>
          {loading && <Loader />}
          <Button
            autoFocus
            variant="contained"
            onClick={handleUpdate} // Pass the input data by calling handleUpdate
            disabled={
              !status || (status === "order_canceled" && !cancelReason.trim())
            }
          >
            {t("Agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangeStatus;

