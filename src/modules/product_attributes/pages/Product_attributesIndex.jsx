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
import { Link, useNavigate } from "react-router-dom";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useProduct_attributes } from "hooks/product_attributes/useProduct_attributes";
import Product_attributesUpdate from "./Product_attributesUpdate";
import DeleteDialog from "../components/Dialog";
import { AccountTreeOutlined } from "@mui/icons-material";
import ChangeStatus from "../components/ChangeStatus";

const Product_attributesIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useProduct_attributes();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [
      t("title arabic"),
      t("title kurdish"),
      t("title english"),
      t("image"),
      t("status"),
      t("operations"),
    ];
  }, [t]);

  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );

  const rows = useMemo(() => {
    return data?.data?.product_attributes?.map((product_attributes, id) => (
      <TableRow sx={{ height: "65px" }} key={product_attributes.id}>
        <TableCell sx={{ minWidth: 50 }}>
          {product_attributes?.translations[0]?.title ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {product_attributes?.translations[1]?.title ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {product_attributes?.translations[2]?.title ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 90 }}>
          {product_attributes?.image_url ? (
            <Box
              component="img"
              src={product_attributes.image_url}
              alt={product_attributes?.translations[2]?.title || "category"}
              sx={{ width: 48, height: 48, objectFit: "cover", borderRadius: 1 }}
            />
          ) : (
            "-"
          )}
        </TableCell>

        <TableCell sx={{ minWidth: 50 }}>
          {product_attributes.status === 1 ? "Active" : "Not Active"}
        </TableCell>

        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton onClick={() => handleEdit(product_attributes?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog
                id={product_attributes?.id}
                count={count}
                page={page}
              />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={"show values"}>
              <Link to={`values/${product_attributes?.id}`}>
                {" "}
                <AccountTreeOutlined sx={{ color: "text.main" }} />
              </Link>
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
      {editedID && <Product_attributesUpdate id={editedID} />}

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
            {t("product Categories")}
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New Categories")}
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

export default Product_attributesIndex;
