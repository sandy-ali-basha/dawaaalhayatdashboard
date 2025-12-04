import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  Divider,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import {
  DeleteOutline,
  ModeEditTwoTone,
  LanguageOutlined,
  LinkOutlined,
  TitleOutlined,
  AddHomeOutlined,
} from "@mui/icons-material";
import { settingsStore } from "store/settingsStore";
import Loader from "components/shared/Loader";
import { useHomeSlides } from "hooks/home/useHomeSlides";
import { useNavigate } from "react-router-dom";
import DeleteSlide from "modules/home/components/DeleteSlide";

const SlidesView = () => {
  const [direction] = settingsStore((state) => [state.direction]);
  const { data: slides, isLoading } = useHomeSlides();
  const navigate = useNavigate();

  // Pagination setup
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const totalSlides = slides?.home_slides?.length || 0;
  const pageCount = Math.ceil(totalSlides / itemsPerPage);
  const paginatedSlides = slides?.home_slides?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleEditClick = (id) => navigate("editSlide/" + id);
  const handlePageChange = (_, value) => setPage(value);

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ p: 0 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="text.main" mb={1}>
          Slides Overview
        </Typography>
        <Tooltip title="Add Slider">
          <IconButton variant="outlined" onClick={() => navigate("addslider")}>
            <AddHomeOutlined sx={{ color: "warning.main", mr: 1 }} />
            Add Slide
          </IconButton>
        </Tooltip>
      </Box>
      {/* Optional Search/Filter */}
      <Stack direction="row" spacing={2} mb={1}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search slides..."
          fullWidth
        />
      </Stack>

      {/* Slides Grid */}
      <Grid container spacing={3}>
        {paginatedSlides?.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={
                  item?.image ??
                  "https://via.placeholder.com/300x180?text=No+Image"
                }
                alt={item?.title ?? "Slide image"}
                sx={{ objectFit: "cover" }}
              />

              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary.main"
                  gutterBottom
                >
                  <TitleOutlined
                    fontSize="small"
                    sx={{ mr: 1, verticalAlign: "middle" }}
                  />
                  {item?.title ?? "Untitled"}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  <LanguageOutlined fontSize="small" sx={{ mr: 1 }} />
                  <strong>Arabic:</strong>{" "}
                  {item?.translations?.find((t) => t.locale === "ar")?.text ??
                    "—"}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  <LanguageOutlined fontSize="small" sx={{ mr: 1 }} />
                  <strong>English:</strong>{" "}
                  {item?.translations?.find((t) => t.locale === "en")?.text ??
                    "—"}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  <LanguageOutlined fontSize="small" sx={{ mr: 1 }} />
                  <strong>Kurdish:</strong>{" "}
                  {item?.translations?.find((t) => t.locale === "kr")?.text ??
                    "—"}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <LinkOutlined fontSize="small" sx={{ mr: 1 }} />
                  {item?.link ?? "No link"}
                </Typography>
              </CardContent>

              <CardActions
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: 2,
                  display: "flex",
                }}
              >
                <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEditClick(item.id)}
                  >
                    <ModeEditTwoTone />
                  </IconButton>
                </Tooltip>

                <IconButton>
                  <Tooltip title={"Delete"}>
                    <DeleteSlide id={item?.id} count={1} page={1} />
                  </Tooltip>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="Outlined"
            size="medium"
          />
        </Box>
      )}
    </Box>
  );
};

export default SlidesView;
