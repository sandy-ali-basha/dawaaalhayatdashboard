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
  const { data, isLoading } = usePharmacies();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyOnly, setNearbyOnly] = useState(false);

  const rows = useMemo(() => {
    if(isLoading) return
    else {
    
      const source = data?.data;
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
          (a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0),
        );
      }
  
      return withDistance;
    }
  }, [isLoading, data?.data, nearbyOnly, userLocation, search]);


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

  return isLoading ? (
    <Loader />
  ) : (
    <>
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
