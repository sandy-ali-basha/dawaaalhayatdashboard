import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import ButtonAction from "components/shared/ButtonAction";
import { _axios } from "interceptor/http-config";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { settingsStore } from "store/settingsStore";

const BlogsView = () => {
  const { t } = useTranslation("index");

  const params = useParams();
  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [
    state.direction,
    state.setDirection,
  ]);
  const [data1, setData1] = useState();
  const handleClick = (index) => setData1(index);

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const { data } = useQuery(
    ["blog", `id-${params.id}`],
    async () => {
      return await _axios
        .get(`/admin/blog/${params.id}`)
        .then((res) => res.data?.blogs);
    },
    {}
  );
  const columns = [
    { head: t("Title Arabic"), value: data?.translations[0].title },
    { head: t("Title English"), value: data?.translations[1].title },
    {
      head: t("Content Arabic"),
      value: data?.translations[0].content,
    },
    {
      head: t("Content English"),
      value: data?.translations[1].content,
    },
  ];

  return (
    <>
      {!!data && (
        <div>
          <Box
            key={params.id}
            sx={{
              display: "flex",
              color: "lightGray.main",

              columnGap: 10,
              marginTop: "4%",
            }}
          >
            <Box
              hover
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                color: "text.main",
                height: "100%",
                columnGap: 4,
              }}
            >
              <Box
                sx={{
                  width: "40vw",
                  backgroundColor: "card.paper",
                  boxShadow:
                    "rgb(145 158 171 / 10%) 0px 0px 2px 0px, rgb(145 158 171 / 22%) 0px -1px 24px 4px",
                  borderRadius: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 2.1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      pt: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        borderRadius: "10px",
                      }}
                      variant="p"
                    ></Typography>
                  </Box>
                  <Box
                    sx={{
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "5vh",
                      }}
                    >
                      <Typography
                        sx={{
                          backgroundColor: "rgba(255, 76, 81, 0.12)",
                          borderRadius: "20px",
                          width: "20%",
                          height: "4vh",
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        variant="p"
                      >
                        {data?.translations[1].title}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ pl: "10px" }}>
                    {t("Details")}:
                  </Typography>
                  <Box
                    sx={{
                      borde: "1px solid black",
                      backgroundColor: "black",
                      width: "50%",
                      height: "2px",
                      ml: "10px",
                    }}
                  ></Box>

                  {columns?.map((item, index, id) => (
                    <Box
                      key={id}
                      sx={{
                        display: "flex",
                        columnGap: 3,
                        pl: "10px",
                        margin: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 1,
                        }}
                      >
                        <Typography
                          variant="p"
                          sx={{
                            color: "darkgray",
                            fontWeight: "700",
                            fontSize: "15px",
                          }}
                        >
                          {item.head}
                        </Typography>
                        <Typography variant="p">
                          {typeof item?.value === "object"
                            ? JSON.stringify(item?.value)
                            : item?.value ?? "null"}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          pb: "10px",
                          rowGap: 1,
                        }}
                      ></Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 2.4,
                  }}
                >
                  <Typography>{t("Gallery")}</Typography>
                  <img
                    src={
                      !data1 ? data.gallery[0]?.url : data.gallery[data1].url
                    }
                    height="300"
                    width="500"
                    alt=""
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "20px",
                      overflowX: "auto",
                      width: "500px",
                    }}
                  >
                    {data?.gallery?.map((item, index) => (
                      <div
                        style={{
                          paddingLeft: "20px",
                        }}
                        key={index}
                      >
                        <img
                          src={item.url}
                          onClick={() => handleClick(index)}
                          height="70"
                          width="100"
                          alt="Gallery"
                        />
                      </div>
                    ))}
                  </div>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 2.4,
                  }}
                >
                  <Typography>{t("Cover Image")}</Typography>
                  <img
                    src={data?.cover ?? "null"}
                    height="300"
                    width="500"
                    alt=""
                  />
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

export default BlogsView;
