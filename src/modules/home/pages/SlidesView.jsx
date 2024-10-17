import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { settingsStore } from "store/settingsStore";
import DeleteSlide from "../components/DeleteSlide";
import Loader from "components/shared/Loader";
import { useHomeSlides } from "hooks/home/useHomeSlides";
import { BoxStyled } from "components/styled/BoxStyled";

const SlidesView = () => {
  const [direction] = settingsStore((state) => [state.direction]);
  const { data: slides, isLoading } = useHomeSlides();

  return (
    <>
      {isLoading && <Loader />}
      {slides && (
        <Box>
          {slides?.home_slides?.map((item, idx) => (
            <BoxStyled
              sx={{
                position: "relative",
                my: 2,
                p: 1,
              }}
            >
              <IconButton sx={{ position: "absolute", top: 0, left: 0 }}>
                <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
                  <DeleteSlide id={item?.id} />
                </Tooltip>
              </IconButton>
              <img
                key={idx}
                src={item?.image ?? "null"}
                style={{
                  width: "90%",
                  margin: "auto",
                  height: "20vh",
                  objectFit: "contain",
                }}
                alt=""
              />
              <Box>
                <Typography
                  variant="body1"
                  sx={{ mx: 2, fontWeight: "bold", color: "text.primary" }}
                >
                  {" "}
                  title:
                </Typography>{" "}
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {item?.title ?? "null"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mx: 2, fontWeight: "bold", color: "text.primary" }}
                >
                  {" "}
                  arabic title:
                </Typography>{" "}
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {item?.translations?.find((t) => t.locale === "ar")?.text ??
                    "null"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mx: 2, fontWeight: "bold", color: "text.primary" }}
                >
                  english title:
                </Typography>{" "}
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {item?.translations?.find((t) => t.locale === "en")?.text ??
                    "null"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mx: 2, fontWeight: "bold", color: "text.primary" }}
                >
                  kurdish title:
                </Typography>{" "}
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {item?.translations?.find((t) => t.locale === "kr")?.text ??
                    "null"}
                </Typography>
              </Box>
              <Box sx={{ mx: 2 }}>
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "text.primary" }}
                  >
                    text:
                  </Typography>{" "}
                  {item?.text ?? "null"}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "text.primary" }}
                  >
                    arabic text:
                  </Typography>{" "}
                  {item?.translations?.find((t) => t.locale === "ar")?.text ??
                    "null"}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "text.primary" }}
                  >
                    english text:
                  </Typography>{" "}
                  {item?.translations?.find((t) => t.locale === "en")?.text ??
                    "null"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "text.primary" }}
                  >
                    kurdish Description:
                  </Typography>{" "}
                  {item?.translations?.find((t) => t.locale === "kr")?.text ??
                    "null"}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "text.primary" }}
                  >
                    Link: {item?.link ?? "null"}
                  </Typography>
                </Typography>
              </Box>
            </BoxStyled>
          ))}
        </Box>
      )}
    </>
  );
};

export default SlidesView;
