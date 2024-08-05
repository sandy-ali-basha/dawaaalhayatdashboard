import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";

const ProductPerformanceReport = ({ data, colors }) => {
  const options = {
    chart: { type: "bar" },
    xaxis: { categories: data.products.map((p) => p.name) },
    colors: colors,
  };

  const series = [
    { name: "Units Sold", data: data.products.map((p) => p.unitsSold) },
    {
      name: "Conversion Rate",
      data: data.products.map((p) => p.conversionRate),
    },
    { name: "Order Value", data: data.products.map((p) => p.orderValue) },
    { name: "Return Rate", data: data.products.map((p) => p.returnRate) },
  ];

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3, p: 1 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom color={"text.main"}>
          Product Performance Report
        </Typography>
        <Chart options={options} series={series} type="bar"   />
      </CardContent>
    </Card>
  );
};

export default ProductPerformanceReport;
