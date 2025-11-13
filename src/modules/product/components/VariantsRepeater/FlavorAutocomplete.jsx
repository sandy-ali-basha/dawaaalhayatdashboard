import React, { useEffect, useState } from "react";
import {
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import { _Product } from "api/product/product";
import { Add } from "@mui/icons-material";

const FlavorAutocomplete = ({ value, onChange }) => {
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch available flavors
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

  // ✅ Add new flavor
  const addNewFlavor = async (flavorName) => {
    if (!flavorName.trim()) return;

    if (
      flavors.some((f) => f.name.toLowerCase() === flavorName.toLowerCase())
    ) {
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

      if (res.code === 200) {
        // 1. Reload the list to ensure fresh data from backend
        // We capture the result of the reload to find the new flavor object.
        const response = await _Product.flavors();
        if (response.code === 200) {
          const updatedFlavors = response.data?.product_options_values || [];
          setFlavors(updatedFlavors);

          // 2. Find the newly created flavor in the updated list
          const newFlavorId = res.data?.id;
          const selectedFlavor = updatedFlavors.find(
            (f) => f.id === newFlavorId
          );

          // 3. Select the flavor only if it was successfully found
          if (selectedFlavor) {
            onChange(selectedFlavor);
          } else {
            // Optional: Handle case where new flavor isn't immediately found after reload
            console.warn(
              "New flavor created successfully but not found in the reloaded list."
            );
          }
        } else {
          // Handle reload failure
          setError("Flavor added, but failed to reload the list.");
        }
      } else {
        setError("Failed to add flavor. Please try again.");
      }
    } catch {
      setError("Network error while adding flavor.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography color="text.primary" variant="body1" sx={{ mb: 1 }}>
        Flavor
      </Typography>

      <Autocomplete
        fullWidth
        freeSolo
        loading={loading || adding}
        options={flavors}
        value={value || null}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option?.name || ""
        }
        isOptionEqualToValue={(option, val) =>
          option?.id === val?.id || option?.name === val?.name
        }
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
          } else if (newValue?.name?.startsWith("Add: ")) {
            const newFlavorName = newValue.name.replace("Add: ", "").trim();
            addNewFlavor(newFlavorName);
          } else {
            onChange(newValue);
          }
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
                    <CircularProgress
                      color="inherit"
                      size={18}
                      sx={{ mr: 1 }}
                    />
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

      {error && (
        <Alert severity="error" sx={{ mt: 1, fontSize: 14 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default FlavorAutocomplete;
