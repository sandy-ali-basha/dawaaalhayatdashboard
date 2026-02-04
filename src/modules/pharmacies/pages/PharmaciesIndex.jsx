import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { usePharmacies } from "hooks/pharmacies/usePharmacies";
import Loader from "components/shared/Loader";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ModeOutlined from "@mui/icons-material/ModeOutlined";
import RoomOutlined from "@mui/icons-material/RoomOutlined";
import Search from "@mui/icons-material/Search";
import PharmacyDeleteDialog from "../components/PharmacyDeleteDialog";

const toRadians = (deg) => (deg * Math.PI) / 180;

const haversineDistance = (from, to) => {
  if (!from || !to) return null;
  const earthRadius = 6371;
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
};

const PharmaciesIndex = () => {
  const { isLoading } = usePharmacies();
  const navigate = useNavigate();
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
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyOnly, setNearbyOnly] = useState(false);

  const rows = useMemo(() => {
    const source = data?.data || [];
    const filtered = source.filter((pharmacy) => {
      if (!search) return true;
      const query = search.toLowerCase();
      return (
        pharmacy.name?.toLowerCase().includes(query) ||
        pharmacy.city?.toLowerCase().includes(query) ||
        pharmacy.phone?.toLowerCase().includes(query)
      );
    });

    const withDistance = filtered.map((pharmacy) => ({
      ...pharmacy,
      distanceKm: userLocation
        ? haversineDistance(userLocation, {
            lat: pharmacy.lat,
            lng: pharmacy.lng,
          })
        : null,
    }));

    if (nearbyOnly && userLocation) {
      return withDistance
        .filter((pharmacy) => pharmacy.distanceKm !== null)
        .filter((pharmacy) => pharmacy.distanceKm <= 10)
        .sort((a, b) => a.distanceKm - b.distanceKm);
    }

    if (userLocation) {
      return withDistance.sort(
        (a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0)
      );
    }

    return withDistance;
  }, [data, search, userLocation, nearbyOnly]);

  const handleNearMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      setNearbyOnly(true);
    });
  };

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
    ...(userLocation
      ? [
          {
            field: "distanceKm",
            headerName: "Distance (km)",
            flex: 0.7,
            minWidth: 120,
            valueGetter: (params) =>
              params.row.distanceKm
                ? params.row.distanceKm.toFixed(2)
                : "--",
          },
        ]
      : []),
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
          justifyContent: "space-between",
          mb: 2,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search pharmacies..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={{ width: { xs: "100%", md: "300px" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="outlined" onClick={handleNearMe}>
          Near me
        </Button>
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
