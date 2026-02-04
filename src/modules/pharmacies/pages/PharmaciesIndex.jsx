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
  const { isLoading } = usePharmacies();
  const navigate = useNavigate();
  const rows = useMemo(() => {
    const data = [
      {
        id: 1,
        name: "صيدلية الشفاء",
        lat: 33.3152,
        lng: 44.3661,
        city: "Baghdad",

        phone: "+964 1 555 0101",
        address: "الكرادة داخل، شارع 52",
      },
      {
        id: 2,
        name: "صيدلية النور",
        lat: 33.3205,
        lng: 44.3612,
        city: "Baghdad",

        phone: "+964 1 555 0102",
        address: "المنصور، شارع 14",
      },
      {
        id: 3,
        name: "صيدلية الرافدين",  
        lat: 33.3121,
        lng: 44.3523,
        city: "Baghdad",

        phone: "+964 1 555 0103",
        address: "الزيونة، شارع الربيع",
      },
      {
        id: 4,
        name: "صيدلية الحياة",
        lat: 33.5138,
        lng: 36.2765,
        city: "Damascus",

        phone: "+963 11 555 0104",
        address: "أبو رمانة، شارع العابد",
      },
      {
        id: 5,
        name: "صيدلية الشام",
        lat: 33.5102,
        lng: 36.2914,
        city: "Damascus",

        phone: "+963 11 555 0105",
        address: "المزة، شارع 30",
      },
      {
        id: 6,
        name: "صيدلية الياسمين",
        lat: 33.5268,
        lng: 36.3127,
        city: "Damascus",

        phone: "+963 11 555 0106",
        address: "كفرسوسة، شارع الجلاء",
      },
    ];
    return data || [];
  }, []);

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
