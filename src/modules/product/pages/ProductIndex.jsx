import React, { useMemo, useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Chip,
  Checkbox,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
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
import ChangeStatusPurshasable from "../components/ChangeStatusPurshasable";
import { DeleteSweep } from "@mui/icons-material";
import { BoxStyled } from "components/styled/BoxStyled";
import UpdateRegionPrice from "./UpdateRegionPrice";

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
    handleUpdatePrice,
    setOpenDelete,
    setOpenAttr,
    cityFilter,
    brandFilter,
    filteredData,
    t,
    selectedRowIds,
    handleSelectChange,
    BulkDelete,
    loading,
    updatePrice,
    setUpdatePrice,
    productName
  } = useProductIndex();

  const rows = useMemo(() => {
    return filteredData.map((product) => ({
      select: product.id,
      id: product.id,
      name: product.name ?? "Null",
      brand: product.brand?.name ?? "Null",
      sku: product.sku ?? "Null",
      price: product.price ?? "Null",
      comparePrice: product.compare_price > 0 ? product.compare_price : "no sale",
      quantity: product.quantity ?? "Null",
      city: product.cities?.state[0]?.name ?? "Null",
      status: product.status,
      purchasable: product.purchasable,
      region: product.region_name,
      actions: product,
    }));
  }, [filteredData]); // Dependency array

  // Define columns for the DataGrid
  const gridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "select",
      headerName: "",
      width: '50',
      renderCell: (params) => (
        <Checkbox
          checked={selectedRowIds.includes(params.row.id)}
          onChange={(e) => handleSelectChange(e, params.row.id)}
        />
      ),
    },
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
      width: 70,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "comparePrice",
      headerName: "Compare Price",
      width: 100,
      renderCell: (params) => <Chip label={params.value} />,
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
      field: "purchasable",
      headerName: "purchasable",
      width: 100,
      renderCell: (params) => (
        <ChangeStatusPurshasable
          id={params.row.id}
          currentStatus={params.row.purchasable}
        >
          {params.row.purchasable}
        </ChangeStatusPurshasable>
      ),
    },
    {
      field: "region",
      headerName: "region",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <ProductMenu
          product={params.value}
          count={params.value ? params.value.length : 0}
          page={1}
          handleEdit={handleEdit}
          handleView={handleView}
          handleAddImages={handleAddImages}
          handleImagesSlider={handleImagesSlider}
          handleUpdatePrice={params.row.region ? handleUpdatePrice : false}
          handleDelete={handleDelete}
          handleCat={handleCat}
          navigate={navigate}
        />
      ),
    },
  ];

  return isLoading ? (
    <Loader />
  ) : (
    <Box sx={{ overflow: "scroll", scrollbarWidth: "none" }}>
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

      {id && (
        <UpdateRegionPrice
          id={id}
          productName={productName}
          open={updatePrice}
          setOpen={setUpdatePrice}
        />
      )}

      <Box
        sx={{
          width: "100%",
          backgroundColor: "background.main",
          p: 3,
        }}
      >
        <BoxStyled
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            px: 2,
          }}
        >
          <Typography variant="h5" sx={{ color: "text.main" }}>
            {t("products")}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label={t("City filter")}
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              size="small"
            />
            <TextField
              label={t("Brand filter")}
              value={brandFilter}
              size="small"
              onChange={(e) => setBrandFilter(e.target.value)}
            />
          </Box>
          <Box>
            {selectedRowIds.length > 0 && (
              <Tooltip title="Delete selected products">
                <IconButton
                  variant="contained"
                  color="secondary"
                  onClick={() => BulkDelete()}
                  disabled={loading}
                >
                  {loading ? <CircularProgress /> : <DeleteSweep />}
                </IconButton>
              </Tooltip>
            )}
            <Button
              startIcon={<AddRoundedIcon />}
              variant="contained"
              color="secondary"
              onClick={handleCreate}
            >
              {t("New product")}
            </Button>
          </Box>
        </BoxStyled>

        <BoxStyled
          sx={{
            width: "71vw",
            overflow: "scroll",
            scrollbarWidth: "none",
            py: 0,
            borderRadius: 3,
          }}
        >
          <DataGrid
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 3,
            }}
            rows={rows}
            columns={gridColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
          />
        </BoxStyled>
      </Box>
    </Box>
  );
};

export default ProductIndex;
