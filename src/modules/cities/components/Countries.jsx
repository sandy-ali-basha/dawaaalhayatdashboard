import React, { useCallback, useState } from "react";
import {
  Typography,
  Box,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
} from "@mui/material";

import {
  AttachMoney,
  Inventory2Outlined,
  LocalShippingOutlined,
  ModeEdit,
  ModeOutlined,
  ToggleOff,
  ToggleOn,
} from "@mui/icons-material";
import { useRegions } from "hooks/regions/useRegions";
import { colorStore } from "store/ColorsStore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DeleteCountry from "./DeleteCountry";
import LinkCityToCountry from "./LinkCityToCountry";
import CitiesUpdate from "../pages/CitiesUpdate";
import ChangeStatus from "modules/regions/components/ChangeStatus";

const Countries = () => {
  const { t } = useTranslation("index");
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: COUNTRIES, isLoading: COUNTRIESLOADING } = useRegions();
  const [openLink, setopenLink] = useState(false);
  const [setEditedID] = colorStore((state) => [state.setEditedID]);

  const handleLink = useCallback(
    (id) => {
      setopenLink(true);
      setEditedID(id);
    },
    [setEditedID]
  );
  const [Prev_cityData, setPrev_cityData] = useState(null);
  const [editCity, setEditCity] = useState(false);

  const handleEdit = useCallback(
    (city, id) => {
      setPrev_cityData(city);
      setEditCity(id);
      setOpen(true);
    },
    [setPrev_cityData, setEditCity]
  );

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      {/* Header */}
      {openLink && (
        <LinkCityToCountry openLink={openLink} setopenLink={setopenLink} />
      )}
      {editCity && (
         <CitiesUpdate
          oldData={Prev_cityData}
          setOldData={setPrev_cityData}
          open={open}
          setOpen={setOpen}
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography sx={{ color: "text.main" }} variant="h5">
          {t("Countries By City") || "المدن حسب البلد"}
        </Typography>

        <IconButton
          color="secondary"
          sx={{
            color: "white",
            borderRadius: 2,
            bgcolor: "primary.light",
            px: 2,
            "&:hover": { bgcolor: "primary.main" },
          }}
          onClick={() => {
            Navigate("create/country");
          }}
        >
          + {t("add new Country") || "إضافة مدينة جديد"}
        </IconButton>
      </Box>

      {COUNTRIESLOADING ? (
        // 🔄 Shimmer Loader (Skeletons)
        <>
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 2,
                p: 2,
                my: 3,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Skeleton variant="text" width="30%" height={30} />
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Skeleton
                    variant="circular"
                    width={30}
                    height={30}
                    sx={{ mx: 1 }}
                  />
                  <Skeleton
                    variant="circular"
                    width={30}
                    height={30}
                    sx={{ mx: 1 }}
                  />
                </Box>
              </Box>

              <CardContent sx={{ p: 1, flexGrow: 1 }}>
                <Grid container spacing={1}>
                  {[...Array(4)].map((_, i) => (
                    <Grid item md={6} key={i}>
                      <Skeleton
                        variant="Outlined"
                        height={35}
                        sx={{ borderRadius: 1, mx: 1, mb: 1 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        // ✅ Actual Data
        COUNTRIES?.data?.map((item) => (
          <Card
            key={item.id}
            sx={{
              borderRadius: 2,
              p: 2,
              my: 3,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                {item?.name || "غير معروف"}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mr: 1,
                    px: 1,
                    borderRadius: 1,
                    bgcolor: item?.is_active ? "success.light" : "error.light",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: item?.is_active ? "success.dark" : "error.dark",
                      fontWeight: 600,
                      mr: 0.5,
                    }}
                  >
                    {item?.is_active ? "Active" : "Not Active"}
                  </Typography>
                  <ChangeStatus id={item?.id}>
                    {item?.is_active ? (
                      <ToggleOn fontSize="small" />
                    ) : (
                      <ToggleOff fontSize="small" />
                    )}
                  </ChangeStatus>
                </Box>
                <IconButton color="error">
                  <DeleteCountry status={false} id={item?.id} />
                </IconButton>

                <Tooltip title={"Edit"}>
                  <IconButton
                    onClick={() => handleLink(item)}
                    sx={{ color: "text.main" }}
                  >
                    <ModeOutlined />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <CardContent sx={{ p: 1, flexGrow: 1 }}>
              <Grid container spacing={1}>
                {item.cities?.map((city) => (
                  <Grid item md={4} key={city.id}>
                    <Card
                      sx={{
                        borderRadius: 1,
                        backgroundColor: "#eee",
                        BoxShadow: "none",
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        {/* Header Row */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1.5,
                          }}
                        >
                          <Typography
                            variant="h6"
                            color="text.primary"
                            sx={{ fontWeight: 600 }}
                          >
                            {city?.name || "غير معروف"}
                          </Typography>

                          <Tooltip title="Edit City">
                            <IconButton
                              onClick={() => handleEdit(city, city?.id)}
                              color="primary"
                              size="small"
                              sx={{
                                backgroundColor: "action.hover",
                                "&:hover": { backgroundColor: "primary.light" },
                              }}
                            >
                              <ModeEdit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        {/* Info Rows */}
                        <Stack spacing={1.2}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Inventory2Outlined
                              fontSize="small"
                              sx={{ mr: 1, color: "text.secondary" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              <strong>Inventory:</strong>{" "}
                              {city?.inv_name || "غير معروف"}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <LocalShippingOutlined
                              fontSize="small"
                              sx={{ mr: 1, color: "text.secondary" }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              <strong>Shipping:</strong>{" "}
                              {city?.shipping_price
                                ? `${city.shipping_price} ${
                                    city.currency?.code || ""
                                  }`
                                : "غير معروف"}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                              justifyContent: "flex-end",
                            }}
                          >
                            <AttachMoney
                              sx={{ mr: 0.5, color: "info.main" }}
                              fontSize="small"
                            />
                            <Typography variant="subtitle2" color="info.main">
                              {city?.currency?.name || "N/A"}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Countries;
