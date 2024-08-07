import { Box, Typography } from "@mui/material";
import ButtonAction from "components/shared/ButtonAction";
import Loader from "components/shared/Loader";
import { _axios } from "interceptor/http-config";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { ArrowBack, ArrowForward, CloseTwoTone } from "@mui/icons-material";

const CareersView = () => {
  const { t } = useTranslation("index");
  const [direction] = settingsStore((state) => [state.direction]);
  const params = useParams();
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const { data, isLoading } = useQuery(
    ["careers", `id-${params.id}`],
    async () => {
      const res = await _axios.get(`/careers/${params.id}`, {
        headers: {
          translations: "true",
        },
      });
      return res.data?.data;
    }
  );

  const columns = [
    { head: t("Name"), value: data?.vacancy_name },
    { head: t("Requisition No"), value: data?.requisition_no },
    { head: t("Time Type"), value: data?.time_type },
    { head: t("Location"), value: data?.location },
    { head: t("Country"), value: data?.country },

    { head: t("Category"), value: data?.category },
  ];

  const translations = data?.translations?.map((translation) => ({
    locale: translation.locale,
    name: translation.vacancy_name,
    location: translation.location,
    country: translation.country,
    description: translation.description,
    about_us: translation.about_us,
  }));

  return (
    <>
      {isLoading && <Loader />}

      {data && (
        <Box sx={{ width: "70vw" }}>
          <Typography
            sx={{
              backgroundColor: "card.main",
              borderRadius: "5px",
              color: "text.main",
              width: "40%",
              marginInline: "auto",
              textTransform: "uppercase",
              padding: "10px 20px",
              textAlign: "center",
            }}
            variant="h5"
          >
            {data?.vacancy_name}
          </Typography>
          <Box
            key={params.id}
            sx={{
              display: "flex",
              color: "lightGray.main",
              columnGap: 10,
              marginTop: "4%",
              width: "75vw",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "text.main",
                flexWrap: "wrap",
                columnGap: 2,
                width: "75vw",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "card.main",
                  borderRadius: "5px",
                  padding: 2,
                  width: "75vw",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <h3>{t("Details")}</h3>
                  <Box sx={{ border: 1, borderRadius: 3, p: 2 }}>
                    {columns.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 3,
                          gap: 3,
                        }}
                      >
                        <Typography variant="h5">{item.head}:</Typography>
                        <Typography variant="body1">
                          {typeof item?.value === "object"
                            ? JSON.stringify(item?.value)
                            : item?.value ?? "null"}
                        </Typography>
                      </Box>
                    ))}
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: data.about_us,
                      }}
                    ></Typography>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: data.description,
                      }}
                    ></Typography>
                  </Box>
                  <h3>{t("Translations")}</h3>
                  <Box>
                    {data?.translations ? (
                      translations.map((translation, index) => (
                        <Box
                          key={index}
                          sx={{
                            border: "1px solid #ddd",
                            borderRadius: 3,
                            p: 2,
                            mt: 2,
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              mt: 3,
                            }}
                          >
                            {t("language")}:
                          </Typography>
                          <Typography variant="body1">
                            {translation.locale}
                          </Typography>

                          <Typography
                            variant="h5"
                            sx={{
                              mt: 3,
                            }}
                          >
                            {t("Vacancy Name")}:
                          </Typography>
                          <Typography variant="body1">
                            {translation.name}
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              mt: 3,
                            }}
                          >
                            {t("Location")}:
                          </Typography>
                          <Typography variant="body1">
                            {translation.location}
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              mt: 3,
                            }}
                          >
                            {t("Country")}:
                          </Typography>
                          <Typography variant="body1">
                            {translation.country}
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              mt: 3,
                            }}
                          >
                            {t("Description")}:
                          </Typography>
                          <Typography
                            dangerouslySetInnerHTML={{
                              __html: translation.description,
                            }}
                          ></Typography>
                          <Typography
                            variant="h5"
                            sx={{
                              mt: 3,
                            }}
                          >
                            {t("About Us")}:
                          </Typography>
                          <Typography
                            dangerouslySetInnerHTML={{
                              __html: translation.about_us,
                            }}
                          ></Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body1">
                        <CloseTwoTone />
                        <span> No Translation Provided</span>{" "}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
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

export default CareersView;
