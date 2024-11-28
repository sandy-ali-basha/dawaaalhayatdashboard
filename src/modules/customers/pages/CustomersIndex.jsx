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
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useCustomers } from "hooks/customers/useCustomers";
import CustomersUpdate from "./CustomersUpdate";
import DeleteDialog from "../components/Dialog";
import * as XLSX from "xlsx"; // Import xlsx for Excel export
import { GetAppRounded } from "@mui/icons-material";

const CustomersIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useCustomers();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [
      t("user id"),
      t("name"),
      t("email"),
      t("phone number"),
      t("points"),
      t("age"),
      t("gender"),
      t("operations"),
    ];
  }, [t]);

  const exportToExcel = useCallback(() => {
    // Prepare data for export with specific columns
    const exportData = data?.data?.customers?.flatMap((customer) => {
      return {
        "User ID": customer?.user_id || "Null",
        "customer name":
          `${customer?.first_name ?? ""} ${customer?.last_name ?? ""}` ||
          "Null",
        email: customer?.email || "Null",
        phone_number: customer?.phone_number || "Null",
        age: customer?.age || "Null",
        gender: customer?.gender || "Null",
        points: customer?.points || "Null",
      };
    });

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    // Export the workbook
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const fileName = `Customers_${formattedDate}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  }, [data]);

  const rows = useMemo(() => {
    return data?.data?.customers?.map((customers, id) => (
      <TableRow sx={{ height: "65px" }} key={customers.id}>
        <TableCell sx={{ minWidth: 50 }}>
          {customers?.user_id ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {customers?.first_name + " " + customers?.last_name ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {customers?.email ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {customers?.phone_number ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>{customers?.age ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {customers?.gender ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {customers?.points ?? "Null"}
        </TableCell>

        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={customers?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
          {/* <IconButton onClick={() => handleView(customers.id)}>
            <Tooltip title={direction === "ltr" ? "View" : "مشاهدة"}>
              <VisibilityTwoToneIcon color="primary" />
            </Tooltip>
          </IconButton> */}
        </TableCell>
      </TableRow>
    ));
  }, [data, count, direction, page]);

  const handleCreate = () => navigate("create");

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <CustomersUpdate id={editedID} />}

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
            {t("customers")}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={exportToExcel}
            sx={{ ml: 2 }}
          >
            Export to Excel <GetAppRounded />
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

export default CustomersIndex;
