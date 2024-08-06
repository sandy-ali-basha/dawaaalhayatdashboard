import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import OrderStatusReport from "../components/OrderStatusReport";
import ProductPerformanceReport from "../components/ProductPerformanceReport";
import AbandonedCartReport from "../components/AbandonedCartReport";
import WebsiteTrafficReport from "../components/WebsiteTrafficReport";
import UserBehaviorReport from "../components/UserBehaviorReport";
import EcommerceConversionReport from "../components/EcommerceConversionReport";
import MarketingCampaignReport from "../components/MarketingCampaignReport";
import ApexChartWrapper from "components/styled/ApexChart";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import { useTheme } from "@mui/material/styles";

const Dashboard = () => {
  const theme = useTheme();
  const orderStatusData = {
    totalOrders: 100,
    deliveredOrders: 80,
    pendingOrders: 15,
    canceledOrders: 5,
  };

  const productPerformanceData = {
    products: [
      {
        name: "Product 1",
        unitsSold: 50,
        conversionRate: 5,
        orderValue: 500,
        returnRate: 2,
      },
      {
        name: "Product 2",
        unitsSold: 30,
        conversionRate: 3,
        orderValue: 300,
        returnRate: 1,
      },
      {
        name: "Product 3",
        unitsSold: 20,
        conversionRate: 2,
        orderValue: 200,
        returnRate: 0,
      },
      {
        name: "Product 3",
        unitsSold: 90,
        conversionRate: 28,
        orderValue: 80,
        returnRate: 60,
      },
      {
        name: "Product 3",
        unitsSold: 123,
        conversionRate: 22,
        orderValue: 544,
        returnRate: 50,
      },
      {
        name: "Product 3",
        unitsSold: 311,
        conversionRate: 2,
        orderValue: 100,
        returnRate: 10,
      },
      {
        name: "Product 3",
        unitsSold: 605,
        conversionRate: 2,
        orderValue: 546,
        returnRate: 400,
      },
    ],
  };

  const abandonedCartData = {
    abandonedCarts: 40,
    abandonedCartRate: 25,
    pointOfAbandonment: {
      shipping: 15,
      payment: 25,
    },
  };

  const websiteTrafficData = {
    sources: [
      { name: "Organic Search", value: 300 },
      { name: "Paid Ads", value: 200 },
      { name: "Social Media", value: 150 },
      { name: "Referrals", value: 100 },
    ],
  };

  const userBehaviorData = {
    timeFrames: ["January", "February", "March", "April", "May"],
    pageviews: [1000, 1500, 1300, 1600, 1700],
    sessionDuration: [54, 650, 5.88, 60.5, 6.8],
    bounceRate: [730, 275, 2550, 822, 1878],
  };

  const ecommerceConversionData = {
    conversionRate: 5,
    averageOrderValue: 50,
    cartAbandonmentRate: 20,
  };

  const marketingCampaignData = {
    campaigns: [
      { name: "Email Campaign", clicks: 300, conversions: 50, cpa: 10 },
      { name: "Social Media Campaign", clicks: 200, conversions: 30, cpa: 15 },
      { name: "Google Ads", clicks: 100, conversions: 20, cpa: 20 },
    ],
  };
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
        <Grid item xs={4} sm={4} md={3}>
          <Card
            sx={{
              display: "flex",
              boxShadow: 3,
              borderRadius: 3,
              p: 2,
              height: "15vh",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              backgroundColor: "primary.light",
              color: "white",
            }}
          >
            {" "}
            <LocalMallIcon />
            <Typography variant="h6">
              totalOrders:
              {orderStatusData?.totalOrders}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <Card
            sx={{
              display: "flex",
              boxShadow: 3,
              borderRadius: 3,
              p: 2,
              height: "15vh",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              backgroundColor: "success.lighter",
              color: "white",
            }}
          >
            {" "}
            <LocalMallIcon />
            <Typography variant="h6">
              deliveredOrders:
              {orderStatusData?.deliveredOrders}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <Card
            sx={{
              display: "flex",
              boxShadow: 3,
              borderRadius: 3,
              p: 2,
              height: "15vh",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              backgroundColor: "info.light",
              color: "white",
            }}
          >
            {" "}
            <LocalMallIcon />
            <Typography variant="h6">
              pendingOrders:
              {orderStatusData?.pendingOrders}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <Card
            sx={{
              display: "flex",
              boxShadow: 3,
              borderRadius: 3,
              p: 2,
              height: "15vh",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              backgroundColor: "error.light",
              color: "white",
            }}
          >
            {" "}
            <LocalMallIcon />
            <Typography variant="h6">
              canceledOrders:
              {orderStatusData?.canceledOrders}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <WebsiteTrafficReport data={websiteTrafficData} colors={colors} />
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <UserBehaviorReport data={userBehaviorData} colors={colors} />
        </Grid>

        <Grid item xs={12} sm={6} md={7}>
          <EcommerceConversionReport
            data={ecommerceConversionData}
            colors={colors}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <AbandonedCartReport data={abandonedCartData} colors={colors} />
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <ProductPerformanceReport
            data={productPerformanceData}
            colors={colors}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={7}>
          <MarketingCampaignReport
            data={marketingCampaignData}
            colors={colors}
          />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default Dashboard;
