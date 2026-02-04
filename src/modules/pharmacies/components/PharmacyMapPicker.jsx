import React, { useMemo, useRef, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const DEFAULT_CENTER = { lat: 33.3152, lng: 44.3661 };
const DEFAULT_ZOOM = 12;
const TILE_SIZE = 256;

const latLngToPoint = (lat, lng, zoom) => {
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const mapSize = TILE_SIZE * Math.pow(2, zoom);
  const x = ((lng + 180) / 360) * mapSize;
  const y =
    (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * mapSize;
  return { x, y };
};

const pointToLatLng = (x, y, zoom) => {
  const mapSize = TILE_SIZE * Math.pow(2, zoom);
  const lng = (x / mapSize) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * y) / mapSize;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return { lat, lng };
};

const getTileUrl = (x, y, z) =>
  `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;

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

  const { tiles, markerPosition } = useMemo(() => {
    const centerPoint = latLngToPoint(center.lat, center.lng, DEFAULT_ZOOM);
    const topLeft = {
      x: centerPoint.x - size.width / 2,
      y: centerPoint.y - size.height / 2,
    };

    const startX = Math.floor(topLeft.x / TILE_SIZE);
    const startY = Math.floor(topLeft.y / TILE_SIZE);
    const endX = Math.floor((topLeft.x + size.width) / TILE_SIZE);
    const endY = Math.floor((topLeft.y + size.height) / TILE_SIZE);

    const tilesToRender = [];
    for (let x = startX; x <= endX; x += 1) {
      for (let y = startY; y <= endY; y += 1) {
        tilesToRender.push({
          x,
          y,
          left: x * TILE_SIZE - topLeft.x,
          top: y * TILE_SIZE - topLeft.y,
          url: getTileUrl(x, y, DEFAULT_ZOOM),
        });
      }
    }

    const markerPoint =
      value?.lat && value?.lng
        ? latLngToPoint(value.lat, value.lng, DEFAULT_ZOOM)
        : null;

    const markerPos = markerPoint
      ? {
          left: markerPoint.x - topLeft.x,
          top: markerPoint.y - topLeft.y,
        }
      : null;

    return { tiles: tilesToRender, markerPosition: markerPos };
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
    onChange({
      lat: Number(next.lat.toFixed(6)),
      lng: Number(next.lng.toFixed(6)),
    });
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
          position: "relative",
          backgroundColor: "grey.100",
        }}
      >
        {tiles.map((tile) => (
          <Box
            component="img"
            key={`${tile.x}-${tile.y}`}
            src={tile.url}
            alt=""
            sx={{
              position: "absolute",
              width: TILE_SIZE,
              height: TILE_SIZE,
              left: tile.left,
              top: tile.top,
            }}
          />
        ))}
        {markerPosition && (
          <Box
            sx={{
              position: "absolute",
              left: markerPosition.left,
              top: markerPosition.top,
              transform: "translate(-50%, -100%)",
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "error.main",
              border: "2px solid white",
              boxShadow: 1,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default PharmacyMapPicker;
