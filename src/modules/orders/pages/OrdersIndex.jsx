import {
  Typography,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import React, { useMemo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import ChangeStatus from "../components/ChangeStatus";
import { useOrders } from "hooks/orders/useOrders";
import OrdersUpdate from "./OrdersUpdate";
import { orderStore } from "../store/orderStore";
import {
  Cancel,
  CheckCircle,
  Done,
  LocalShipping,
  Pending,
  Print,
  Sync,
} from "@mui/icons-material";

const OrdersIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count, refetch } = useOrders();
  const [setItem] = orderStore((state) => [state.setItem]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [refetch]);

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
      t("customer name"),
      t("Payment"),
      t("sub total"),
      t("shipping total"),
      t("created at"),
      t("status"),
      t("options"),
    ];
  }, [t]);

  const handleView = useCallback(
    (item) => {
      setItem(item);
      navigate("view");
    },
    [navigate, setItem]
  );

  const getStatusDetails = (status) => {
    switch (status) {
      case "order_requested":
        return { label: "Requested", color: "info", icon: <Pending /> };
      case "order_processing":
        return { label: "Processing", color: "primary", icon: <Sync /> };
      case "order_processed":
        return { label: "Processed", color: "warning", icon: <CheckCircle /> };
      case "order_under_delivery":
        return {
          label: "Under Delivery",
          color: "secondary",
          icon: <LocalShipping />,
        };
      case "order_delivered":
        return { label: "Delivered", color: "success", icon: <Done /> };
      case "order_canceled":
        return { label: "Canceled", color: "error", icon: <Cancel /> };
      default:
        return { label: "Unknown", color: "default", icon: null };
    }
  };

  const rows = useMemo(() => {
    return data?.data?.orders?.map((orders, id) => {
      const { label, color, icon } = getStatusDetails(orders?.status);
      return (
        <TableRow
          sx={{
            background:
              orders?.status === "order_requested" ? "#ffb3474f" : "inherit",
          }}
          key={orders.id}
        >
          <TableCell sx={{ minWidth: 150 }}>
            {orders?.reference ?? "Null"}
          </TableCell>
          <TableCell sx={{ minWidth: 50 }}>{orders?.total ?? "Null"}</TableCell>
          <TableCell sx={{ minWidth: 50 }}>
            {orders?.customer[0]?.first_name +
              " " +
              orders?.customer[0]?.last_name ?? "Null"}
          </TableCell>
          <TableCell sx={{ minWidth: 50 }}>
            {orders?.transactions[0]?.driver === "coffline"
              ? "cash"
              : orders?.transactions[0]?.driver ?? "Null"}
          </TableCell>
          <TableCell sx={{ minWidth: 50 }}>
            {orders?.sub_total ?? "Null"}
          </TableCell>
          <TableCell sx={{ minWidth: 50 }}>
            {orders?.shipping_total ?? "Null"}
          </TableCell>
          <TableCell sx={{ minWidth: 200 }}>
            {orders?.created_at ?? "Null"}
          </TableCell>
          <TableCell sx={{ minWidth: 100 }} align="center">
            <ChangeStatus id={orders.id}>
              <Tooltip title={label}>
                <Chip
                  label={label}
                  icon={icon}
                  color={color}
                  variant="outlined"
                  sx={{
                    minWidth: 120,
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    justifyContent: "start",
                  }}
                />
              </Tooltip>
            </ChangeStatus>
          </TableCell>

          <TableCell
            align="center"
            sx={{
              minWidth: 50,
            }}
          >
            <IconButton onClick={() => handleView(orders)}>
              <Tooltip title={"details"}>
                <VisibilityTwoToneIcon color="primary" />
              </Tooltip>
            </IconButton>
            <IconButton
              href={`https://test.dawaaalhayat.com/api/order/${orders.id}/pdf`}
            >
              <Print color="secondary" />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  }, [data?.data?.orders, handleView]);

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
            {t("orders")} {isLoading && "updating ..."}
          </Typography>
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
