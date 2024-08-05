import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";

const WebsiteTrafficReport = ({ data ,colors}) => {
  const options = {
    chart: { type: "donut" },
    colors:colors,
    labels: data.sources.map((source) => source.name),
  };

  const series = data.sources.map((source) => source.value);

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3, p: 1 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom color={"text.main"}>
          Website Traffic Report
        </Typography>
        <Chart options={options} series={series} type="donut" width="380" />
      </CardContent>
    </Card>
  );
};

export default WebsiteTrafficReport;
