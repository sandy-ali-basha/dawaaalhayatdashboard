import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Divider,
  Stack,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import EditorInput from "./HomeTextEditor";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ImageIcon from "@mui/icons-material/Image";
import { BoxStyled } from "components/styled/BoxStyled";

const ParallaxUpdate = ({ open, onClose, initialData, handleSave }) => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Load initial slides when opened
  useEffect(() => {
    if (initialData?.value?.slides) {
      const cloned = JSON.parse(JSON.stringify(initialData.value.slides));
      setSlides(cloned);
      setCurrentSlide(0);
    }
  }, [initialData, open]);

  const handleTextChange = (lang, value) => {
    setSlides((prev) =>
      prev.map((slide, idx) =>
        idx === currentSlide
          ? { ...slide, [lang]: { ...slide[lang], title: value } }
          : slide
      )
    );
  };

  const handleLinkChange = (value) => {
    setSlides((prev) =>
      prev.map((slide, idx) =>
        idx === currentSlide ? { ...slide, link: value } : slide
      )
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSlides((prev) =>
      prev.map((slide, idx) =>
        idx === currentSlide ? { ...slide, newImage: file } : slide
      )
    );
  };

  const goToSlide = (index) => {
    if (index < 0 || index >= slides.length) return;
    setCurrentSlide(index);
  };

  const saveChanges = () => {
    const formData = new FormData();
    slides.forEach((slide, index) => {
      ["ar", "en", "kr"].forEach((lang) => {
        formData.append(
          `parallax[slides][${index}][${lang}][title]`,
          slide[lang]?.title ?? ""
        );
      });
      formData.append(`parallax[slides][${index}][link]`, slide.link ?? "");
      if (slide.newImage) {
        formData.append(
          `parallax[slides][${index}][image_file]`,
          slide.newImage
        );
      } else {
        formData.append(`parallax[slides][${index}][image]`, slide.image ?? "");
      }
    });
    handleSave(formData);
    onClose();
  };

  if (!slides.length) return null;

  const slide = slides[currentSlide];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Edit Parallax Slides
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            onClick={() => goToSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
            variant="outlined"
            color="primary"
          >
            <ArrowBackIosNewIcon /> Prev
          </IconButton>

          <IconButton
            onClick={() => goToSlide(currentSlide + 1)}
            variant="outlined"
            color="primary"
            disabled={currentSlide === slides.length - 1}
          >
            Next <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Slide Controls */}
        <BoxStyled sx={{ position: "relative", p: 2 }}>
          {/* Image Section */}
          <CardMedia
            component="img"
            src={
              slide.newImage
                ? URL.createObjectURL(slide.newImage)
                : slide.image || "/placeholder.png"
            }
            alt={`Slide ${currentSlide + 1}`}
            sx={{
              height: 220,
              borderRadius: 2,
              objectFit: "cover",
            }}
          />

          <CardContent>
            {/* Image Upload */}
            <Button
              component="label"
              variant="outlined"
              startIcon={<ImageIcon />}
              sx={{ mb: 2 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Slide {currentSlide + 1} of {slides.length}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {slides.map((_, idx) => (
                <Box
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor:
                      idx === currentSlide ? "primary.main" : "grey.400",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </Stack>

            {/* Multilingual Titles */}
            {["ar", "en", "kr"].map((lang) => (
              <Box key={lang} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="text.primary">
                  {lang.toUpperCase()} Title
                </Typography>
                <EditorInput
                  name={`title-${lang}-${currentSlide}`}
                  initialValue={slide[lang]?.title || ""}
                  onChange={(name, value) => handleTextChange(lang, value)}
                />
              </Box>
            ))}

            {/* Link Input */}
            <TextField
              label="Slide Link"
              fullWidth
              variant="outlined"
              value={slide.link || ""}
              onChange={(e) => handleLinkChange(e.target.value)}
              sx={{ my: 2 }}
            />
          </CardContent>
        </BoxStyled>
      </DialogContent>
      <DialogActions>
        <Box textAlign="right" sx={{ mt: 3 }}>
          <Button onClick={saveChanges} variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ParallaxUpdate;
