import React, { useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { colorStore } from "store/ColorsStore";
import { useProduct } from "hooks/product/useProduct";

export const  useProductIndex = () => {
  const { t } = useTranslation("index");
  const { data, isLoading } = useProduct();
  const navigate = useNavigate();
  const [id, setID] = useState();
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  // States for sorting and filtering

  const [cityFilter, setCityFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  const columns = useMemo(() => {
    return [
      t(""),
      t("name"),
      t("brand"),
      t("sku"),
      t("price"),
      t("price before sale"),
      t("Qty"),
      t("city"),
      t("status"),
      t("option"),
    ];
  }, [t]);
  const handleCreate = () => navigate("create");

  const [OpenDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAttr, setOpenAttr] = useState(false);
  const [openImagesSlider, setOpenImagesSlider] = useState(false);
  const [product_attr, setProduct_attr] = useState();

  // Pagination state
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
  const handleAddImages = useCallback((id) => {
    setID(id);
    setOpen(true);
  }, []);
  const handleDelete = useCallback((id) => {
    setID(id);
    setOpenDelete(true);
  }, []);
  const handleImagesSlider = useCallback((id) => {
    setID(id);
    setOpenImagesSlider(true);
  }, []);

  const handleCat = useCallback((id, attr) => {
    setID(id);
    setOpenAttr(true);
    setProduct_attr(attr);
  }, []);

  // Sort and filter logic
  const filteredData = useMemo(() => {
    let filtered = data?.data?.products || [];

    if (cityFilter) {
      filtered = filtered.filter((product) =>
        product.cities?.state[0]?.name
          ?.toLowerCase()
          .includes(cityFilter.toLowerCase())
      );
    }

    if (brandFilter) {
      filtered = filtered.filter((product) =>
        product.brand?.name?.toLowerCase().includes(brandFilter.toLowerCase())
      );
    }

    return filtered;
  }, [data, cityFilter, brandFilter]);

 

  return {
    handleDelete,
    handleImagesSlider,
    handleCat,
    handleCreate,
    OpenDelete,
    open,
    openAttr,
    openImagesSlider,
    product_attr,
    handleView,
    handleEdit,
    handleAddImages,
    isLoading,
    id,
    editedID,
    setCityFilter,
    setBrandFilter,
    columns,
    navigate,
    setOpen,
    setOpenImagesSlider,
    setOpenDelete,
    setOpenAttr,
    cityFilter,
    brandFilter,
    filteredData,
    t,
  };
};
