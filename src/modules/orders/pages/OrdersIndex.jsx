import {
  Typography,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BoxStyled } from "components/styled/BoxStyled";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
// import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import ChangeStatus from "../components/ChangeStatus";
import { useOrders } from "hooks/orders/useOrders";
import OrdersUpdate from "./OrdersUpdate";
import { orderStore } from "../store/orderStore";

const OrdersIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useOrders();
  const [setItem] = orderStore((state) => [state.setItem]);

  const navigate = useNavigate();
  // const [direction] = settingsStore((state) => [state.direction]);

  const [editedID] = colorStore((state) => [
    state.editedID,
    // state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [
      t("reference"),
      t("total"),
      t("status"),
      t("payment"),
      t("qty"),
      t("operations"),
    ];
  }, [t]);

  const handleView = useCallback(
    (item) => {
      setItem(item);
      navigate("view");
    },
    [navigate, setItem]
  );
  // const handleEdit = useCallback(
  //   (id) => {
  //     setEditedID(id);
  //   },
  //   [setEditedID]
  // );
  const rows = useMemo(() => {
    return data?.data?.orders?.map((orders, id) => (
      <TableRow sx={{ height: "65px" }} key={orders.id} hover>
        <TableCell sx={{ minWidth: 50 }}>
          {orders?.reference ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {orders?.sub_total ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 120 }} align="center">
          <ChangeStatus
            id={orders.id}
            action={orders.status === "active" && "change-status"}
          >
            {orders.status === "Active" ? t("Active") : t("Not Active")}
          </ChangeStatus>
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {orders?.lines?.length ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>{orders?.payment ?? "Null"}</TableCell>
        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          {/* <IconButton onClick={() => handleEdit(orders?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton> */}

          <IconButton onClick={() => handleView(orders)}>
            <Tooltip title={"details"}>
              <VisibilityTwoToneIcon color="primary" />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }, [data, handleView, t]);

  const handleCreate = () => navigate("create");

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <OrdersUpdate id={editedID} />}

      <Box
        sx={{
          width: { sl: "300px" },
          backgroundColor: { xs: "background.main" },
          ml: { xs: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "25px",
          }}
        >
          <Typography sx={{ color: "text.main" }} variant="h5">
            {t("orders")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New orders")}
          </Button>
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          <Table
            columns={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            count={Math.ceil(data?.pagination?.total / count)}
          />
        </BoxStyled>
      </Box>
    </>
  );
};

export default OrdersIndex;
