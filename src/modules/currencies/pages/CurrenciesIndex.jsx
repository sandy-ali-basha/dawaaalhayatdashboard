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
import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useCurrencies } from "hooks/currencies/useCurrencies";
import CurrenciesUpdate from "./CurrenciesUpdate";
import DeleteDialog from "../components/Dialog";

const CurrenciesIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useCurrencies();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [t("name"), t("code"),
       t("exchange rate"),
       t("decimal places"),
       t("operations")];
  }, [t]);

  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );

  const rows = useMemo(() => {
    return data?.data?.map((currencies) => (
      <TableRow sx={{ height: "65px" }} key={currencies.id} hover>
        <TableCell sx={{ minWidth: 50 }}>
          {currencies?.name ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
         <Typography color="secondary.main" variant="h5">{currencies?.code ?? "Null"}</Typography>
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {currencies?.exchange_rate ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {currencies?.decimal_places ?? "Null"}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton onClick={() => handleEdit(currencies?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={currencies?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }, [data, count, direction, handleEdit, page]);

  const handleCreate = () => navigate("create");

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <CurrenciesUpdate id={editedID} />}

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
            {t("currencies")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New currencies")}
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

export default CurrenciesIndex;
