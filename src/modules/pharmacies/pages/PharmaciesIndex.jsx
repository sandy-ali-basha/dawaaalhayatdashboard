import React, { useMemo } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { usePharmacies } from "hooks/pharmacies/usePharmacies";
import Loader from "components/shared/Loader";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ModeOutlined from "@mui/icons-material/ModeOutlined";
import RoomOutlined from "@mui/icons-material/RoomOutlined";
import PharmacyDeleteDialog from "../components/PharmacyDeleteDialog";

const PharmaciesIndex = () => {
  const { data, isLoading } = usePharmacies();
  const navigate = useNavigate();

  const rows = useMemo(() => data?.data || [], [data]);

  const columns = [
    {
      field: "name",
      headerName: "Pharmacy",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.7,
      minWidth: 120,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "coordinates",
      headerName: "Location",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <RoomOutlined sx={{ mr: 0.5, color: "primary.main" }} />
          <Typography variant="body2">
            {params.row.lat?.toFixed(4)}, {params.row.lng?.toFixed(4)}
          </Typography>
        </Box>
      ),
    },
    {
      field: "hasProducts",
      headerName: "Products",
      flex: 0.6,
      minWidth: 110,
      valueGetter: (params) => (params.row.hasProducts === false ? "No" : "Yes"),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.6,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton
              sx={{ color: "primary.main" }}
              onClick={() => navigate(`update/${params.row.id}`)}
            >
              <ModeOutlined />
            </IconButton>
          </Tooltip>
          <PharmacyDeleteDialog id={params.row.id} />
        </Box>
      ),
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      <Typography sx={{ color: "text.main", fontWeight: "bold" }} variant="h4">
        Pharmacies Management
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddCircleOutline />}
          sx={{ borderRadius: 2 }}
          onClick={() => navigate("create")}
        >
          Add Pharmacy
        </Button>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 3, height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
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
            },
          }}
        />
      </Paper>
    </>
  );
};

export default PharmaciesIndex;
