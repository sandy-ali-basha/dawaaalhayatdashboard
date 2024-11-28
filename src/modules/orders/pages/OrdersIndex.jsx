import {
  Typography,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Chip,
  keyframes,
  Button,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
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
  GetAppRounded,
  LocalShipping,
  Pending,
  Print,
  Sync,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import alertSoundFile from "assets/alert.mp3";
import * as XLSX from "xlsx"; // Import xlsx for Excel export

const OrdersIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count, refetch, newOrderAlert } =
    useOrders();
  const { enqueueSnackbar } = useSnackbar();
  const alertSoundRef = useRef(new Audio(alertSoundFile));
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Set userInteracted to true on the first interaction
    const handleUserInteraction = () => {
      setUserInteracted(true);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  const exportToExcel = useCallback(() => {
    // Prepare data for export with specific columns
    let previousReference = null;

    const exportData = data?.data?.orders?.flatMap((order) => {
      const orderDetails = order?.lines?.slice(0, -1).map((product, index) => {
        const currentReference = order?.reference;

        // Determine if fields should be included based on reference match
        const isRepeatedReference = previousReference === currentReference;

        // Update the previous reference for the next iteration
        previousReference = currentReference;

        return {
          "customer name":
            `${order?.customer[0]?.first_name ?? ""} ${
              order?.customer[0]?.last_name ?? ""
            }` || "Null",
          age: isRepeatedReference ? "" :  order?.customer[0]?.age ?? "Null",
          gender: isRepeatedReference ? "" :  order?.customer[0]?.gender ?? "Null",
          "Contact Email": isRepeatedReference ? "" :  order?.address[1]?.contact_email ?? "Null",
          "Contact Phone": isRepeatedReference ? "" :  order?.address[1]?.contact_phone ?? "Null",
          City: order?.address[1]?.city ?? "Null",
          "reference رقم الطلب": isRepeatedReference ? "" : order?.reference,
          "created at تاريخ الطلب": isRepeatedReference ? "" :  order?.created_at ,
          "order status":  isRepeatedReference ? "" :  order?.status ?? "Null",

          // Conditional fields
          "Product المنتجات": product?.description ?? "Null",
          "Price سعر المنتج": product?.unit_price?.value ?? "Null",
          "Quantity كمية المنتج": product?.unit_quantity ?? "Null",
          Address: order?.address[1]?.line_one ?? "Null",
          "city shipping price": isRepeatedReference
            ? ""
            : order?.address[1]?.city_shipping_price ?? "Null",
          "delivery instructions":
            order?.address[1]?.delivery_instructions ?? "Null",
          "Payment Method": isRepeatedReference
            ? ""
            : order?.transactions[0]?.driver === "coffline"
            ? "cash"
            : order?.transactions[0]?.driver ?? "Null",
          "Points deducted during the purchase process  النقاط المحسومة ضمن عملية الشراء":
            isRepeatedReference ? "" : order?.points_used ?? "null",
          "order sub total": isRepeatedReference ? "" : order?.sub_total,
          "order total": isRepeatedReference ? "" : order?.total,
        };
      });

      return orderDetails;
    });

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    // Export the workbook
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const fileName = `Orders_${formattedDate}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  }, [data]);

  useEffect(() => {
    if (newOrderAlert) {
      // Show snackbar notification
      enqueueSnackbar("There is a new order!", {
        variant: "info",
        autoHideDuration: 4000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });

      // Play alert sound only if user has interacted with the page
      if (userInteracted) {
        alertSoundRef.current.play().catch((error) => {
          console.error("Error playing sound:", error);
        });
      }
    }
  }, [newOrderAlert, enqueueSnackbar, userInteracted]);

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
  const flipIn = keyframes`
  0% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
  60% {
    transform: rotateX(20deg);
    opacity: 1;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
`;

  const rows = useMemo(() => {
    return data?.data?.orders?.map((orders, id) => {
      const { label, color, icon } = getStatusDetails(orders?.status);
      return (
        <TableRow
          sx={{
            background:
              orders?.status === "order_requested" ? "#ffb3474f" : "inherit",
            animation:
              orders?.status === "order_requested"
                ? `${flipIn} 1s ease`
                : "none",
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
  }, [data?.data?.orders, flipIn, handleView]);

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
          <Button
            variant="contained"
            color="primary"
            onClick={exportToExcel}
            sx={{ ml: 2 }}
          >
            Export to Excel <GetAppRounded/>
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
