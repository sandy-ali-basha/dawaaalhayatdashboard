import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ButtonAction from "components/shared/ButtonAction";
import Loader from "components/shared/Loader";
import { _axios } from "interceptor/http-config";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { ArrowBack, ArrowForward, EditRounded } from "@mui/icons-material";
import { colorStore } from "store/ColorsStore";
import DeleteDialog from "../components/Dialog";
import Brand_pagesUpdate from "./Brand_pagesUpdate";
import DeleteSlide from "../components/DeleteSlide";
import { BoxStyled } from "components/styled/BoxStyled";
const Brand_pagesView = () => {
  const { t } = useTranslation("index");
  const [direction] = settingsStore((state) => [state.direction]);
  const params = useParams();
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );
  const { data, isLoading } = useQuery(
    ["brand_pages", "id-" + params.id],
    async () => {
      return await _axios
        .get("/brand_pages/" + params.id)
        .then((res) => res.data?.data);
    },
    {}
  );

  const columns = [{ head: t("name"), value: data?.name }];

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <Brand_pagesUpdate id={params.id} />}

      {!!data && (
        <div>
          <Box display="flex">
            <Box
              sx={{
                backgroundColor: "card.main",
                borderRadius: "5px",
                color: "primary.main",

                marginInline: "auto",
                height: "100%",
                textTransform: "uppercase",
                padding: "10px 20px",
                textAlign: "center",
                mb: 2,
              }}
            >
              {" "}
              <IconButton onClick={() => handleEdit(data?.id)}>
                <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
                  <EditRounded sx={{ color: "text.main" }} />
                </Tooltip>
              </IconButton>
            </Box>
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
              {data.name}
            </Typography>
          </Box>

          <Box
            key={params.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              columnGap: 2,
              marginTop: 2,
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "90%",
                backgroundColor: "card.main",
                borderRadius: 2,
                padding: 5,
                color: "text.main",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: 2.1,
                  width: "100%",
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
                  {columns?.map((item, index, id) => (
                    <Box
                      key={id}
                      sx={{
                        display: "flex",
                        pl: "10px",
                        width: "50%",
                        my: "5px",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: "700",
                          fontSize: "15px",
                          marginInlineEnd: "15px",
                        }}
                      >
                        {item.head}:
                      </Typography>
                      <Typography variant="p">
                        {typeof item?.value === "object"
                          ? JSON.stringify(item?.value)
                          : item?.value ?? "null"}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    pl: "10px",
                    width: "50%",
                    my: "5px",
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{
                      fontWeight: "700",
                      fontSize: "15px",
                      marginInlineEnd: "15px",
                    }}
                  >
                    text:
                  </Typography>
                  <Typography
                    variant="p"
                    dangerouslySetInnerHTML={{
                      __html: data?.text,
                    }}
                  ></Typography>
                </Box>

                <h3>{t("Details")}</h3>
                <Box>
                  {data?.slides?.map((item, idx) => (
                    <Box
                      sx={{
                        position: "relative",
                        my: 2,
                        boxShadow: 2,
                        borderRadius: 3,
                        p: 1,
                      }}
                    >
                      <IconButton
                        sx={{ position: "absolute", top: 0, left: 0 }}
                      >
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
                      />
                      <Box display="flex">
                        <Typography
                          variant="body1"
                          sx={{ mx: 2, fontWeight: "bold" }}
                        >
                          {" "}
                          arabic title:
                        </Typography>{" "}
                        <Typography variant="body1">
                          {
                            item?.translations?.find((t) => t.locale === "ar")
                              ?.title
                          }
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ mx: 2, fontWeight: "bold" }}
                        >
                          english title:
                        </Typography>{" "}
                        <Typography variant="body1">
                          {
                            item?.translations?.find((t) => t.locale === "en")
                              ?.title
                          }
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ mx: 2, fontWeight: "bold" }}
                        >
                          kurdish title:
                        </Typography>{" "}
                        <Typography variant="body1">
                          {
                            item?.translations?.find((t) => t.locale === "kr")
                              ?.title
                          }
                        </Typography>
                      </Box>
                      <Box sx={{ mx: 2 }}>
                        <Typography variant="body1">
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            arabic Description:
                          </Typography>{" "}
                          {
                            item?.translations?.find((t) => t.locale === "ar")
                              ?.text
                          }
                        </Typography>
                        <Typography variant="body1">
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            english Description:
                          </Typography>{" "}
                          {
                            item?.translations?.find((t) => t.locale === "en")
                              ?.text
                          }
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            kurdish Description:
                          </Typography>{" "}
                          {
                            item?.translations?.find((t) => t.locale === "kr")
                              ?.text
                          }
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

export default Brand_pagesView;
