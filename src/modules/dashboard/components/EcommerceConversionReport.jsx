import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";

const EcommerceConversionReport = ({ data, colors }) => {
  const options = {
    chart: { type: "area" },
    colors: colors,
    xaxis: {
      categories: [
        "Conversion Rate",
        "Average Order Value",
        "Cart Abandonment Rate",
      ],
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
  };

  const series = [
    {
      name: "Metrics",
      data: [
        data.conversionRate,
        data.averageOrderValue,
        data.cartAbandonmentRate,
      ],
    },
  ];

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3, p: 1 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom color={"text.main"}>
          Ecommerce Conversion Report
        </Typography>
        <Chart options={options} series={series} type="area" />
      </CardContent>
    </Card>
  );
};

export default EcommerceConversionReport;
