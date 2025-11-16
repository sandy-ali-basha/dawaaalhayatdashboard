
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
import React, { useMemo,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import ChangeStatus from "../components/ChangeStatus";
import { useTax } from "hooks/tax/useTax";
import TaxUpdate from "./TaxUpdate";
import DeleteDialog from "../components/Dialog";

const TaxIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useTax();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [
      t("first name"),
      t("status"),
      t("operations"),
    ];
  }, [t]);
  
  const handleView = useCallback((id) => { navigate('view/' + id) }, [navigate])
  const handleEdit = useCallback((id) => { setEditedID(id) }, [setEditedID])
  

  const rows = useMemo(() => {
    return data?.tax?.map((tax, id) => (
      <TableRow sx={{ height: "65px" }} key={tax.id} hover>
        <TableCell sx={{ minWidth: 50 }}>{tax?.first_name ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 120 }} align="center">
          <ChangeStatus
            id={tax.id}
            action={tax.status === "active" && "change-status"}
          >
            {tax.status === "Active" ? t("Active") : t("Not Active")}
          </ChangeStatus>
        </TableCell>
        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton onClick={() => handleEdit(tax?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={tax?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => handleView(tax.id)}>
            <Tooltip title={direction === "ltr" ? "View" : "مشاهدة"}>
              <VisibilityTwoToneIcon color="primary" />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  },[data, count, direction, handleEdit, handleView, page,t]);

  const handleCreate = () => navigate("create")

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <TaxUpdate id={editedID} />}

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
            {t("tax")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New tax")}
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

export default TaxIndex;
