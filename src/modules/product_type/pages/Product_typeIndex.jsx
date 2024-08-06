
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
import React, { useMemo,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useProduct_type } from "hooks/product_type/useProduct_type";
import Product_typeUpdate from "./Product_typeUpdate";
import DeleteDialog from "../components/Dialog";

const Product_typeIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useProduct_type();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [
      t(" name"),
      // t("status"),
      t("operations"),
    ];
  }, [t]);
  
  const handleView = useCallback((id) => { navigate('view/' + id) }, [navigate])
  const handleEdit = useCallback((id) => { setEditedID(id) }, [setEditedID])

  const rows = useMemo(() => {
    return data?.data?.producttypes?.map((product_type, id) => (
      <TableRow sx={{ height: "65px" }} key={product_type.id} hover>
        <TableCell sx={{ minWidth: 50 }}>{product_type?.name ?? "Null"}</TableCell>
        {/* <TableCell sx={{ minWidth: 120 }} align="center">
          <ChangeStatus
            id={product_type.id}
            action={product_type.status === "active" && "change-status"}
          >
            {product_type.status === "Active" ? t("Active") : t("Not Active")}
          </ChangeStatus>
        </TableCell> */}
        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton onClick={() => handleEdit(product_type?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={product_type?.id} count={count} page={page} />
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
      {editedID && <Product_typeUpdate id={editedID} />}

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
            {t("medical form")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New medical form")}
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

export default Product_typeIndex;
