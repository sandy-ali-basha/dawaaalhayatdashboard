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
import { colorStore } from "store/ColorsStore";
import DeleteDialog from "../components/Dialog";
import { RestoreFromTrashOutlined } from "@mui/icons-material";
import TermsUpdate from "./TermsUpdate";
import { useTerms } from "hooks/terms/useTerms";

const TermsIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count, query } = useTerms();
  const [restore, setRestore] = useState(false);
  const [restoreId, setRestoreId] = useState(null);

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [t("name"), t("Text"), t("Edit")];
  }, [t]);

  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );

  const handleRestore = useCallback((id) => {
    setRestore(true);
    setRestoreId(id);
  }, []);

  const rows = useMemo(() => {
    return data?.data?.terms?.map((term, id) => (
      <TableRow sx={{ height: "65px" }} key={term.id} hover>
        <TableCell sx={{ minWidth: 50 }}>{term?.name ?? "Null"}</TableCell>
        <TableCell
          sx={{ minWidth: 50 }}
          dangerouslySetInnerHTML={{
            __html: term?.text ? `${term.text.substring(0, 50)}. . .` : "Null",
          }}
        ></TableCell>
        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton onClick={() => handleEdit(term?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          {query ? (
            <IconButton onClick={() => handleRestore(term?.id)}>
              <Tooltip title={direction === "ltr" ? "restore" : "استعادة"}>
                <RestoreFromTrashOutlined
                  sx={{ color: "text.main", cursor: "pointer" }}
                />
              </Tooltip>
            </IconButton>
          ) : (
            <IconButton>
              <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
                <DeleteDialog id={term?.id} count={count} page={page} />
              </Tooltip>
            </IconButton>
          )}

          {/* <IconButton onClick={() => handleView(term.id)}>
            <Tooltip title={direction === "ltr" ? "View" : "مشاهدة"}>
              <VisibilityTwoToneIcon color="primary" />
            </Tooltip>
          </IconButton> */}
        </TableCell>
      </TableRow>
    ));
  }, [data, count, direction, handleEdit, page, query, handleRestore]);

  const handleCreate = () => navigate("create");

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <TermsUpdate id={editedID} />}
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
            {t("Terms")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New Terms")}
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

export default TermsIndex;
