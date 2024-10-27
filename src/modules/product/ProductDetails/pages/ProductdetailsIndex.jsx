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
import { useNavigate, useParams } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useProductdetails } from "hooks/productdetails/useProductdetails";
import ProductdetailsUpdate from "./ProductdetailsUpdate";
import DeleteDialog from "../components/Dialog";
import EditNoteIcon from "@mui/icons-material/EditNote";

const ProductdetailsIndex = () => {
  const { t } = useTranslation("index");
  const params = useParams();
  const { data, page, setPage, isLoading, count } = useProductdetails(
    params.id
  );

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [t("title"), t("operations")];
  }, [t]);

  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );

  const rows = useMemo(() => {
    return data?.data?.accordions?.map((productdetails, id) => (
      <TableRow sx={{ height: "65px" }} key={productdetails.id} hover>
        <TableCell sx={{ minWidth: 50 }}>
          {productdetails?.title ?? "Null"}
        </TableCell>

        <TableCell
          align="center"
          sx={{
            minWidth: 50,
          }}
        >
          <IconButton onClick={() => handleEdit(productdetails?.id)}>
            <Tooltip title={"Edit & View"}>
              <EditNoteIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={productdetails?.id} count={count} page={page} />
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
      {editedID && <ProductdetailsUpdate id={editedID} />}
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
            {t("product details")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New productdetails")}
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

export default ProductdetailsIndex;
