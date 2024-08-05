import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";

const AbandonedCartReport = ({ data }) => {
  const options = {
    chart: { type: "bar" },
    xaxis: { categories: ["Abandoned Carts", "Abandoned Cart Rate"] },
  };

  const series = [
    { name: "Metrics", data: [data.abandonedCarts, data.abandonedCartRate] },
  ];

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3 ,p:1}}>

      <CardContent>
        <Typography variant="h5" gutterBottom color={"text.main"}>
          Abandoned Cart Report
        </Typography>
        <Chart options={options} series={series} type="bar" height="380" />
      </CardContent>
    </Card>
  );
};

export default AbandonedCartReport;
