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
import React, { useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import ChangeStatus from "../components/ChangeStatus";
import { useBrand } from "hooks/brand/useBrand";
import BrandUpdate from "./BrandUpdate";
import DeleteDialog from "../components/Dialog";
import { AddPhotoAlternate } from "@mui/icons-material";
import AddImage from "./AddImage";

const BrandIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useBrand();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [t(" name"), t("operations")];
  }, [t]);
  const [id, setID] = useState();

  const [open, setOpen] = useState(false);
  const handleView = useCallback(
    (id) => {
      navigate("view/" + id);
    },
    [navigate]
  );
  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );
  const handleAddImages = useCallback(
    (id) => {
      setID(id);
      setOpen(true);
    },
    [setEditedID]
  );
  const rows = useMemo(() => {
    return data?.data?.brands?.map((brand, id) => (
      <TableRow sx={{ height: "65px" }} key={brand.id} hover>
        <TableCell sx={{ minWidth: 50 }}>{brand?.name ?? "Null"}</TableCell>
        {/* <TableCell sx={{ minWidth: 120 }} align="center">
          <ChangeStatus
            id={brand.id}
            action={brand.status === "active" && "change-status"}
          >
            {brand.status === "Active" ? t("Active") : t("Not Active")}
          </ChangeStatus>
        </TableCell> */}
        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton onClick={() => handleEdit(brand?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={brand?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip
              title={"Add Images"}
              onClick={() => handleAddImages(brand?.id)}
            >
              <AddPhotoAlternate sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  }, [data, count, direction, handleEdit, handleView, page, t]);

  const handleCreate = () => navigate("create");

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <BrandUpdate id={editedID} />}
      {id && <AddImage id={id} open={open} setOpen={setOpen} />}
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
            {t("brand")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            sx={{
              color: "primary.main",
              backgroundColor: "origin.main",
              "&:hover": { backgroundColor: "origin.main" },
            }}
            onClick={handleCreate}
          >
            {t("New brand")}
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

export default BrandIndex;
