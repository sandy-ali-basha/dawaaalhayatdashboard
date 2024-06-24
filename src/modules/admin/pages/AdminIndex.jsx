import { useCallback } from "react";
import React, { useMemo } from "react";
import {
  Typography,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import AdminUpdate from "./AdminUpdate";
import { Table } from "components/shared";
import AddIcon from "@mui/icons-material/Add";
import Loader from "components/shared/Loader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../components/Dialog";
import { useAdmin } from "hooks/admin/useAdmin";
import { categoryStore } from "store/categoryStore";
import { settingsStore } from "store/settingsStore";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { BoxStyled } from "components/styled/BoxStyled";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { useDebounce } from "hooks/useDebounce";
import { TextFieldStyled } from "components/styled/TextField";

const AdminIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count, setQuery } = useAdmin();
  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);
  const [editedID, setEditedID] = categoryStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const handleSearch = useDebounce((e) => {
    setQuery(e.target.value);
  }, 1000);
  const columns = useMemo(() => {
    return [t("Name"), t("Email"), t("Operations")];
  }, [t]);

  const handleView = useCallback(
    (id) => {
      navigate(`view/${id}`);
    },
    [navigate]
  );

  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );
  const handleCreate = () => {
    navigate("create");
  };
  const rows = useMemo(() => {
    return data?.admins?.map((admin, id) => (
      <TableRow sx={{ height: "65px" }} key={admin.id} hover={true}>
        <TableCell sx={{ minWidth: 200 }}>{admin?.name ?? "Null"}</TableCell>

        <TableCell sx={{ minWidth: 200 }} align="center">
          {admin?.email ?? "Null"}
        </TableCell>

        <TableCell
          align="center"
          sx={{
            minWidth: 200,
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <Box>
                <DeleteDialog id={admin?.id} count={count} page={page} />
              </Box>
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }, [data, count, direction, page])

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <AdminUpdate id={editedID} />}

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
            {t("Admins")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            sx={{
              color: "#fff",
              backgroundColor: "origin.main",
              "&:hover": { backgroundColor: "origin.main" },
            }}
            onClick={handleCreate}
          >
            {t("New Admin")}
          </Button>
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          <Box
            sx={{
              mb: "15px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextFieldStyled
              placeholder={t("Search")}
              onChange={handleSearch}
            />
          </Box>
          <Table
            columns={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            count={Math.ceil(data?.pagination?.total / count) || 0}
          />
        </BoxStyled>
      </Box>
    </>
  );
};

export default AdminIndex;
