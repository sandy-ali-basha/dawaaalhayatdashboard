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
import React, { useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { useSettings } from "hooks/settings/useSettings";
import SettingsUpdate from "./SettingsUpdate";

const SettingsIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useSettings();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);
  const [editedValue, setEditedValue] = useState(false);

  const columns = useMemo(() => {
    return [t("name"), t("value"), t("operations")];
  }, [t]);
  const [open, setOpen] = useState(true);
  const handleEdit = useCallback(
    (value) => {
      setEditedValue(value);
      setOpen(true);
    },
    [setEditedValue]
  );

  const rows = useMemo(() => {
    return (
      <TableRow sx={{ height: "65px" }}>
        <TableCell sx={{ minWidth: 50 }}>
          {data?.data?.point_price?.name ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {data?.data?.point_price?.value ?? "Null"}
        </TableCell>

        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton
            onClick={() => handleEdit(data?.data?.point_price?.value)}
          >
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }, [data, direction, handleEdit]);

  const handleCreate = () => navigate("create");

  return (
    <>
      {isLoading && <Loader />}
      {editedValue && (
        <SettingsUpdate open={open} setOpen={setOpen} value={editedValue} />
      )}

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
            {t("point price")}
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

export default SettingsIndex;
