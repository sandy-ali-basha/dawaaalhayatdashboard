import { Box, Grid, Typography } from "@mui/material";
import ButtonAction from "components/shared/ButtonAction";
import Loader from "components/shared/Loader";
import { _axios } from "interceptor/http-config";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
const ProductView = () => {
  const { t } = useTranslation("index");
  const [direction] = settingsStore((state) => [state.direction]);
  const params = useParams();
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const { data, isLoading } = useQuery(
    ["product", "id-" + params.id],
    async () => {
      return await _axios
        .get("/product/" + params.id, {
          headers: {
            translations: "true",
          },
        })
        .then((res) => res.data?.data);
    },
    {}
  );
  const columns = [
    {
      head: t("name english"),
      value: data?.translations?.find((t) => t.locale === "en")?.name,
    },
    {
      head: t("name arabic"),
      value: data?.translations?.find((t) => t.locale === "ar")?.name,
    },
    {
      head: t("name kurdish"),
      value: data?.translations?.find((t) => t.locale === "kr")?.name,
    },
    { head: t("brand"), value: data?.brand?.name },
    { head: t("product type"), value: data?.product_type?.name },
    { head: t("status"), value: data?.status },
    { head: t("sku"), value: data?.sku },
    { head: t("price"), value: data?.price },
    // { head: t("price currency code"), value: data?.price?.currency?.code },
    // { head: t("price currency name"), value: data?.price },
    // {
    //   head: t("price currency exchange_rate"),
    //   value: data?.price?.currency?.exchange_rate,
    // },
    { head: t("quantity"), value: data?.quantity },
  ];
  const disc = [
    {
      head: t("description english"),
      value: data?.translations?.find((t) => t.locale === "en")?.description,
    },
    {
      head: t("description arabic"),
      value: data?.translations?.find((t) => t.locale === "ar")?.description,
    },
    {
      head: t("description kurdish"),
      value: data?.translations?.find((t) => t.locale === "kr")?.description,
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      {!!data && (
        <div>
          <Typography
            sx={{
              backgroundColor: "card.main",
              borderRadius: "5px",
              color: "text.main",
              width: "40%",
              marginInline: "auto",
              height: "100%",
              textTransform: "uppercase",
              padding: "10px 20px",
              textAlign: "center",
            }}
            variant="h5"
          >
            {data?.name}
          </Typography>
          <Box
            key={params.id}
            sx={{
              display: "flex",
              color: "text.main",
              columnGap: 10,
              marginTop: "2%",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "card.main",
                borderRadius: "5px",
                padding: "20px",
                width: "-webkit-fill-available",
              }}
            >
              <Grid container>
                <Grid item md={6}>
                  <Box>
                    <h3>{t("Details")}</h3>
                    {columns?.map((item, index, id) => (
                      <Box key={id}>
                        <Typography
                          variant="p"
                          sx={{
                            fontWeight: "700",
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
                </Grid>
                <Grid item md={6}>
                  {data?.images?.map((item, idx) => (
                    <img
                      style={{
                        margin: "5px",
                        width: "20vw",
                        border: "1px solid #ddd",
                        height: "30vh",
                        objectFit: "contain",
                      }}
                      key={idx}
                      sec={item}
                    />
                  ))}
                </Grid>
                <Grid item md={12}>
                  {disc?.map((item, index, id) => (
                    <Box key={id} mt={3}>
                      <Typography
                        variant="p"
                        sx={{
                          fontWeight: "700",
                          marginInlineEnd: "15px",
                        }}
                      >
                        {item.head}:
                      </Typography>
                      <Typography
                        variant="p"
                        dangerouslySetInnerHTML={{ __html: item?.value }}
                      ></Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
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

export default ProductView;
