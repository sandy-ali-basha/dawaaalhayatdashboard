import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Chart from "react-apexcharts";
const OrderStatusReport = ({ data,colors }) => {
  const theme = useTheme();

  const options = {
    chart: { type: "pie" },
    labels: [
      "Total Orders",
      "Delivered Orders",
      "Pending Orders",
      "Canceled Orders",
    ],
    colors: colors,
    stroke: {
      width: 1,
      curve: "smooth",
      colors: [theme.palette.background.paper],
    },
  };

  const series = [
    data.totalOrders,
    data.deliveredOrders,
    data.pendingOrders,
    data.canceledOrders,
  ];

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3, p: 1 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom color={"text.main"}>
          Order Status Report
        </Typography>
        <Chart options={options} series={series} type="pie" width="380" />
      </CardContent>
    </Card>
  );
};

export default OrderStatusReport;
