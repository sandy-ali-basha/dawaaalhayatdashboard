import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const DEFAULT_CENTER = { lat: 33.3152, lng: 44.3661 };
const DEFAULT_ZOOM = 13;
const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
let googleMapsPromise;

const loadGoogleMaps = () => {
  if (googleMapsPromise) return googleMapsPromise;
  googleMapsPromise = new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve(window.google.maps);
      return;
    }
    if (!GOOGLE_MAPS_KEY) {
      reject(new Error("Missing Google Maps API key"));
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google.maps);
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
  return googleMapsPromise;
};

const PharmacyMapPicker = ({ value, onChange }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  const center = useMemo(() => {
    if (value?.lat && value?.lng) {
      return { lat: value.lat, lng: value.lng };
    }
    return DEFAULT_CENTER;
  }, [value]);

  useEffect(() => {
    let mapInstance;
    let autocomplete;
    let clickListener;
    setError("");

    loadGoogleMaps()
      .then((maps) => {
        if (!mapRef.current) return;
        mapInstance = new maps.Map(mapRef.current, {
          center,
          zoom: DEFAULT_ZOOM,
          mapTypeControl: false,
          streetViewControl: false,
        });

        if (value?.lat && value?.lng) {
          markerRef.current = new maps.Marker({
            position: value,
            map: mapInstance,
          });
        }

        clickListener = mapInstance.addListener("click", (event) => {
          const next = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          if (!markerRef.current) {
            markerRef.current = new maps.Marker({
              position: next,
              map: mapInstance,
            });
          } else {
            markerRef.current.setPosition(next);
          }
          onChange(next);
        });

        if (inputRef.current) {
          autocomplete = new maps.places.Autocomplete(inputRef.current, {
            fields: ["geometry", "name"],
          });
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry?.location) return;
            const next = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            mapInstance.panTo(next);
            mapInstance.setZoom(DEFAULT_ZOOM);
            if (!markerRef.current) {
              markerRef.current = new maps.Marker({
                position: next,
                map: mapInstance,
              });
            } else {
              markerRef.current.setPosition(next);
            }
            onChange(next);
          });
        }
      })
      .catch((err) => setError(err.message));

    return () => {
      if (clickListener) clickListener.remove();
      if (autocomplete) autocomplete.unbindAll();
    };
  }, [center, onChange, value?.lat, value?.lng]);

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const next = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        onChange(next);
        if (window.google?.maps && markerRef.current) {
          markerRef.current.setPosition(next);
        }
      },
      () => setError("Unable to access your location.")
    );
  };

  return (
    <Box>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          label="Search location"
          placeholder="Search on map"
        />
        <Button variant="outlined" onClick={handleNearMe}>
          Near me
        </Button>
      </Stack>

      <Typography sx={{ mb: 1, fontWeight: 600 }} color="text.main">
        Pick pharmacy location from map
      </Typography>
      {error && (
        <Typography color="error.main" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}
      {!GOOGLE_MAPS_KEY && (
        <Typography color="error.main" sx={{ mb: 1 }}>
          Missing REACT_APP_GOOGLE_MAPS_API_KEY to load Google Maps.
        </Typography>
      )}
      <Box
        ref={mapRef}
        sx={{
          height: 360,
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      />
    </Box>
  );
};

export default PharmacyMapPicker;
