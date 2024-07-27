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
import { useNavigate, useParams } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useProduct_medicalForm } from "hooks/Product_medicalForm/useProduct_medicalForm";
import DeleteDialog from "../components/Dialog";
import { _axios } from "interceptor/http-config";

const Product_medicalFormIndex = () => {
  const { t } = useTranslation("index");

  const params = useParams();
  const { data, page, setPage, isLoading, count } = useProduct_medicalForm(
    params.id
  );

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [t("name"), t("operations")];
  }, [t]);

  const handleView = useCallback(
    (id) => {
      navigate("view/" + id);
    },
    [navigate]
  );
  const rows = useMemo(() => {
    return data?.data?.product_options_values?.map(
      (Product_medicalForm, id) => (
        <TableRow sx={{ height: "65px" }} key={Product_medicalForm.id}>
          <TableCell sx={{ minWidth: 50 }}>
            {Product_medicalForm?.name ?? "Null"}
          </TableCell>

          <TableCell sx={{ minWidth: 50 }}>
            {Product_medicalForm?.translations
              ? Product_medicalForm?.translations[0]?.name
              : "Null"}
          </TableCell>
          <TableCell sx={{ minWidth: 50 }}>
            {Product_medicalForm?.translations
              ? Product_medicalForm?.translations[1]?.name
              : "Null"}
          </TableCell>
          <TableCell sx={{ minWidth: 50 }}>
            {Product_medicalForm?.translations
              ? Product_medicalForm?.translations[2]?.name
              : "Null"}
          </TableCell>

          <TableCell
            align="center"
            sx={{
              minWidth: 200,
            }}
          >
            <IconButton>
              <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
                <DeleteDialog
                  id={Product_medicalForm?.id}
                  count={count}
                  page={page}
                />
              </Tooltip>
            </IconButton>
            {/* <IconButton onClick={() => handleView(Product_medicalForm.id)}>
              <Tooltip title={direction === "ltr" ? "View" : "مشاهدة"}>
                <VisibilityTwoToneIcon color="primary" />
              </Tooltip>
            </IconButton> */}
          </TableCell>
        </TableRow>
      )
    );
  }, [data, count, direction, handleView, page, t]);

  const handleCreate = () => navigate("create");

  return (
    <>
      {isLoading && <Loader />}
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
            medical Forms
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
            new medical form
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

export default Product_medicalFormIndex;
