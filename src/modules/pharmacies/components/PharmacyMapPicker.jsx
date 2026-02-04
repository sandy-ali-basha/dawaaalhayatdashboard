import React, { useMemo, useRef, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const DEFAULT_CENTER = { lat: 33.3152, lng: 44.3661 };
const DEFAULT_ZOOM = 12;

const latLngToPoint = (lat, lng, zoom) => {
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const mapSize = 256 * Math.pow(2, zoom);
  const x = ((lng + 180) / 360) * mapSize;
  const y =
    (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * mapSize;
  return { x, y };
};

const pointToLatLng = (x, y, zoom) => {
  const mapSize = 256 * Math.pow(2, zoom);
  const lng = (x / mapSize) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * y) / mapSize;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return { lat, lng };
};

const PharmacyMapPicker = ({ value, onChange }) => {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 600, height: 320 });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      setSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const center = useMemo(() => {
    if (value?.lat && value?.lng) {
      return { lat: value.lat, lng: value.lng };
    }
    return DEFAULT_CENTER;
  }, [value]);

  const mapUrl = useMemo(() => {
    const marker = value?.lat && value?.lng ? `${value.lat},${value.lng}` : null;
    const markerParam = marker ? `&markers=${marker},red-pushpin` : "";
    return `https://staticmap.openstreetmap.de/staticmap.php?center=${center.lat},${center.lng}&zoom=${DEFAULT_ZOOM}&size=${Math.round(
      size.width
    )}x${Math.round(size.height)}${markerParam}`;
  }, [center, size, value]);

  const handleClick = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const centerPoint = latLngToPoint(center.lat, center.lng, DEFAULT_ZOOM);
    const topLeft = {
      x: centerPoint.x - size.width / 2,
      y: centerPoint.y - size.height / 2,
    };

    const clickedPoint = {
      x: topLeft.x + clickX,
      y: topLeft.y + clickY,
    };

    const next = pointToLatLng(clickedPoint.x, clickedPoint.y, DEFAULT_ZOOM);
    onChange({ lat: Number(next.lat.toFixed(6)), lng: Number(next.lng.toFixed(6)) });
  };

  return (
    <Box>
      <Typography sx={{ mb: 1, fontWeight: 600 }} color="text.main">
        Pick pharmacy location from map
      </Typography>
      <Box
        ref={containerRef}
        onClick={handleClick}
        sx={{
          height: 320,
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          cursor: "crosshair",
        }}
      >
        <img
          src={mapUrl}
          alt="Pharmacy location picker"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </Box>
  );
};

export default PharmacyMapPicker;
