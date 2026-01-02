import React, { useEffect, useState } from "react";
import {
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { _Product } from "api/product/product";
import { Add } from "@mui/icons-material";

const FlavorAutocomplete = ({ value, onChange }) => {
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [isEnabled, setIsEnabled] = useState(false); // ← السويتش

  // Load flavors
  const loadFlavors = async () => {
    setLoading(true);
    try {
      const response = await _Product.flavors();
      if (response.code === 200) {
        setFlavors(response.data?.product_options_values || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFlavors();
  }, []);

  // 🔥 Switch OFF → set default ID = 2
  useEffect(() => {
    if (!isEnabled) {
      const defaultFlavor = flavors.find((f) => f.id === 2);
      if (defaultFlavor) onChange(defaultFlavor);
    }
  }, [isEnabled, flavors]);

  // Add new flavor
  const addNewFlavor = async (flavorName) => {
    if (!flavorName.trim()) return;

    // Already exists?
    if (flavors.some((f) => f.name.toLowerCase() === flavorName.toLowerCase())) {
      setError(`"${flavorName}" already exists`);
      return;
    }

    setAdding(true);
    setError("");

    try {
      const res = await _Product.AddFlavor({
        name: flavorName,
        ar: { name: flavorName },
        kr: { name: flavorName },
        en: { name: flavorName },
      });

      if (res.code !== 200 || !res.data?.id) {
        setError("Failed to add flavor. Please try again.");
        return;
      }

      const newId = res.data.id;

      // Reload list
      const reload = await _Product.flavors();
      if (reload.code === 200) {
        const updatedList = reload.data?.product_options_values || [];
        setFlavors(updatedList);

        const newFlavor = updatedList.find((f) => f.id === newId);
        if (newFlavor) onChange(newFlavor);
      }
    } catch {
      setError("Network error while adding flavor.");
    } finally {
      setAdding(false);
    }
  };

  // 🔥 Hide ID=2 when switch = ON
  const filteredFlavors = isEnabled
    ? flavors.filter((f) => f.id !== 2)
    : [];

  return (
    <Box sx={{ width: "100%" }}>
      <Typography color="text.primary" variant="body1" sx={{ mb: 1 }}>
        Flavor
      </Typography>

      {/* Switch */}
      <FormControlLabel
        control={
          <Switch
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
          />
        }
        label={isEnabled ? "ON (choose flavor)" : "OFF (default flavor)"}
      />

      {/* Show autocomplete only when switch = ON */}
      {isEnabled && (
        <Autocomplete
          fullWidth
          freeSolo
          loading={loading || adding}
          options={filteredFlavors}
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
                (opt) => opt.name.toLowerCase() === inputValue.toLowerCase()
              )
            ) {
              filtered.push({ id: null, name: `Add: ${inputValue}` });
            }

            return filtered;
          }}
          onChange={(_, newValue) => {
            if (!newValue) return;

            if (typeof newValue === "string") {
              addNewFlavor(newValue);
              return;
            }

            if (newValue?.name?.startsWith("Add: ")) {
              addNewFlavor(newValue.name.replace("Add: ", "").trim());
              return;
            }

            onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select or add flavor"
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
          renderOption={(props, option) => (
            <li {...props}>
              {option?.name?.startsWith("Add: ") ? (
                <span style={{ color: "#1976d2", fontWeight: 500 }}>
                  <Add /> {option.name.replace("Add: ", "")}
                </span>
              ) : (
                option?.name
              )}
            </li>
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

export default FlavorAutocomplete;
