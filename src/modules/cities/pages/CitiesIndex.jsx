import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  TextField,
  InputAdornment,
  Paper,
  Button,
} from "@mui/material";
import {
  ModeOutlined,
  Search,
  Inventory2Outlined,
  AddCircleOutline,
  InventoryOutlined,
  StoreRounded,
  MoveToInboxRounded,
  ViewDayRounded,
  VisibilityOutlined,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useCities } from "hooks/cities/useCities";
import { colorStore } from "store/ColorsStore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Loader from "components/shared/Loader";
import Countries from "../components/Countries";
import CitiesUpdate from "./CitiesUpdate";
import { BoxStyled } from "components/styled/BoxStyled";
import DeleteDialog from "../components/Dialog";
import { InvStore } from "store/invStore";

const CitiesIndex = () => {
  const { t } = useTranslation("index");
  const { data, isLoading } = useCities();
  const Navigate = useNavigate();

  const [prev_shipping_price, setPrev_shipping_price] = useState(null);
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const [InvId, setInvId] = InvStore((state) => [state.InvId, state.setInvId]);

  const [search, setSearch] = useState("");

  const handleEdit = useCallback(
    (city, id) => {
      setPrev_shipping_price(city);
      setEditedID(id);
    },
    [setPrev_shipping_price, setEditedID]
  );
  const handleViewInv = useCallback(
    (id) => {
      setInvId(id);
      Navigate("/dashboard/inventory/"+ id)
    },
    [Navigate, setInvId]
  );

  // Mock product stats (replace with API data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inventories =
    data?.data?.state?.map((city) => ({
      id: city.id,
      name: city?.name || "غير معروف",
      shipping_price: city?.shipping_price || 0,
      totalProducts: Math.floor(Math.random() * 200),
      stock: Math.floor(Math.random() * 3000),
      currency: city?.currency || "USD",
    })) || [];

  const filteredInventories = useMemo(() => {
    if (!search) return inventories;
    return inventories.filter((inv) =>
      inv.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [inventories, search]);

  const totalStock = inventories.reduce((acc, inv) => acc + inv.stock, 0);
  const totalInventories = inventories.length;
  const totalProducts = inventories.reduce(
    (acc, inv) => acc + inv.totalProducts,
    0
  );

  const columns = [
    {
      field: "name",
      headerName: "Inventory Name",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Inventory2Outlined sx={{ mr: 1, color: "primary.main" }} />
          <Typography>{params.row.name}</Typography>
        </Box>
      ),
    },
    {
      field: "shipping_price",
      headerName: "Shipping",
      flex: 0.7,
      minWidth: 60,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{params.row.shipping_price}</Typography>
        </Box>
      ),
    },
    {
      field: "totalProducts",
      headerName: "Products",
      flex: 0.5,
      minWidth: 60,
      type: "number",
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 0.6,
      minWidth: 60,
      type: "number",
    },
    {
      field: "currency",
      headerName: "Currency",
      flex: 0.4,
      minWidth: 50,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.6,
      minWidth: 100,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => handleEdit(params.row, params.row.id)}
              sx={{ color: "primary.main" }}
            >
              <ModeOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton sx={{ color: "error.main" }}>
              <DeleteDialog id={params.row.id} />
            </IconButton>
          </Tooltip>

          <Tooltip title="View">
            <IconButton
              sx={{ color: "secondary.main" }}
              onClick={() => handleViewInv(params.row.id)}
            >
              <VisibilityOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const IconBox = ({ icon }) => {
    return (
      <Box
        sx={{
          background: "#eee",
          borderRadius: 1,
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "text.primary",
          fontSize: "2rem",
        }}
      >
        {icon}
      </Box>
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <CitiesUpdate old_data={prev_shipping_price} />}

      <Typography sx={{ color: "text.main", fontWeight: "bold" }} variant="h4">
        Inventory & Countries Management
      </Typography>

      <Countries />
      <Divider sx={{ my: 3 }} />

      {/* Summary Section */}
      <BoxStyled
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "space-evenly",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Total Inventories
            </Typography>
            <Typography variant="h5" color="text.main" fontWeight={600}>
              {totalInventories}
            </Typography>
          </Box>

          <IconBox icon={<InventoryOutlined />} />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Total Stock
            </Typography>
            <Typography variant="h5" fontWeight={600}>
              {totalStock}
            </Typography>
          </Box>
          <IconBox icon={<StoreRounded />} />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Total Products
            </Typography>
            <Typography variant="h5" fontWeight={600}>
              {totalProducts}
            </Typography>
          </Box>
          <IconBox icon={<MoveToInboxRounded />} />
        </Box>
      </BoxStyled>

      {/* Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search inventories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: "100%", md: "300px" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          startIcon={<AddCircleOutline />}
          sx={{ borderRadius: 2 }}
          onClick={() => Navigate("create")}
        >
          {t("add new")}
        </Button>
      </Box>

      {/* DataGrid Table */}
      <Paper elevation={3} sx={{ borderRadius: 3, height: 600, width: "100%" }}>
        <DataGrid
          rows={filteredInventories}
          columns={columns}
          pagination
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          disableRowSelectionOnClick
          sx={{
            borderRadius: 3,
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "grey.100",
              fontWeight: 600,
            },
          }}
        />
      </Paper>
    </>
  );
};

export default CitiesIndex;
