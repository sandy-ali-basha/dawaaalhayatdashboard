import {
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  Paper,
  Tooltip,
} from "@mui/material";
import ButtonAction from "components/shared/ButtonAction";
import Loader from "components/shared/Loader";
import { _axios } from "interceptor/http-config";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import {
  AddAPhoto,
  ArrowBack,
  ArrowForward,
  Delete,
  ModeOutlined,
  ModeTwoTone,
} from "@mui/icons-material";
import { useState } from "react";
import { BoxStyled } from "components/styled/BoxStyled";
import { colorStore } from "store/ColorsStore";

import VariantsSection from "./VariantSection";
import ProductUpdate from "../ProductUpdate";
import DeleteImage from "modules/product/components/images/DeleteImage";
import EditImage from "modules/product/components/images/EditImage";

const ProductView = () => {
  const { t } = useTranslation("index");
  const [direction] = settingsStore((state) => [state.direction]);
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [ImageStatus, setImageStatus] = useState(false);
  const [link, setLink] = useState(null);
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

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
    { head: t("points"), value: data?.points },
    {
      head: t("purchasable"),
      value: data?.purchasable === "always" ? "yes" : "no",
    },
    { head: t("length"), value: data?.length },
    { head: t("weight"), value: data?.weight },
    { head: t("density"), value: data?.density },
    { head: t("width"), value: data?.width },
    { head: t("division"), value: data?.division },
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
  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );
  const handleDeleteImage = (e) => {
    setLink(e);
    setOpenDelete(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <ProductUpdate id={editedID} />}

      {!!data && (
        <Box sx={{ p: 3 }}>
          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              backgroundColor: "card.main",
              borderRadius: 2,
              color: "text.main",
              textAlign: "center",
              py: 2,
              textTransform: "uppercase",
              boxShadow: 2,
              mb: 4,
            }}
          >
            {data?.name}
          </Typography>

          {/* Product Details */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              {t("Details")}
              <IconButton
                onClick={() => {
                  handleEdit(params?.id);
                }}
              >
                <ModeOutlined sx={{ color: "text.main" }} />
              </IconButton>
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              {columns.map((item, index) => (
                <Grid item xs={12} sm={6} key={index} sx={{ display: "flex" }}>
                  <Typography sx={{ fontWeight: 600 }}>{item.head}: </Typography>
                  <Typography
                    sx={{ color: "text.secondary", wordBreak: "break-word" }}
                  >
                    {typeof item?.value === "object"
                      ? JSON.stringify(item?.value)
                      : item?.value ?? "—"}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {/* Descriptions */}
            <Box mt={4}>
              {disc.map((item, index) => (
                <Box key={index} mt={3}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "primary.main",
                    }}
                  >
                    {item.head}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary" }}
                    dangerouslySetInnerHTML={{ __html: item?.value }}
                  />
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Box>
          </Paper>
          <VariantsSection t={t} options={data?.variants} />

          {/* Image Sections */}
          <BoxStyled sx={{ my: 4, p: 4, boxShadow: 2, borderRadius: 3 }}>
            <Typography
              variant="h6"
              color="text.main"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              {t("Product Images")}
              <Tooltip title={t("Add Image")}>
                <IconButton
                  onClick={() =>
                    handleUpdateImage(
                      `/products/${data?.id}/images/gallery`,
                      "add"
                    )
                  }
                >
                  <AddAPhoto sx={{ color: "primary.main" }} />
                </IconButton>
              </Tooltip>
            </Typography>

            <Grid container spacing={2}>
              {data?.images?.map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Box
                    sx={{
                      position: "relative",
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      overflow: "hidden",
                      "&:hover": { boxShadow: 4 },
                    }}
                  >
                    <Box sx={{ position: "absolute", top: 10, left: 10 }}>
                      <Tooltip title={t("Edit")}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleUpdateImage(
                              `/products/${data?.id}/images/${item?.id}/gallery`,
                              "update"
                            )
                          }
                        >
                          <ModeTwoTone color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t("Delete")}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleDeleteImage(
                              `/products/${data?.id}/images/${item?.id}/gallery`
                            )
                          }
                        >
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <img
                      src={item?.image_path}
                      alt=""
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain",
                        background: "#fafafa",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </BoxStyled>

          {/* Product Slider */}
          <BoxStyled sx={{ my: 4, p: 4, boxShadow: 2, borderRadius: 3 }}>
            <Typography
              variant="h6"
              color="text.main"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              {t("Product Slider")}
              <Tooltip title={t("Add Slider Image")}>
                <IconButton
                  onClick={() =>
                    handleUpdateImage(
                      `/products/${data?.id}/images/slider`,
                      "add"
                    )
                  }
                >
                  <AddAPhoto sx={{ color: "primary.main" }} />
                </IconButton>
              </Tooltip>
            </Typography>
            <Grid container spacing={2}>
              {slider?.map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Box
                    sx={{
                      position: "relative",
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      overflow: "hidden",
                      "&:hover": { boxShadow: 4 },
                    }}
                  >
                    <Box sx={{ position: "absolute", top: 10, left: 10 }}>
                      <Tooltip title={t("Edit")}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleUpdateImage(
                              `/products/${data?.id}/images/${item?.id}/gallery`,
                              "update"
                            )
                          }
                        >
                          <ModeTwoTone color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t("Delete")}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleDeleteImage(
                              `/products/${data?.id}/images/${item?.id}/gallery`
                            )
                          }
                        >
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <img
                      src={item?.image_path}
                      alt=""
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain",
                        background: "#fafafa",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </BoxStyled>

          {/* Product Features */}
          <BoxStyled sx={{ my: 4, p: 4, boxShadow: 2, borderRadius: 3 }}>
            <Typography
              variant="h6"
              color="text.main"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              {t("Product Features")}
              <Tooltip title={t("Add Feature Image")}>
                <IconButton
                  onClick={() =>
                    handleUpdateImage(
                      `/products/${data?.id}/images/products_features`,
                      "add"
                    )
                  }
                >
                  <AddAPhoto sx={{ color: "primary.main" }} />
                </IconButton>
              </Tooltip>
            </Typography>
            <Grid container spacing={2}>
              {features?.map((item, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <Box
                    sx={{
                      position: "relative",
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      overflow: "hidden",
                      "&:hover": { boxShadow: 4 },
                    }}
                  >
                    <Box sx={{ position: "absolute", top: 10, left: 10 }}>
                      <Tooltip title={t("Edit")}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleUpdateImage(
                              `/products/${data?.id}/images/${item?.id}/products_features`,
                              "update"
                            )
                          }
                        >
                          <ModeTwoTone color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t("Delete")}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleDeleteImage(
                              `/products/${data?.id}/images/${item?.id}/products_features`
                            )
                          }
                        >
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <img
                      src={item?.image_path}
                      alt=""
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain",
                        background: "#fafafa",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </BoxStyled>

          {/* Back Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: direction === "ltr" ? "flex-end" : "flex-start",
              mt: 3,
            }}
          >
            <ButtonAction
              name={t("Back")}
              onClick={handleBack}
              endIcon={direction === "ltr" ? <ArrowForward /> : <ArrowBack />}
            />
          </Box>
        </Box>
      )}

      {/* Modals */}
      <EditImage
        open={open}
        setOpen={setOpen}
        link={link}
        status={ImageStatus}
      />
      <DeleteImage open={openDelete} setOpen={setOpenDelete} link={link} />
    </>
  );
};

export default ProductView;
