import React from "react";
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

const ParallaxTab = ({ parallax, direction, onEdit }) => (
  <Card sx={{ mt: 3 }}>
    <CardContent>
      <IconButton onClick={() => onEdit(parallax)}>
        <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
          <ModeTwoToneIcon sx={{ color: "text.main" }} />
        </Tooltip>
      </IconButton>
      <Typography variant="h6" gutterBottom>
        Parallax Slides
      </Typography>

      {parallax?.value?.slides?.map((slide, index) => (
        <Box
          key={index}
          sx={{
            mb: 4,
            p: 2,
            border: "1px solid #eee",
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <b>Slide {index + 1}</b>
          </Typography>

          {slide.image && (
            <Box sx={{ mb: 2 }}>
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </Box>
          )}

          <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
            <b>Link:</b>{" "}
            <a href={slide.link} target="_blank" rel="noopener noreferrer">
              {slide.link}
            </a>
          </Typography>

          <Grid container spacing={2}>
            {["ar", "en", "kr"].map((lang) => (
              <Grid item xs={12} md={4} key={lang}>
                <Typography variant="body1">
                  <b>{lang.toUpperCase()}:</b>{" "}
                  {slide?.[lang]?.title ?? "N/A"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </CardContent>
  </Card>
);

export default ParallaxTab;
