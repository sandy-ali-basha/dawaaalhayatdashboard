import React, { useEffect, useRef, useState, useMemo } from "react";
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
import { Add } from "@mui/icons-material";
import { _Product } from "api/product/product";
import { _Product_options } from "api/product_options/product_options";

const DEFAULT_FLAVOR_ID = 2;

const FlavorAutocomplete = ({
  flavors,
  value,
  onChange,
  flavorsIsLoading,
}) => {
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  // 🔒 ensure default is set only once
  const initializedRef = useRef(false);

  const options = useMemo(
    () => flavors?.data?.product_options_values || [],
    [flavors?.data]
  );

  // 🎯 normalize value reference (important for MUI)
  const normalizedValue = useMemo(() => {
    if (!value) return null;
    return options.find((o) => o.id === value.id) || null;
  }, [value, options]);

  // 🔥 set default flavor ONLY ONCE and ONLY when switch is OFF
  useEffect(() => {
    if (initializedRef.current) return;
    if (isEnabled) return;
    if (!options.length) return;
    if (normalizedValue) return;

    const defaultFlavor = options.find((f) => f.id === DEFAULT_FLAVOR_ID);
    if (defaultFlavor) {
      onChange(defaultFlavor);
      initializedRef.current = true;
    }
  }, [isEnabled, options, normalizedValue, onChange]);

  // ➕ add new flavor
  const addNewFlavor = async (name) => {
    if (!name.trim()) return;

    if (options.some((f) => f.name.toLowerCase() === name.toLowerCase())) {
      setError(`"${name}" already exists`);
      return;
    }

    setAdding(true);
    setError("");

    try {
      const res = await _Product_options.AddFlavor({
        name,
        ar: { name },
        kr: { name },
        en: { name },
      });

      if (res.code !== 200 || !res.data?.id) {
        setError("Failed to add flavor.");
        return;
      }

      const reload = await _Product_options.flavors();
      const updated = reload.data?.product_options_values || [];
      const newFlavor = updated.find((f) => f.id === res.data.id);
      if (newFlavor) onChange(newFlavor);
    } catch {
      setError("Network error while adding flavor.");
    } finally {
      setAdding(false);
    }
  };

  // 🧹 filtered options when enabled
  const filteredOptions = useMemo(() => {
    return isEnabled
      ? options.filter((f) => f.id !== DEFAULT_FLAVOR_ID)
      : [];
  }, [isEnabled, options]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1">Flavor</Typography>

        <FormControlLabel
          label={isEnabled ? "ON (choose flavor)" : "OFF (default flavor)"}
          control={
            <Switch
              checked={isEnabled}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsEnabled(checked);

                if (checked) {
                  // 🔥 clear default so first click works
                  onChange(null);
                }
              }}
            />
          }
        />
      </Box>

      {/* Autocomplete */}
      {isEnabled && (
        <Autocomplete
          fullWidth
          freeSolo
          value={normalizedValue}
          options={filteredOptions}
          loading={flavorsIsLoading || adding}
          isOptionEqualToValue={(a, b) => a?.id === b?.id}
          getOptionLabel={(o) =>
            typeof o === "string" ? o : o?.name || ""
          }
          filterOptions={(opts, { inputValue }) => {
            const filtered = opts.filter((o) =>
              o.name.toLowerCase().includes(inputValue.toLowerCase())
            );

            if (
              inputValue &&
              !opts.some(
                (o) => o.name.toLowerCase() === inputValue.toLowerCase()
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

            if (newValue.name?.startsWith("Add: ")) {
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
                    {(flavorsIsLoading || adding) && (
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
              {option.name?.startsWith("Add: ") ? (
                <span style={{ color: "#1976d2", fontWeight: 500 }}>
                  <Add fontSize="small" />{" "}
                  {option.name.replace("Add: ", "")}
                </span>
              ) : (
                option.name
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
