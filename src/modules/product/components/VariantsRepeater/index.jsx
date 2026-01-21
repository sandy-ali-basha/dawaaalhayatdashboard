// VariantsRepeater.jsx
import React, { useCallback, useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { BookmarkOutlined } from "@mui/icons-material";
import VariantCard from "./VariantCard";
import { useProductCreate } from "modules/product/hooks/useProductCreate";
import { useProductOptions } from "modules/product/hooks/useProductOptions";
import { ProductStore } from "store/productStore";

const createEmptyVariant = () => ({
  sku: "",
  tax_class_id: 1,
  inventory: 12,
  qty: 12,
  purchasable: "always",
  unit: 1,
  option_value_ids: ["", ""],
  cityData: {},
});

const VariantsRepeater = ({ selectedCities, setSubmitFunction }) => {
  const productData = ProductStore((s) => s.stepData.basicInfo);
  const storedVariants = ProductStore((s) => s.stepData.variants);
  const setVariantsStore = ProductStore((s) => s.setVariants);
  const { addNewFlavor, addNewPacking, cities, hanldeCreate, loading } =
    useProductCreate();

  const { flavorsIsLoading, packingsIsLoading, flavors, packings } =
    useProductOptions();

  const [variants, setVariants] = useState([createEmptyVariant()]);

  const handleAddVariant = () => {
    setVariants((prev) => [...prev, createEmptyVariant()]);
  };

  const handleRemoveVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (storedVariants?.length) {
      setVariants(storedVariants);
    }
  }, [storedVariants]);

  // Build full options payload
  const buildOptionsPayload = useCallback(() => {
    const options = [];
    variants.forEach((variant) => {
      const {
        sku,
        option_value_ids,
        tax_class_id = 1,
        purchasable = "always",
        cityData = {},
      } = variant;

      Object.entries(cityData).forEach(([cityId, cityValues]) => {
        console.log("cityValues", cityValues);
        options.push({
          option_value_ids: option_value_ids.map((v) => Number(v) || 0),
          city_id: Number(cityId),
          sku: sku,
          price: Number(cityValues.price) || 0,
          compare_price: Number(cityValues.compare_price) || 0,
          compare_price_start_date: cityValues.compare_price_start_date || "",
          compare_price_end_date: cityValues.compare_price_end_date || "",
          inventory: Number(cityValues.inventory) || 0,
          qty: Number(cityValues.qty) || 0,
          unit: Number(cityValues.unit) || 0,
          reorder_point: Number(cityValues.reorder_point) || 0,
          tax_class_id: Number(tax_class_id) || 1,
          purchasable,
        });
      });
    });
    return options;
  }, [variants]);

  const handleSaveVariants = useCallback(() => {
    setVariantsStore(variants); // 👈 مهم جدًا

    const options = buildOptionsPayload();
    const payload = {
      ...productData,
      options,
    };

    hanldeCreate(payload);
  }, [
    variants,
    productData,
    buildOptionsPayload,
    hanldeCreate,
    setVariantsStore,
  ]);

  // expose the save function to parent — register latest handler whenever it changes
  useEffect(() => {
    if (setSubmitFunction) {
      setSubmitFunction(() => handleSaveVariants);
    }
    // now include handleSaveVariants so parent always receives the latest one
  }, [handleSaveVariants, setSubmitFunction]);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="text.main" sx={{ mb: 2 }}>
          <BookmarkOutlined color="error" /> Flavors & Packing
        </Typography>

        {variants.map((variant, index) => (
          <VariantCard
            key={variant.id} // use stable unique key instead of index
            index={index}
            variant={variant}
            variants={variants}
            setVariants={setVariants}
            onRemove={() => handleRemoveVariant(index)}
            onAddVariant={handleAddVariant}
            flavors={flavors}
            packings={packings}
            flavorsIsLoading={flavorsIsLoading}
            packingsIsLoading={packingsIsLoading}
            addNewFlavor={addNewFlavor}
            addNewPacking={addNewPacking}
            selectedCities={selectedCities}
            cities={cities}
          />
        ))}
      </Box>
      {loading && <LinearProgress size={20} sx={{ color: "text.secondary" }} />}
    </>
  );
};

export default VariantsRepeater;
