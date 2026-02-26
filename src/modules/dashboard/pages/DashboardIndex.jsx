import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import ProductPerformanceReport from "../components/ProductPerformanceReport";
import AbandonedCartReport from "../components/AbandonedCartReport";
import ApexChartWrapper from "components/styled/ApexChart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ReactApexChart from "react-apexcharts";

import { useTheme } from "@mui/material/styles";
import { useAnalytics } from "hooks/analytics/analytics";

const Dashboard = () => {
  const theme = useTheme();
  const { data, isLoading } = useAnalytics();

  const analytics = data || {};

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

  const salesOverviewData = {
    grossRevenue: analytics.salesOverviewData?.grossRevenue ?? 0,
    averageOrderValue: analytics.salesOverviewData?.averageOrderValue ?? 0,
    unitsPerOrder: analytics.salesOverviewData?.unitsPerOrder ?? 0,
    cartToOrderRate: analytics.salesOverviewData?.cartToOrderRate ?? 0,
  };

  const ordersTrendData = analytics.ordersTrendData ?? [];

  const colors = [
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.text.main,
    theme.palette.error.light,
    theme.palette.success.primary,
  ];

  // Timeline chart data
  const trendSeries = [
    {
      name: "Orders",
      data: ordersTrendData.map((p) => p.orders ?? 0),
    },
  ];

  const trendOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: [theme.palette.primary.main],
    dataLabels: { enabled: false },
    markers: {
      size: 4,
      strokeWidth: 2,
      hover: { size: 6 },
    },
    xaxis: {
      categories: ordersTrendData.map((p) => p.date), // timeline labels from API
      title: { text: "Date" },
    },
    yaxis: {
      min: 0,
      forceNiceScale: true,
      title: { text: "Orders" },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 4,
    },
    tooltip: {
      x: { format: "yyyy-MM-dd" },
    },
  };

  return (
    <ApexChartWrapper>
      <Grid container spacing={2}>
        <Grid container spacing={2} item xs={12}>
          <Grid item xs={12} sm={4}>
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

          <Grid item xs={12} sm={4}>
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

          <Grid item xs={12} sm={4}>
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

        {/* KPI cards */}
        <Grid container spacing={2} item xs={12}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="subtitle2">Gross Revenue</Typography>
              <Typography variant="h6">{salesOverviewData.grossRevenue}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="subtitle2">Average Order Value</Typography>
              <Typography variant="h6">{salesOverviewData.averageOrderValue}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="subtitle2">Units / Order</Typography>
              <Typography variant="h6">{salesOverviewData.unitsPerOrder}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="subtitle2">Cart → Order Rate</Typography>
              <Typography variant="h6">{salesOverviewData.cartToOrderRate}%</Typography>
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <AbandonedCartReport data={abandonedCartData} colors={colors} />
        </Grid>

        <Grid item xs={12} md={6}>
          <ProductPerformanceReport data={productPerformanceData} colors={colors} />
        </Grid>

        {/* Orders Trend Timeline Chart */}
        <Grid item xs={12}>
          <Card sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Orders Trend (Last 7 Days)
            </Typography>

            <ReactApexChart
              options={trendOptions}
              series={trendSeries}
              type="line"
              height={320}
            />
          </Card>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
