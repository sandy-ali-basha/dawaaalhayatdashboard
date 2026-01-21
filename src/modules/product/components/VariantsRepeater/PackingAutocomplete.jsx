import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { _Product_options } from "api/product_options/product_options";

const DEFAULT_PACKING_ID = 1;

const PackingAutocomplete = ({
  value,
  onChange,
  packings,
  packingsIsLoading,
}) => {
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  // 🔒 prevent default logic from running more than once
  const initializedRef = useRef(false);

  // ✅ normalize options
  const options = useMemo(
    () => packings?.data?.product_options_values || [],
    [packings?.data]
  );

  // ✅ normalize value reference (important for MUI)
  const normalizedValue = useMemo(() => {
    if (!value) return null;
    return options.find((o) => o.id === value.id) || null;
  }, [value, options]);

  // 🔥 set default packing ONCE when switch is OFF
  useEffect(() => {
    if (initializedRef.current) return;
    if (isEnabled) return;
    if (!options.length) return;
    if (normalizedValue) return;

    const defaultPacking = options.find(
      (p) => p.id === DEFAULT_PACKING_ID
    );

    if (defaultPacking) {
      onChange(defaultPacking);
      initializedRef.current = true;
    }
  }, [isEnabled, options, normalizedValue, onChange]);

  // ➕ add new packing
  const addNewPacking = async (name) => {
    if (!name.trim()) return;

    if (options.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      setError(`"${name}" already exists`);
      return;
    }

    setAdding(true);
    setError("");

    try {
      const res = await _Product_options.AddPacking({
        name,
        ar: { name },
        kr: { name },
        en: { name },
      });

      if (res.code !== 200 || !res.data?.id) {
        setError("Failed to add packing.");
        return;
      }

      const reload = await _Product_options.packings();
      const updated = reload.data?.product_options_values || [];
      const newPacking = updated.find((p) => p.id === res.data.id);
      if (newPacking) onChange(newPacking);
    } catch {
      setError("Network error while adding packing.");
    } finally {
      setAdding(false);
    }
  };

  // 🔥 hide default packing when enabled
  const filteredOptions = useMemo(() => {
    return isEnabled
      ? options.filter((p) => p.id !== DEFAULT_PACKING_ID)
      : [];
  }, [isEnabled, options]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1">Packing</Typography>

        <FormControlLabel
          label={isEnabled ? "ON (choose packing)" : "OFF (default packing)"}
          control={
            <Switch
              checked={isEnabled}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsEnabled(checked);

                if (checked) {
                  // 🔥 clear default so first selection works
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
          loading={packingsIsLoading || adding}
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
              addNewPacking(newValue);
              return;
            }

            if (newValue.name?.startsWith("Add: ")) {
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
                    {(packingsIsLoading || adding) && (
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
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default PackingAutocomplete;
