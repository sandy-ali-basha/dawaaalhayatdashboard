import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
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
  VisibilityOutlined,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useCities } from "hooks/cities/useCities";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Loader from "components/shared/Loader";
import Countries from "../components/Countries";
import CitiesUpdate from "./CitiesUpdate";
import DeleteDialog from "../components/Dialog";
import { InvStore } from "store/invStore";

const CitiesIndex = () => {
  const { t } = useTranslation("index");
  const { data, isLoading } = useCities();
  const cities = useMemo(() => data?.data?.state || [], [data]);
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();

  const [prev_data, setPrev_data] = useState(null);

  const [InvData, setInvData] = InvStore((state) => [
    state.InvData,
    state.setInvData,
  ]);

  const [search, setSearch] = useState("");

  const handleEdit = useCallback(
    (city) => {
      const fullCity = cities.find((c) => c.id === city.id);
      setPrev_data(fullCity || city);
      setOpen(true);
    },
    [cities]
  );

  const handleViewInv = useCallback(
    (row) => {
      const fullCity = cities.find((c) => c.id === row.id);
      setInvData(fullCity); // <-- send full data now
      Navigate("/dashboard/inventory/" + row.id);
    },
    [cities, setInvData, Navigate]
  );

  // Mock product stats (replace with API data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inventories =
    data?.data?.state?.map((city) => {
      return {
        id: city.id,
        name: city?.name?.replace(/^.*?\.\s*/, "") || "-",
        inv: city?.inv_name || "-",
        shipping_price: city?.shipping_price || 0,
        totalProducts: city?.products_count,
        currency_code: city?.currency?.code,
        currency_name: city?.currency?.name,
      };
    }) || [];

  const filteredInventories = useMemo(() => {
    if (!search) return inventories;
    return inventories.filter((inv) =>
      inv.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [inventories, search]);

  const columns = [
    {
      field: "name",
      headerName: "City Name",
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
      field: "inv",
      headerName: "Inventory",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Inventory2Outlined sx={{ mr: 1, color: "primary.main" }} />
          <Typography>{params.row.inv}</Typography>
        </Box>
      ),
    },
    {
      field: "shipping_price",
      headerName: "Shipping",
      flex: 0.7,
      minWidth: 60,
      maxWidth: 100,
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
      field: "currency_code",
      headerName: "$",
      flex: 0.4,
      minWidth: 40,
      maxWidth: 70,
    },
    {
      field: "currency_name",
      headerName: "Curr Name",
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
          <DeleteDialog
            products_count={params.row.totalProducts}
            id={params.row.id}
          />
          <Tooltip title="View">
            <IconButton
              sx={{ color: "secondary.main" }}
              onClick={() => handleViewInv(params.row)}
            >
              <VisibilityOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      <CitiesUpdate
        oldData={prev_data}
        setOldData={setPrev_data}
        open={open}
        setOpen={setOpen}
      />

      <Typography sx={{ color: "text.main", fontWeight: "bold" }} variant="h4">
        Inventory & Countries Management
      </Typography>

      {/* Countries */}
      <Countries />

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
