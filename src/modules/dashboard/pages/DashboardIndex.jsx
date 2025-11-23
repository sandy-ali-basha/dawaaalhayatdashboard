import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import ProductPerformanceReport from "../components/ProductPerformanceReport";
import AbandonedCartReport from "../components/AbandonedCartReport";
import ApexChartWrapper from "components/styled/ApexChart";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import { useTheme } from "@mui/material/styles";
import { useAnalytics } from "hooks/analytics/analytics";

const Dashboard = () => {
  const theme = useTheme();
  const { data, isLoading } = useAnalytics();

  const analytics = data?.data || {}; // Just to avoid undefined

  // -------------------------
  // 🔹 Extract API data safely
  // -------------------------
  const orderStatusData = {
    totalOrders: analytics.orderStatusData?.totalOrders ?? 0,
    completedCarts: analytics.orderStatusData?.completedCarts ?? 0,
    abandonedCart: analytics.orderStatusData?.abandonedCart ?? 0,
  };

  const productPerformanceData = {
    products: analytics.productPerformanceData?.products ?? [],
  };

  const abandonedCartData = {
    abandonedCarts: analytics.abandonedCartData?.abandonedCarts ?? 0,
    abandonedCartRate: analytics.abandonedCartData?.abandonedCartRate ?? 0,
    pointOfAbandonment:
      analytics.abandonedCartData?.pointOfAbandonment || {
        shipping: 0,
        payment: 0,
        checkout: 0,
      },
  };

  // Colors used by charts
  const colors = [
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.text.main,
    theme.palette.error.light,
    theme.palette.success.primary,
  ];

  return (
    <ApexChartWrapper>
      <Grid container spacing={2}>
        {/* -------------------------------------- */}
        {/* 🟪 ORDER STATUS (from API)             */}
        {/* -------------------------------------- */}
        <Grid container spacing={2} item xs={12}>
          <Grid item xs={12} sm={4} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3,
                borderRadius: 3,
                p: 2,
                height: "100%",
                backgroundColor: "primary.light",
                color: "white",
              }}
            >
              <LocalMallIcon sx={{ fontSize: 40 }} />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Total Orders: {orderStatusData.totalOrders}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3,
                borderRadius: 3,
                p: 2,
                height: "100%",
                backgroundColor: "success.light",
                color: "white",
              }}
            >
              <LocalMallIcon sx={{ fontSize: 40 }} />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Completed Carts: {orderStatusData.completedCarts}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3,
                borderRadius: 3,
                p: 2,
                height: "100%",
                backgroundColor: "error.light",
                color: "white",
              }}
            >
              <LocalMallIcon sx={{ fontSize: 40 }} />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Abandoned Carts: {orderStatusData.abandonedCart}
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* -------------------------------------- */}
        {/* 🟥 Abandoned Cart Report               */}
        {/* -------------------------------------- */}
        <Grid item xs={12} md={6}>
          <AbandonedCartReport data={abandonedCartData} colors={colors} />
        </Grid>

        {/* -------------------------------------- */}
        {/* 🟦 Product Performance Report           */}
        {/* -------------------------------------- */}
        <Grid item xs={12} md={6}>
          <ProductPerformanceReport
            data={productPerformanceData}
            colors={colors}
          />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
