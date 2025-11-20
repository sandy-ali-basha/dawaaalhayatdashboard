// VariantsRepeater.jsx
import React, { useCallback, useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { BookmarkOutlined } from "@mui/icons-material";
import VariantCard from "./VariantCard";
import { useProductCreate } from "modules/product/hooks/useProductCreate";

const VariantsRepeater = ({
  selectedCities,
  productData,
  setSubmitFunction, // 👈 new prop
}) => {
  const {
    flavors,
    packings,
    addNewFlavor,
    addNewPacking,
    regions,
    hanldeCreate,
    loading,
  } = useProductCreate();

  const [variants, setVariants] = useState([
    {
      sku: "",
      tax_class_id: 1,
      inventory: 12,
      qty: 12,
      purchasable: "always",
      unit: 1,
      option_value_ids: ["", ""],
      cityData: {},
    },
  ]);
  console.log("variants outside", variants);

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        sku: "",
        tax_class_id: 1,
        inventory: 12,
        qty: 12,
        purchasable: "always",
        unit: 1,
        option_value_ids: ["", ""],
        cityData: {},
      },
    ]);
  };

  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // ✅ Build full options payload
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
        options.push({
        sku: sku || "",
          option_value_ids: option_value_ids.map(Number),
          city_id: Number(cityId),

          // 🔥 NEW FIELDS (from cityValues)
          price: Number(cityValues.price) || 0,
          compare_price: Number(cityValues.compare_price) || 0,
          compare_price_start_date: cityValues.compare_price_start_date || "",
          compare_price_end_date: cityValues.compare_price_end_date || "",
          inventory: Number(cityValues.inventory) || 0,
          qty: Number(cityValues.qty) || 0,
          unit: Number(cityValues.unit) || 0,
          reorder_point: Number(cityValues.reorder_point) || 0,

          // 🔥 Removed "points" moved to product
          // points: Number(cityValues.points) || 0, ← remove this

          // variant-level fields
          tax_class_id: Number(tax_class_id) || 1,
          purchasable,
        });
      });
    });

    return options;
  }, [variants]);

  const handleSaveVariants = useCallback(() => {
    const options = buildOptionsPayload();
    const payload = {
      ...productData, // from Step 1
      options, // from Step 2
    };

    hanldeCreate(payload);
  }, [productData, buildOptionsPayload, hanldeCreate]);

  // 👇 expose the save function to parent
  useEffect(() => {
    if (setSubmitFunction) {
      setSubmitFunction(() => handleSaveVariants);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //! do not add dependacies

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="text.main" sx={{ mb: 2 }}>
          <BookmarkOutlined color="error" /> Flavors & Packing
        </Typography>

        {variants.map((variant, index) => (
          <VariantCard
            key={index}
            index={index}
            variant={variant}
            variants={variants}
            setVariants={setVariants}
            onRemove={() => handleRemoveVariant(index)}
            onAddVariant={handleAddVariant}
            flavors={flavors}
            packings={packings}
            addNewFlavor={addNewFlavor}
            addNewPacking={addNewPacking}
            selectedCities={selectedCities}
            regions={regions}
          />
        ))}
      </Box>
      {loading && <LinearProgress size={20} sx={{ color: "text.secondary" }} />}
    </>
  );
};

export default VariantsRepeater;
