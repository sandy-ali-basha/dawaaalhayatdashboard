import { Box, Grid, IconButton, Typography } from "@mui/material";
import ButtonAction from "components/shared/ButtonAction";
import Loader from "components/shared/Loader";
import { _axios } from "interceptor/http-config";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import {
  AddAPhoto,
  ArrowBack,
  ArrowForward,
  Delete,
  ModeTwoTone,
} from "@mui/icons-material";
import EditImage from "../components/images/EditImage";
import { useState } from "react";
import DeleteImage from "../components/images/DeleteImage";
import { BoxStyled } from "components/styled/BoxStyled";

const ProductView = () => {
  const { t } = useTranslation("index");
  const [direction] = settingsStore((state) => [state.direction]);
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [ImageStatus, setImageStatus] = useState(false);

  const [link, setLink] = useState(null);
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
  const { data: slider } = useQuery(
    ["product-slider", "id-" + params.id],
    async () => {
      return await _axios
        .get(`/products/${params.id}/images/slider`, {
          headers: {
            translations: "true",
          },
        })
        .then((res) => res.data?.data);
    },
    {}
  );
  const { data: features } = useQuery(
    ["product-features", "id-" + params.id],
    async () => {
      return await _axios
        .get(`/products/${params.id}/images/products_features`, {
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
    {
      head: t("purchasable"),
      value: data?.purchasable === "always" ? "yes" : "no",
    },

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

  const handleUpdateImage = (updateLink, status) => {
    setLink(updateLink);
    setImageStatus(status);
    setOpen(true);
  };
  const handleDeleteImage = (e) => {
    setLink(e);
    setOpenDelete(true);
  };

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
                <Grid item md={8}>
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
      <EditImage
        open={open}
        setOpen={setOpen}
        link={link}
        status={ImageStatus}
      />{" "}
      <DeleteImage open={openDelete} setOpen={setOpenDelete} link={link} />
      <BoxStyled sx={{ my: 2, p: 4 }}>
        <Typography variant="body1" color="initial">
          product images{" "}
          <IconButton
            onClick={() =>
              handleUpdateImage(`/products/${data?.id}/images/gallery`, "add")
            }
          >
            <AddAPhoto sx={{ color: "text.primary" }} />
          </IconButton>
        </Typography>
        <Grid container md={12}>
          {data?.images?.map((item, idx) => (
            <Grid
              item
              md="4"
              sx={{
                position: "relative",
                border: "1px solid #ddd",
                my: 1,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  width: "25%",
                }}
              >
                <IconButton
                  onClick={() =>
                    handleUpdateImage(
                      `/products/${data?.id}/images/${item?.id}/gallery`,
                      "update"
                    )
                  }
                >
                  <ModeTwoTone sx={{ color: "text.primary" }} />
                </IconButton>
                <IconButton
                  onClick={() =>
                    handleDeleteImage(
                      `/products/${data?.id}/images/${item?.id}/gallery`
                    )
                  }
                >
                  <Delete sx={{ color: "text.primary" }} />
                </IconButton>
              </Box>
              <img
                style={{
                  width: "100%",
                  minHeight:"20vh",
                  objectFit: "contain",
                }}
                key={idx}
                src={item?.image_path}
                alt=""
              />
            </Grid>
          ))}
        </Grid>
      </BoxStyled>
      <BoxStyled sx={{ my: 2, p: 4 }}>
        <Typography variant="body1" color="initial">
          product slider{" "}
          <IconButton
            onClick={() =>
              handleUpdateImage(`/products/${data?.id}/images/slider`, "add")
            }
          >
            <AddAPhoto sx={{ color: "text.primary" }} />
          </IconButton>
        </Typography>
        <Grid container sx={{ display: "flex" }}>
          {slider?.map((item, idx) => (
            <Grid
              item
              xs="4"
              sx={{
                position: "relative",
                border: "1px solid #ddd",
                my: 1,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  width: "25%",
                }}
              >
                <IconButton
                  onClick={() =>
                    handleUpdateImage(
                      `/products/${data?.id}/images/${item?.id}/gallery`,
                      "update"
                    )
                  }
                >
                  <ModeTwoTone sx={{ color: "text.primary" }} />
                </IconButton>
                <IconButton
                  onClick={() =>
                    handleDeleteImage(
                      `/products/${data?.id}/images/${item?.id}/gallery`
                    )
                  }
                >
                  <Delete sx={{ color: "text.primary" }} />
                </IconButton>
              </Box>
              <img
                style={{
                  width: "100%",
                  minHeight:"20vh",
                  objectFit: "contain",
                }}
                key={idx}
                src={item?.image_path}
                alt=""
              />
            </Grid>
          ))}
        </Grid>
      </BoxStyled>
      <BoxStyled sx={{ my: 2, p: 4 }}>
        <Typography variant="body1" color="initial">
          product features{" "}
          <IconButton
            onClick={() =>
              handleUpdateImage(`/products/${data?.id}/images/products_features`, "add")
            }
          >
            <AddAPhoto sx={{ color: "text.primary" }} />
          </IconButton>
        </Typography>
        <Grid container sx={{ display: "flex" }}>
          {features?.map((item, idx) => (
            <Grid
              item
              xs="3"
              sx={{
                position: "relative",
                border: "1px solid #ddd",
                my: 1,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  width: "25%",
                }}
              >
                <IconButton
                  onClick={() =>
                    handleUpdateImage(
                      `/products/${data?.id}/images/${item?.id}/products_features`,
                      "update"
                    )
                  }
                >
                  <ModeTwoTone sx={{ color: "text.primary" }} />
                </IconButton>
                <IconButton
                  onClick={() =>
                    handleDeleteImage(
                      `/products/${data?.id}/images/${item?.id}/products_features`
                    )
                  }
                >
                  <Delete sx={{ color: "text.primary" }} />
                </IconButton>
              </Box>
              <img
                style={{
                  width: "100%",
                  minHeight:"20vh",
                  objectFit: "contain",
                }}
                key={idx}
                src={item?.image_path}
                alt=""
              />
            </Grid>
          ))}
        </Grid>
      </BoxStyled>
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
