import { React, useRef } from "react";
import { TextField } from "@mui/material";
import { Box, Grid } from "@mui/material";
import FlavorAutocomplete from "../VariantsRepeater/FlavorAutocomplete";
import PackingAutocomplete from "../VariantsRepeater/PackingAutocomplete";

const VariantCard = ({
  dirtyIds,
  setDirtyIds,
  variant,
  onChange,
  flavors,
  packings,
  loading,
  packingsIsLoading,
  flavorsIsLoading,
}) => {
  const ignoredFirstOptionChange = useRef(new Set());

  const isDirty = dirtyIds?.has(variant.id);
  const handleOptionChange = (type, value) => {
    const flavorId = variant.option_value_ids?.[0] || null;
    const packingId = variant.option_value_ids?.[1] || null;

    const option_value_ids =
      type === "flavor"
        ? [value?.id || null, packingId]
        : [flavorId, value?.id || null];

    // 🛑 أول تغيير؟ تجاهل dirty
    if (!ignoredFirstOptionChange.current.has(variant.id)) {
      ignoredFirstOptionChange.current.add(variant.id);
      onChange(variant.id, "option_value_ids", option_value_ids, {
        silent: true,
      });
      return;
    }

    // ✅ من ثاني مرة → تعديل حقيقي
    onChange(variant.id, "option_value_ids", option_value_ids);
  };

  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "background.paper",
        border: "2px solid",
        borderColor: isDirty ? "primary.main" : "divider",
      }}
    >
      <Grid container spacing={1} sx={{ mb: 1 }}>
        <Grid item md={2}>
          <TextField
            label="sku"
            type="text"
            defaultValue={variant.sku}
            onChange={(e) => onChange(variant.id, "sku", e.target.value)}
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            label="Price"
            type="number"
            defaultValue={variant.price}
            onChange={(e) => onChange(variant.id, "price", e.target.value)}
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            label="compare price (Discount)"
            type="number"
            defaultValue={variant.compare_price}
            onChange={(e) =>
              onChange(variant.id, "compare_price", e.target.value)
            }
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            label="Discount Start"
            type="date"
            defaultValue={variant.compare_price_start_date}
            onChange={(e) =>
              onChange(variant.id, "compare_price_start_date", e.target.value)
            }
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            label="Discount End"
            type="date"
            defaultValue={variant.compare_price_end_date}
            onChange={(e) =>
              onChange(variant.id, "compare_price_end_date", e.target.value)
            }
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            label="Inventory"
            type="number"
            defaultValue={variant.inventory}
            onChange={(e) => onChange(variant.id, "inventory", e.target.value)}
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            label="Storage Qty"
            type="number"
            defaultValue={variant.storage_qty}
            onChange={(e) =>
              onChange(variant.id, "storage_qty", e.target.value)
            }
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            label="Reorder Point"
            type="number"
            defaultValue={variant.reorder_point}
            onChange={(e) =>
              onChange(variant.id, "reorder_point", e.target.value)
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <PackingAutocomplete
            value={
              packings?.data?.product_options_values?.find(
                (p) => p.id === variant.option_value_ids?.[1]
              ) || null
            }
            onChange={(v) => handleOptionChange("packing", v)}
            packings={packings}
            loading={loading}
            packingsIsLoading={packingsIsLoading}
            flavorsIsLoading={flavorsIsLoading}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FlavorAutocomplete
            value={
              flavors?.data?.product_options_values?.find(
                (f) => f.id === variant.option_value_ids?.[0]
              ) || null
            }
            onChange={(v) => handleOptionChange("flavor", v)}
            flavors={flavors}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default VariantCard;
