import { Button, Dialog, DialogTitle, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { _Product } from "api/product/product";
import { useState } from "react";
import CityVariantsBox from "./CityVariantsBox";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const VariantsByCityDialog = ({
  variants = [],
  flavors,
  packings,
  flavorsIsLoading,
  packingsIsLoading,
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(variants);
  const [dirtyIds, setDirtyIds] = useState(new Set());

  const [saving, setSaving] = useState(false);

  const groupByCity = (variants = []) =>
    variants.reduce((acc, variant) => {
      const city = variant.city || "Unknown";
      if (!acc[city]) acc[city] = [];
      acc[city].push(variant);
      return acc;
    }, {});
  const [optionChangeCount, setOptionChangeCount] = useState({});

  const variantsByCity = groupByCity(data);
  const handleVariantChange = (variantId, field, value) => {
    setData((prev) =>
      prev.map((v) => (v.id === variantId ? { ...v, [field]: value } : v))
    );

    // فقط للـ options
    if (field === "option_value_ids") {
      setOptionChangeCount((prev) => {
        const count = (prev[variantId] || 0) + 1;

        // أول تعديلين = تحميل / تهيئة → تجاهل
        if (count > 2) {
          setDirtyIds((ids) => {
            const next = new Set(ids);
            next.add(variantId);
            return next;
          });
        }

        return {
          ...prev,
          [variantId]: count,
        };
      });

      return;
    }

    // أي حقل ثاني → يتسجل مباشرة
    setDirtyIds((prev) => {
      const next = new Set(prev);
      next.add(variantId);
      return next;
    });
  };

  const saveAllVariants = async () => {
    if (dirtyIds.size === 0) return;
    setSaving(true);
    const updatedVariants = data.filter((v) => dirtyIds.has(v.id));

    for (let variant of updatedVariants) {
      try {
        await _Product.updateVariant({
          id: variant.id,
          formData: variant,
        });
        await delay(1000);
      } catch (err) {
        console.error("Failed to update variant", variant.id, err);
      }
    }
    setDirtyIds(new Set());
    setSaving(false);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ mb: 2, mx: 1 }}
        onClick={() => setOpen(true)}
      >
        Edit Variants By City
      </Button>

      <Dialog
        open={open}
        onClose={() => !saving && setOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Edit Variants grouped by City</DialogTitle>

        <Box sx={{ p: 3, position: "relative" }}>
          {Object.entries(variantsByCity).map(([city, cityVariants]) => (
            <CityVariantsBox
              key={city}
              city={city}
              variants={cityVariants}
              onChange={handleVariantChange}
              flavors={flavors}
              packings={packings}
              dirtyIds={dirtyIds}
              setDirtyIds={setDirtyIds}
              flavorsIsLoading={flavorsIsLoading}
              packingsIsLoading={packingsIsLoading}
            />
          ))}

          {/* Footer */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              onClick={saveAllVariants}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save All Variants"}
            </Button>
          </Box>

          {/* Loading overlay */}
          {saving && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default VariantsByCityDialog;
