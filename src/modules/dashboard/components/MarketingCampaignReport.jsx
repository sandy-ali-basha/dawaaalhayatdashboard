import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Chart from 'react-apexcharts';

const MarketingCampaignReport = ({ data }) => {
  const options = {
    chart: { type: 'bar' },
    xaxis: { categories: data.campaigns.map(c => c.name) },
  };

  const series = [
    { name: 'Clicks', data: data.campaigns.map(c => c.clicks) },
    { name: 'Conversions', data: data.campaigns.map(c => c.conversions) },
    { name: 'Cost per Acquisition', data: data.campaigns.map(c => c.cpa) },
  ];

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3 ,p:1}}>

      <CardContent>
        <Typography variant="h5" gutterBottom color={"text.main"}>
          Marketing Campaign Report
        </Typography>
        <Chart options={options} series={series} type="bar" height="380" />
      </CardContent>
    </Card>
  );
};

export default MarketingCampaignReport;
