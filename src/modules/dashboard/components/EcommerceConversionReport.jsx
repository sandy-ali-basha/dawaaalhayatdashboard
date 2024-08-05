import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";

const EcommerceConversionReport = ({ data }) => {
  const options = {
    chart: { type: "bar" },
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
        <Chart options={options} series={series} type="bar" height="380" />
      </CardContent>
    </Card>
  );
};

export default EcommerceConversionReport;
