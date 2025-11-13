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
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import WarningAmberTwoToneIcon from "@mui/icons-material/WarningAmberTwoTone";
import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import ChangeStatus from "../components/ChangeStatus";
import { useInvintory } from "hooks/invintory/useInvintory";
import InvintoryUpdate from "./InvintoryUpdate";
import DeleteDialog from "../components/Dialog";
import { BoxStyled } from "components/styled/BoxStyled";
import { InvStore } from "store/invStore";
import ButtonAction from "components/shared/ButtonAction";
import { ArrowBack } from "@mui/icons-material";

const InvintoryIndex = () => {
  const { t } = useTranslation("index");
  const navigate = useNavigate(-1);
  const [direction] = settingsStore((state) => [state.direction]);
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const [InvId, setInvId] = InvStore((state) => [state.InvId, state.setInvId]);
  // const { data, page, setPage, isLoading, count } = useInvintory(InvId);
  const handleBack = (e) => {
    e.preventDefault();
    navigate("dashboard/Inventories");
  }
  const data = [
    {
      id: 1,
      name: "Product A",
      qty: 120,
      sku: 15420,
      brand: "Electronics",
      reorder_point: 50,
      unit_cost: 25.5,
    },
    {
      id: 1,
      name: "Product A",
      qty: 20,
      sku: 15420,
      brand: "Electronics",
      reorder_point: 50,
      unit_cost: 25.5,
    },
  ];
  const columns = useMemo(
    () => [
      t("Product Name"),
      t("SKU"),
      t("Quantity"),
      t("Brand"),
      t("Reorder Point"),
      t("Reorder Needed"),
      t("Unit Cost"),
      t("Operations"),
    ],
    [t]
  );

  const handleView = useCallback((id) => navigate("view/" + id), [navigate]);
  const handleEdit = useCallback((id) => setEditedID(id), [setEditedID]);

  const rows = useMemo(() => {
    return data?.map((item) => {
      const reorderNeeded = item.qty <= item.reorder_point;
      return (
        <TableRow sx={{ height: "65px" }} key={item.id} hover>
          <TableCell>{item?.name ?? "N/A"}</TableCell>
          <TableCell>{item?.sku ?? "N/A"}</TableCell>
          <TableCell align="center">{item?.qty ?? 0}</TableCell>
          <TableCell align="center">{item?.brand ?? 0}</TableCell>
          <TableCell align="center">{item?.reorder_point ?? 0}</TableCell>
          <TableCell align="center">
            {reorderNeeded ? (
              <Tooltip title="Reorder needed">
                <WarningAmberTwoToneIcon color="error" />
              </Tooltip>
            ) : (
              <Typography color="success.main">{t("OK")}</Typography>
            )}
          </TableCell>
          <TableCell align="center">
            {item?.unit_cost ? `$${item.unit_cost}` : "-"}
          </TableCell>
          <TableCell align="center">
            {item?.updated_at
              ? new Date(item.updated_at).toLocaleDateString()
              : "-"}
          </TableCell>
        </TableRow>
      );
    });
  }, [data, t]);

  const handleCreate = () => navigate("create");

  return (
    <>
      {/* {isLoading && <Loader />} */}
      {editedID && <InvintoryUpdate id={editedID} />}

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "25px",
          }}
        >
           <div
            style={{
              minWidth: "200px",
              float: direction === "ltr" ? "right" : "left",
              marginTop: "20px",
            }}
          >
            <ButtonAction
              name={t("Back")}
              onClick={handleBack}
              endIcon={<ArrowBack />}
            />
          </div>
          <Typography sx={{ color: "text.main" }} variant="h5">
            {t("Inventory")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("Add New Product")}
          </Button>
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          <Table
            columns={columns}
            rows={rows}
            // page={page}
            // setPage={setPage}
            // count={Math.ceil(data?.pagination?.total / count)}
          />
        </BoxStyled>
      </Box>
     
    </>
  );
};

export default InvintoryIndex;
