import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";

const UserBehaviorReport = ({ data, colors }) => {
  const options = {
    chart: { type: "area" },
    xaxis: { categories: data.timeFrames },
    colors: colors,
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
    { name: "Pageviews", data: data.pageviews },
    { name: "Session Duration", data: data.sessionDuration },
    { name: "Bounce Rate", data: data.bounceRate },
  ];

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3, p: 1 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom color={"text.main"}>
          User Behavior Report
        </Typography>
        <Chart options={options} series={series} type="area" />
      </CardContent>
    </Card>
  );
};

export default UserBehaviorReport;
