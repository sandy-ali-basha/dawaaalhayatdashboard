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
      const res = await _axios.get(`/careers/${params.id}`);
      return res.data?.data;
    }
  );

  const columns = [
    { head: t("Name"), value: data?.vacancy_name },
    { head: t("Requisition No"), value: data?.requisition_no },
    { head: t("Time Type"), value: data?.time_type },
    { head: t("Location"), value: data?.location },
    { head: t("Country"), value: data?.country },
    { head: t("Description"), value: data?.description },
    { head: t("About Us"), value: data?.about_us },
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
      {!!data && (
        <div>
          <Typography
            sx={{
              backgroundColor: "card.main",
              borderRadius: "5px",
              color: "primary.main",
              width: "40%",
              marginInline: "auto",
              height: "100%",
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
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "text.main",
                height: "100%",
                flexWrap: "wrap",
                columnGap: 2,
              }}
            >
              <Box
                sx={{
                  width: "70%",
                  backgroundColor: "card.main",
                  borderRadius: "5px",
                  padding: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 2.1,
                  }}
                >
                  <h3>{t("Details")}</h3>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    {columns.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          pl: "10px",
                          width: "100%",
                          my: "5px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "700",
                            fontSize: "15px",
                            marginInlineEnd: "15px",
                          }}
                        >
                          {item.head}:
                        </Typography>
                        <Typography>
                          {typeof item?.value === "object"
                            ? JSON.stringify(item?.value)
                            : item?.value ?? "null"}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <h3>{t("Translations")}</h3>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    {data?.translations ? (
                      translations.map((translation, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            pl: "10px",
                            width: "50%",
                            my: "5px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "15px",
                              marginInlineEnd: "15px",
                            }}
                          >
                            {t("Locale")}:
                          </Typography>
                          <Typography>{translation.locale}</Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "15px",
                              marginInlineEnd: "15px",
                            }}
                          >
                            {t("Vacancy Name")}:
                          </Typography>
                          <Typography>{translation.vacancy_name}</Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "15px",
                              marginInlineEnd: "15px",
                            }}
                          >
                            {t("Location")}:
                          </Typography>
                          <Typography>{translation.location}</Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "15px",
                              marginInlineEnd: "15px",
                            }}
                          >
                            {t("Country")}:
                          </Typography>
                          <Typography>{translation.country}</Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "15px",
                              marginInlineEnd: "15px",
                            }}
                          >
                            {t("Description")}:
                          </Typography>
                          <Typography
                            dangerouslySetInnerHTML={translation.description}
                          ></Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "15px",
                              marginInlineEnd: "15px",
                            }}
                          >
                            {t("About Us")}:
                          </Typography>
                          <Typography
                            dangerouslySetInnerHTML={translation.about_us}
                          ></Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography>
                        <CloseTwoTone /><span> No Translation Provided</span>                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
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
