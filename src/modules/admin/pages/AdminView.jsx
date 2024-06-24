import { Box, Typography } from "@mui/material";
import ButtonAction from "components/shared/ButtonAction";
import Loader from "components/shared/Loader";
import { _axios } from "interceptor/http-config";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
const AdminView = () => {
  const { t } = useTranslation("index");
  const [direction] = settingsStore((state) => [state.direction]);

  const params = useParams();
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const { data, isLoading } = useQuery(
    ["admin", `id-${params.id}`],
    async () => {
      return await _axios
        .get(`/admin/admins/${params.id}`)
        .then((res) => res.data?.admin);
    },
    {}
  );
  const columns = [
    { head: t("Name"), value: data?.name },
    { head: t("Email"), value: data?.email },
  ];

  return (
    <>
      {isLoading && <Loader />}
      {!!data && (
        <div>
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
                          height: "100%",
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "30px",
                          marginTop: "50px",
                        }}
                        variant="p"
                      >
                        {data?.name ?? "null"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box></Box>
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
                      key={index}
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
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      )}

      <Box
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
      </Box>
    </>
  );
};

export default AdminView;
