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

const PackingAutocomplete = ({ value, onChange }) => {
  const [packings, setPackings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
console.log("value",value)
  // Fetch available packings
  useEffect(() => {
    setLoading(true);
    _Product
      .packings()
      .then((response) => {
        if (response.code === 200) {
          setPackings(response.data?.product_options_values || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Add new packing to backend
  const addNewPacking = async (packingName) => {
    if (!packingName.trim()) return;

    // check if already exists
    if (
      packings.some((p) => p.name.toLowerCase() === packingName.toLowerCase())
    ) {
      setError(`"${packingName}" already exists`);
      return;
    }

    setAdding(true);
    setError("");
    try {
      // send all localized names like in FlavorAutocomplete
      const res = await _Product.AddPacking({
        name: packingName,
        ar: { name: packingName },
        kr: { name: packingName },
        en: { name: packingName },
      });

      if (res.code === 200) {
        const newPacking = res.data?.packing || {
          id: Date.now(),
          name: packingName,
        };
        setPackings((prev) => [...prev, newPacking]);
        onChange(newPacking);
      } else {
        setError("Failed to add packing. Please try again.");
      }
    } catch {
      setError("Network error while adding packing.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography color="text.primary" variant="body1" sx={{ mb: 1 }}>
        Packing
      </Typography>

      <Autocomplete
        freeSolo
        fullWidth
        loading={loading || adding}
        options={packings}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option?.name || ""
        }
        value={value || null}
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
            filtered.push({ name: `Add: ${inputValue}` });
          }
          return filtered;
        }}
        onChange={(_, newValue) => {
          if (
            typeof newValue === "object" &&
            newValue?.name?.startsWith("Add: ")
          ) {
            const newPacking = newValue.name.replace("Add: ", "").trim();
            addNewPacking(newPacking);
          } else if (typeof newValue === "string") {
            addNewPacking(newValue);
          } else {
            onChange(newValue);
          }
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
                ➕ {option.name.replace("Add: ", "")}
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

export default PackingAutocomplete;
