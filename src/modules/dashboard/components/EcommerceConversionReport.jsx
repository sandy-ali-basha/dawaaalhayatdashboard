import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";

const EcommerceConversionReport = ({ data ,colors}) => {
  const options = {
    chart: { type: "bar" },
    colors:colors,
    xaxis: {
      categories: [
        "Conversion Rate",
        "Average Order Value",
        "Cart Abandonment Rate",
      ],
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
    <Card sx={{ boxShadow: 3, borderRadius: 3 ,p:1}}>

      <CardContent>
        <Typography variant="h5" gutterBottom color={"text.main"}>
          Ecommerce Conversion Report
        </Typography>
        <Chart options={options} series={series} type="bar"   />
      </CardContent>
    </Card>
  );
};

export default EcommerceConversionReport;
