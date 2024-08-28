import {
  Typography,
  Box,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import React, { useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { useTranslation } from "react-i18next";
import { Table } from "components/shared";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useProduct } from "hooks/product/useProduct";
import ProductUpdate from "./ProductUpdate";
import DeleteDialog from "../components/Dialog";
import AddImages from "./AddImages";
import ProductAttr from "./ProductAttr";
import AddImagesSlider from "./AddImagesSlider";
//* icons
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import LinkIcon from "@mui/icons-material/Link";
import { ListAltRounded } from "@mui/icons-material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ViewCarouselRoundedIcon from "@mui/icons-material/ViewCarouselRounded";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
const ProductIndex = () => {
  const { t } = useTranslation("index");
  const { data, page, setPage, isLoading, count } = useProduct();

  const navigate = useNavigate();
  const [direction] = settingsStore((state) => [state.direction]);
  const [id, setID] = useState();

  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const columns = useMemo(() => {
    return [
      t("name"),
      t("brand"),
      t("sku"),
      t("price"),
      t("Qty"),
      t("operations"),
    ];
  }, [t]);
  const handleCreate = () => navigate("create");

  const [open, setOpen] = useState(false);
  const [openAttr, setOpenAttr] = useState(false);
  const [openImagesSlider, setOpenImagesSlider] = useState(false);
  const [product_attr, setProduct_attr] = useState();

  const handleView = useCallback(
    (id) => {
      navigate("view/" + id);
    },
    [navigate]
  );
  const handleEdit = useCallback(
    (id) => {
      setEditedID(id);
    },
    [setEditedID]
  );
  const handleAddImages = useCallback(
    (id) => {
      setID(id);
      setOpen(true);
    },
    [setEditedID]
  );
  const handleImagesSlider = useCallback(
    (id) => {
      setID(id);
      setOpenImagesSlider(true);
    },
    [openImagesSlider]
  );

  const handleCat = useCallback(
    (id,attr) => {
      setID(id);
      setOpenAttr(true);
      setProduct_attr(attr)
    },
    [setEditedID]
  );

  const rows = useMemo(() => {
    return data?.data?.products?.map((product, id) => (
      <TableRow sx={{ height: "65px" }} key={product.id} hover>
        <TableCell sx={{ minWidth: 50 }}>{product?.name ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {product?.brand?.name ?? "Null"}
        </TableCell>
        <TableCell sx={{ minWidth: 50 }}>{product?.sku ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>{product?.price ?? "Null"}</TableCell>
        <TableCell sx={{ minWidth: 50 }}>
          {product?.quantity ?? "Null"}
        </TableCell>

        <TableCell
          align="center"
          sx={{
            minWidth: 200,
          }}
        >
          <IconButton onClick={() => handleEdit(product?.id)}>
            <Tooltip title={direction === "ltr" ? "Edit" : "تعديل"}>
              <ModeTwoToneIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title={direction === "ltr" ? "Delete" : "حذف"}>
              <DeleteDialog id={product?.id} count={count} page={page} />
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => handleView(product.id)}>
            <Tooltip title={direction === "ltr" ? "View" : "مشاهدة"}>
              <VisibilityTwoToneIcon color="primary" />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip
              title={"Add Images"}
              onClick={() => handleAddImages(product?.id)}
            >
              <AddPhotoAlternateIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip
              title={"Add Images to slider"}
              onClick={() => handleImagesSlider(product?.id)}
            >
              <ViewCarouselRoundedIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip
              title={"link to categories"}
              onClick={() => handleCat(product?.id,product?.attributes)}
            >
              <LinkIcon sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip
              title={"details"}
              onClick={() => navigate("details/" + product?.id)}
            >
              <ListAltRounded sx={{ color: "text.main" }} />
            </Tooltip>
          </IconButton>
        </TableCell>
      
      </TableRow>
    ));
  }, [data, count, direction, handleEdit, handleView, page, t]);

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <ProductUpdate id={editedID} />}
      {id && <AddImages id={id} open={open} setOpen={setOpen} />}
      {id && (
        <AddImagesSlider
          id={id}
          open={openImagesSlider}
          setOpen={setOpenImagesSlider}
        />
      )}
      
      {id && <ProductAttr id={id} open={openAttr} setOpen={setOpenAttr} attr={product_attr}/>}
      <Box
        sx={{
          width: { sl: "300px" },
          backgroundColor: { xs: "background.main" },
          ml: { xs: "0px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "25px",
          }}
        >
          <Typography sx={{ color: "text.main" }} variant="h5">
            {t("product")}
          </Typography>

          <Button
            startIcon={<AddRoundedIcon />}
            variant="contained"
            color="secondary"
            onClick={handleCreate}
          >
            {t("New product")}
          </Button>
        </Box>

        <BoxStyled sx={{ px: "10px" }}>
          <Table
            columns={columns}
            rows={rows}
            page={page}
            setPage={setPage}
            count={Math.ceil(data?.pagination?.total / count)}
          />
        </BoxStyled>
      </Box>
    </>
  );
};

export default ProductIndex;
