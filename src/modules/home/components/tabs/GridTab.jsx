import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import { _Home } from "api/home/home";

const GridTab = ({ onEdit }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    _Home
      .getItem(1)
      .then((res) => res)
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <IconButton onClick={() => onEdit("grid")}>
          <Tooltip title={"Edit"}>
            <ModeTwoToneIcon sx={{ color: "text.main" }} />
          </Tooltip>
        </IconButton>
        <Typography variant="h6">Grid</Typography>
        {["ar", "en", "kr"].map((lang) => (
          <div key={lang}>
            <Typography variant="h6">
              <b>{lang.toUpperCase()}:</b>
            </Typography>
            <Grid container>
              <Grid item md={6}>
                {data?.map((section, idx) => (
                  <Typography key={idx}>
                    title - {idx} : {data?.title_[lang] ?? "N/A"}
                  </Typography>
                ))}
              </Grid>
              <Grid item md={6}>
                {data?.map((section, idx) => (
                  <Typography key={idx}>
                    Description {idx} : {data?.description_[lang] ?? "N/A"}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </div>
        ))}

        <Box mt={2}>
          <img
            src={data?.image}
            alt="grid"
            width="100%"
            style={{ borderRadius: 8 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default GridTab;
