import {
  Typography,
  Box,
  TableRow,
  TableCell,
  Button,
  TextField,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import React, { useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useProduct } from "hooks/product/useProduct";
import ProductUpdate from "./ProductUpdate";
import DeleteDialog from "../components/Dialog";
import AddImages from "./AddImages";
import ProductAttr from "./ProductAttr";
import AddImagesSlider from "./AddImagesSlider";
//* icons
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ChangeStatus from "../components/ChangeStatus";
import ProductMenu from "../components/productMenu";

const ProductIndex = () => {
  const { t } = useTranslation("index");
  const { data, isLoading } = useProduct();
  const navigate = useNavigate();
  const [id, setID] = useState();
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  // States for sorting and filtering

  const [cityFilter, setCityFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  const columns = useMemo(() => {
    return [
      t("name"),
      t("brand"),
      t("sku"),
      t("price"),
      t("price before sale"),
      t("Qty"),
      t("city"),
      t("status"),
      t("option"),
    ];
  }, [t]);
  const handleCreate = () => navigate("create");

  const [OpenDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAttr, setOpenAttr] = useState(false);
  const [openImagesSlider, setOpenImagesSlider] = useState(false);
  const [product_attr, setProduct_attr] = useState();

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
  const handleAddImages = useCallback((id) => {
    setID(id);
    setOpen(true);
  }, []);
  const handleDelete = useCallback((id) => {
    setID(id);
    setOpenDelete(true);
  }, []);
  const handleImagesSlider = useCallback((id) => {
    setID(id);
    setOpenImagesSlider(true);
  }, []);

  const handleCat = useCallback((id, attr) => {
    setID(id);
    setOpenAttr(true);
    setProduct_attr(attr);
  }, []);

  // Sort and filter logic
  const filteredData = useMemo(() => {
    let filtered = data?.data?.products || [];

    if (cityFilter) {
      filtered = filtered.filter((product) =>
        product.cities?.state[0]?.name
          ?.toLowerCase()
          .includes(cityFilter.toLowerCase())
      );
    }

    if (brandFilter) {
      filtered = filtered.filter((product) =>
        product.brand?.name?.toLowerCase().includes(brandFilter.toLowerCase())
      );
    }

    return filtered;
  }, [data, cityFilter, brandFilter]);

  const rows = useMemo(() => {
    return filteredData?.map((product, id) => (
      <TableRow sx={{ height: "65px" }} key={product.id}>
        <TableCell sx={{ minWidth: 250 }}>{product?.name ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {product?.brand?.name ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 150 }}>{product?.sku ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>{product?.price ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 100 }}>
          {product?.compare_price > 0 ? (
            <Box
              sx={{
                border: `1px solid`,
                color: "success.main",
                borderRadius: 3,
              }}
            >
              {product?.compare_price}
            </Box>
          ) : (
            "no sale"
          )}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {product?.quantity ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {product?.cities?.state[0]?.name ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }} align="center">
          <ChangeStatus
            id={product.id}
            action={product.status === "active" && "change-status"}
          >
            {product.status}
          </ChangeStatus>
        </TableCell>
        <TableCell align="center" sx={{ minWidth: 50 }}>
          <ProductMenu
            product={product}
            count={product.length}
            page={1}
            handleEdit={handleEdit}
            handleView={handleView}
            handleAddImages={handleAddImages}
            handleImagesSlider={handleImagesSlider}
            handleDelete={handleDelete}
            handleCat={handleCat}
            navigate={navigate}
          />
        </TableCell>
      </TableRow>
    ));
  }, [
    filteredData,
    handleEdit,
    handleView,
    handleAddImages,
    handleImagesSlider,
    handleDelete,
    handleCat,
    navigate,
  ]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {editedID && <ProductUpdate id={editedID} />}
      {id && <AddImages id={id} open={open} setOpen={setOpen} />}
      {id && (
        <AddImagesSlider
          id={id}
          open={openImagesSlider}
          setOpen={setOpenImagesSlider}
        />
      )}
      {id && <DeleteDialog id={id} open={OpenDelete} setOpen={setOpenDelete} />}
      {id && (
        <ProductAttr
          id={id}
          open={openAttr}
          setOpen={setOpenAttr}
          attr={product_attr}
        />
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
            {t("product")}
          </Typography>
          <Button
            startIcon={<AddRoundedIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New product")}
          </Button>
        </Box>

        <Box sx={{ mb: "20px" }}>
          <TextField
            label={t("City filter")}
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            sx={{ mr: 2 }}
          />
          <TextField
            label={t("Brand filter")}
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          />
        </Box>
        <BoxStyled>
          <Table
            columns={columns}
            rows={rows}
            sx={{ border: "1px solid", borderColor: "secondary.main" }}
          />
        </BoxStyled>
      </Box>
    </>
  );
};

export default ProductIndex;
