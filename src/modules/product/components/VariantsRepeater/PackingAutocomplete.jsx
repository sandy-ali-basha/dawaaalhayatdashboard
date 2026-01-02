import React, { useEffect, useState } from "react";
import {
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Alert,
  Switch,
  FormControlLabel
} from "@mui/material";
import { _Product } from "api/product/product";

const PackingAutocomplete = ({ value, onChange }) => {
  const [packings, setPackings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const [isEnabled, setIsEnabled] = useState(false); // <-- السويتش

  // Load packings
  const loadPackings = async () => {
    setLoading(true);
    try {
      const res = await _Product.packings();
      if (res.code === 200) {
        setPackings(res.data?.product_options_values || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackings();
  }, []);

  // Switch logic
  useEffect(() => {
    if (!isEnabled) {
      const defaultPacking = packings.find((p) => p.id === 1);
      if (defaultPacking) onChange(defaultPacking);
    }
  }, [isEnabled, packings]);

  // Add new packing
  const addNewPacking = async (packingName) => {
    if (!packingName.trim()) return;

    if (
      packings.some((p) => p.name.toLowerCase() === packingName.toLowerCase())
    ) {
      setError(`"${packingName}" already exists`);
      return;
    }

    setAdding(true);
    setError("");

    try {
      const res = await _Product.AddPacking({
        name: packingName,
        ar: { name: packingName },
        kr: { name: packingName },
        en: { name: packingName },
      });

      if (res.code !== 200 || !res.data?.id) {
        setError("Failed to add packing. Please try again.");
        return;
      }

      const newId = res.data.id;

      const reload = await _Product.packings();
      if (reload.code === 200) {
        const updated = reload.data?.product_options_values || [];
        setPackings(updated);

        const newPacking = updated.find((p) => p.id === newId);
        if (newPacking) onChange(newPacking);
      }
    } catch {
      setError("Network error while adding packing.");
    } finally {
      setAdding(false);
    }
  };

  // hide option with ID = 1 when switch is ON
  const filteredPackings = isEnabled
    ? packings.filter((p) => p.id !== 1)
    : [];

  return (
    <Box sx={{ width: "100%" }}>
      <Typography color="text.primary" variant="body1" sx={{ mb: 1 }}>
        Packing
      </Typography>

      {/* Switch */}
      <FormControlLabel
        control={
          <Switch
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
          />
        }
        label={isEnabled ? "ON (choose packing)" : "OFF (default packing)"}
      />

      {/* When OFF → hide autocomplete */}
      {isEnabled && (
        <Autocomplete
          freeSolo
          fullWidth
          loading={loading || adding}
          options={filteredPackings}
          value={value || null}
          getOptionLabel={(o) => (typeof o === "string" ? o : o?.name || "")}
          isOptionEqualToValue={(a, b) => a?.id === b?.id}
          filterOptions={(options, { inputValue }) => {
            const filtered = options.filter((opt) =>
              opt.name.toLowerCase().includes(inputValue.toLowerCase())
            );

            if (
              inputValue &&
              !options.some(
                (opt) =>
                  opt.name.toLowerCase() === inputValue.toLowerCase()
              )
            ) {
              filtered.push({ id: null, name: `Add: ${inputValue}` });
            }

            return filtered;
          }}
          onChange={(_, newValue) => {
            if (!newValue) return;

            if (typeof newValue === "string") {
              addNewPacking(newValue);
              return;
            }

            if (newValue?.name?.startsWith("Add: ")) {
              addNewPacking(newValue.name.replace("Add: ", "").trim());
              return;
            }

            onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select or add packing"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {(loading || adding) && (
                      <CircularProgress size={18} sx={{ mr: 1 }} />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 1, fontSize: 14 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default PackingAutocomplete;
