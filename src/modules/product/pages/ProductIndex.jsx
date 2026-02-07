import React, { useMemo, useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Checkbox,
  IconButton,
  CircularProgress,
  Tooltip,
  Avatar,
  Stack,
  Card,
} from "@mui/material";
import Loader from "components/shared/Loader";
import ProductUpdate from "./ProductUpdate";
import DeleteDialog from "../components/Dialog";
import AddImages from "./steps/AddImages";
import ProductAttr from "./ProductAttr";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ChangeStatus from "../components/ChangeStatus";
import ProductMenu from "../components/productMenu";
import { useProductIndex } from "../hooks/useProductsIndex";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteSweep, ImageOutlined, MonetizationOn } from "@mui/icons-material";
import { BoxStyled } from "components/styled/BoxStyled";
import UpdateRegionPrice from "../components/UpdateRegionPrice";
import AddImagesSlider from "./steps/AddImagesSlider";
import { useSettings } from "hooks/settings/useSettings";
import SettingsUpdate from "modules/Settings/pages/SettingsUpdate";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";

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
    productName,
  } = useProductIndex();

  const { data: settingsData, isLoading: settingsLoading } = useSettings();
  const [openPointPrice, setOpenPointPrice] = useState(false);
  const pointPrice = settingsData?.data?.point_price;

  const rows = useMemo(() => {
    return filteredData.map((product) => ({
      select: product.id,
      id: product.id,
      image: product.images?.[0]?.image_path ?? "",
      name: product.name.en ?? " ",
      sku: product.sku ?? " ",
      brand: product.brand ?? "",
      comparePrice:
        product.compare_price > 0 ? product.compare_price : "no sale",
      status: product.status,
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
      width: "50",
      renderCell: (params) => (
        <Checkbox
          checked={selectedRowIds.includes(params.row.id)}
          onChange={(e) => handleSelectChange(e, params.row.id)}
        />
      ),
    },
    {
      field: "image",
      headerName: "",
      width: "50",
      renderCell: (params) =>
        (
          <Avatar
            variant="square"
            sx={{ bgcolor: "#e4e4e4", py: 1 }}
            src={params.row.image}
          >
            <ImageOutlined />
          </Avatar>
        ) ?? " ",
    },
    {
      field: "name",
      headerName: "Product Name",
      width: 200,
      renderCell: (params) => (
        <Tooltip title="View">
          <Typography
            variant="body1"
            sx={{ cursor: "pointer", pt: 2 }}
            onClick={() => handleView(params.row.id)}
          >
            {" "}
            {params.row.name}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "sku",
      headerName: "SKU",
      width: 150,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
      renderCell: (params) => (
        <Tooltip title="View">
          <Typography variant="body1" sx={{ pt: 2 }}>
            {" "}
            {params.row.brand?.name}
          </Typography>
        </Tooltip>
      ),
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
    // {
    //   field: "purchasable",
    //   headerName: "purchasable",
    //   width: 100,
    //   renderCell: (params) => (
    //     <ChangeStatusPurshasable
    //       id={params.row.id}
    //       currentStatus={params.row.purchasable}
    //     >
    //       {params.row.purchasable}
    //     </ChangeStatusPurshasable>
    //   ),
    // },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
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
      {openPointPrice && (
        <SettingsUpdate
          open={openPointPrice}
          setOpen={setOpenPointPrice}
          value={pointPrice?.value}
        />
      )}
   <Box sx={{ p: { xs: 2, md: 2 }, backgroundColor: "background.main", minHeight: "100vh" }}>
      
      {/* 1. Header Section: Title and Point Price */}
      <Stack 
        direction={{ xs: "column", sm: "row" }} 
        justifyContent="space-between" 
        alignItems={{ xs: "flex-start", sm: "center" }} 
        sx={{ mb: 4, gap: 1 }}
      >
        <Typography variant="h4" sx={{ color: "text.main", fontWeight: 700 }}>
          {t("products")}
        </Typography>

        <Card sx={{ 
          p: "6px 16px", 
          borderRadius: "12px", 
          boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
          border: "1px solid",
          borderColor: "divider"
        }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <MonetizationOn color="primary" />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                {t("point price")}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1 }}>
                {settingsLoading ? <CircularProgress size={16} /> : (pointPrice?.value ?? t("Null"))}
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setOpenPointPrice(true)}
              disabled={settingsLoading || !pointPrice}
              sx={{ bgcolor: "action.hover" }}
            >
              <ModeTwoToneIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Card>
      </Stack>

      {/* 2. Actions & Filters Bar */}
      <BoxStyled
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
          mb: 3,
          p: 2,
          borderRadius: "16px",
          bgcolor: "background.paper",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.03)"
        }}
      >
        {/* Filters Group */}
        <Stack direction="row" spacing={2} flexGrow={1}>
          <TextField
            label={t("City filter")}
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 200 }}
          />
          <TextField
            label={t("Brand filter")}
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 200 }}
          />
        </Stack>

        {/* Buttons Group */}
        <Stack direction="row" spacing={1.5} justifyContent="flex-end">
          {selectedRowIds.length > 0 && (
            <Tooltip title={t("Delete selected")}>
              <Button
                variant="contained"
                color="error"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DeleteSweep />}
                onClick={() => BulkDelete()}
                disabled={loading}
                sx={{ borderRadius: "8px", textTransform: "none" }}
              >
                {t("Delete")} ({selectedRowIds.length})
              </Button>
            </Tooltip>
          )}
          
          <Button
            startIcon={<AddOutlinedIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
            sx={{ 
                borderRadius: "8px", 
                px: 3,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0px 4px 12px rgba(var(--mui-palette-secondary-mainChannel), 0.3)"
            }}
          >
            {t("New product")}
          </Button>
        </Stack>
      </BoxStyled>

      {/* 3. DataGrid Section */}
      <BoxStyled
        sx={{
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden", // لمنع خروج الحواف عن الانحناء
          bgcolor: "background.paper",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.04)",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "action.hover",
            fontWeight: 700
          }
        }}
      >
        <DataGrid
          autoHeight
          rows={rows}
          columns={gridColumns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection // تفعيل اختيار الصفوف للحذف الجماعي
          disableRowSelectionOnClick
        />
      </BoxStyled>
    </Box>
    </Box>
  );
};

export default ProductIndex;
