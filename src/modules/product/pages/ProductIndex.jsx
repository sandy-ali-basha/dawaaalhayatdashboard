import React, { useState } from "react";
import { Typography, Box, Button, TextField, Chip } from "@mui/material";
import Loader from "components/shared/Loader";
import ProductUpdate from "./ProductUpdate";
import DeleteDialog from "../components/Dialog";
import AddImages from "./AddImages";
import ProductAttr from "./ProductAttr";
import AddImagesSlider from "./AddImagesSlider";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ChangeStatus from "../components/ChangeStatus";
import ProductMenu from "../components/productMenu";
import { useProductIndex } from "../hooks/useProductsIndex";
import { DataGrid } from "@mui/x-data-grid";

const ProductIndex = () => {
  const {
    handleDelete,
    handleImagesSlider,
    handleCat,
    handleCreate,
    OpenDelete,
    open,
    openAttr,
    openImagesSlider,
    product_attr,
    handleView,
    handleEdit,
    handleAddImages,
    isLoading,
    id,
    editedID,
    setCityFilter,
    setBrandFilter,
    navigate,
    setOpen,
    setOpenImagesSlider,
    setOpenDelete,
    setOpenAttr,
    cityFilter,
    brandFilter,
    filteredData,
    t,
  } = useProductIndex();

  // Prepare the rows for the DataGrid
  const rows = filteredData.map((product) => ({
    id: product.id,
    name: product.name ?? "Null",
    brand: product.brand?.name ?? "Null",
    sku: product.sku ?? "Null",
    price: product.price ?? "Null",
    comparePrice: product.compare_price > 0 ? product.compare_price : "no sale",
    quantity: product.quantity ?? "Null",
    city: product.cities?.state[0]?.name ?? "Null",
    status: product.status,
    actions: product, // Passing product object for actions
  }));

  // Define columns for the DataGridPremium
  const gridColumns = [
    {
      field: "name",
      headerName: "Product Name",
      width: 250,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
    },
    {
      field: "sku",
      headerName: "SKU",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "comparePrice",
      headerName: "Compare Price",
      width: 150,
      renderCell: (params) => <Chip label={params.value}>{params.value}</Chip>,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <ChangeStatus
          id={params.row.id}
          action={params.row.status === "active" && "change-status"}
        >
          {params.row.status}
        </ChangeStatus>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <ProductMenu
          product={params.value}
          count={params.value ? params.value.length : 0} // Add fallback for undefined values
          page={1}
          handleEdit={handleEdit}
          handleView={handleView}
          handleAddImages={handleAddImages}
          handleImagesSlider={handleImagesSlider}
          handleDelete={handleDelete}
          handleCat={handleCat}
          navigate={navigate}
        />
      ),
    },
  ];

  const [selectedRowIds, setSelectedRowIds] = useState([]);
  // Capture selected row IDs
  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  console.log(selectedRowIds);

  return isLoading ? (
    <Loader />
  ) : (
    <Box sx={{ overflow: "scroll" }}>
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
          width: "100%",
          backgroundColor: "background.main",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ color: "text.main" }}>
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
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label={t("City filter")}
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          />
          <TextField
            label={t("Brand filter")}
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          />
        </Box>

        <Box sx={{ width: "70vw", overflow: "scroll" }}>
          <DataGrid
            rows={rows}
            columns={gridColumns}
            pagination
            checkboxSelection
            disableSelectionOnClick
            sx={{
              backgroundColor: "background.paper",
            }}
            onSelectionModelChange={handleSelectionChange} // Capture selected row IDs
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductIndex;
