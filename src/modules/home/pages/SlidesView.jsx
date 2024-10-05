import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ButtonAction from "components/shared/ButtonAction";
import { _axios } from "interceptor/http-config";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import DeleteSlide from "../components/DeleteSlide";
const SlidesView = () => {
  const { t } = useTranslation("index");
  const [direction] = settingsStore((state) => [state.direction]);
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const { data: slides, isLoading: slidesLoading } = useQuery(
    ["slidesHome"],
    async () => {
      return await _axios.get("/home/slides").then((res) => res.data?.data);
    },
    {}
  );

  return (
    <>
      {slides && (
        <Box>
          {slides?.map((item, idx) => (
            <Box
              sx={{
                position: "relative",
                my: 2,
                boxShadow: 2,
                borderRadius: 3,
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
                src={item.image_path}
                style={{
                  width: "90%",
                  margin: "auto",
                  height: "20vh",
                  objectFit: "contain",
                }}
                alt=""
              />
              <Box display="flex">
                <Typography variant="body1" sx={{ mx: 2, fontWeight: "bold" }}>
                  {" "}
                  arabic title:
                </Typography>{" "}
                <Typography variant="body1">
                  {item?.translations?.find((t) => t.locale === "ar")?.title}
                </Typography>
                <Typography variant="body1" sx={{ mx: 2, fontWeight: "bold" }}>
                  english title:
                </Typography>{" "}
                <Typography variant="body1">
                  {item?.translations?.find((t) => t.locale === "en")?.title}
                </Typography>
                <Typography variant="body1" sx={{ mx: 2, fontWeight: "bold" }}>
                  kurdish title:
                </Typography>{" "}
                <Typography variant="body1">
                  {item?.translations?.find((t) => t.locale === "kr")?.title}
                </Typography>
              </Box>
              <Box sx={{ mx: 2 }}>
                <Typography variant="body1">
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    arabic Description:
                  </Typography>{" "}
                  {item?.translations?.find((t) => t.locale === "ar")?.text}
                </Typography>
                <Typography variant="body1">
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    english Description:
                  </Typography>{" "}
                  {item?.translations?.find((t) => t.locale === "en")?.text}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    kurdish Description:
                  </Typography>{" "}
                  {item?.translations?.find((t) => t.locale === "kr")?.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <div
        style={{
          minWidth: "200px",
          float: direction === "ltr" ? "right" : "left",
          marginTop: "20px",
        }}
      >
        <ButtonAction
          name={t("Back")}
          onClick={handleBack}
          endIcon={direction === "ltr" ? <ArrowForward /> : <ArrowBack />}
        />
      </div>
    </>
  );
};

export default SlidesView;
