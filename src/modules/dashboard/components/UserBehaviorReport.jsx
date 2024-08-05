import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";

const UserBehaviorReport = ({ data }) => {
  const options = {
    chart: { type: "line" },
    xaxis: { categories: data.timeFrames },
  };

  const series = [
    { name: "Pageviews", data: data.pageviews },
    { name: "Session Duration", data: data.sessionDuration },
    { name: "Bounce Rate", data: data.bounceRate },
  ];

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3 ,p:1}}>

      <CardContent>
        <Typography variant="h5" gutterBottom color={"text.main"}>
          User Behavior Report
        </Typography>
        <Chart options={options} series={series} type="line" height="380" />
      </CardContent>
    </Card>
  );
};

export default UserBehaviorReport;
