import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import OlLayerTile from "ol/layer/Tile";
import OlMap from "ol/Map";
import { fromLonLat, toLonLat } from "ol/proj";
import OlSourceXYZ from "ol/source/XYZ";
import OlView from "ol/View";
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import Modify from "ol/interaction/Modify";
import Collection from "ol/Collection";

import "ol/ol.css";

const DEFAULT_CENTER = { lat: 33.3152, lng: 44.3661 };
const DEFAULT_ZOOM = 16;

const PharmacyMapPicker = ({ value, onChange }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");

  const mapElement = useRef(null);
  const vectorSourceRef = useRef(new VectorSource());
  const isInternalUpdate = useRef(false);

  // ✅ Initialize map ONCE
  useEffect(() => {
    const markerFeature = new Feature({
      geometry: new Point(
        fromLonLat([
          value?.lng || DEFAULT_CENTER.lng,
          value?.lat || DEFAULT_CENTER.lat,
        ])
      ),
    });

    markerFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          scale: 0.05,
        }),
      })
    );

    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current,
    });

    vectorSourceRef.current.addFeature(markerFeature);

    const mapInstance = new OlMap({
      target: mapElement.current || undefined,
      layers: [
        new OlLayerTile({
          source: new OlSourceXYZ({
            url: "https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
            crossOrigin: "anonymous",
            maxZoom: 19,
          }),
        }),
        vectorLayer,
      ],
      view: new OlView({
        center: fromLonLat([
          value?.lng || DEFAULT_CENTER.lng,
          value?.lat || DEFAULT_CENTER.lat,
        ]),
        zoom: DEFAULT_ZOOM,
      }),
    });

    // ✅ Drag interaction
    const modify = new Modify({
      features: new Collection([markerFeature]),
    });

    modify.on("modifyend", () => {
      const coords = markerFeature.getGeometry().getCoordinates();
      const [lng, lat] = toLonLat(coords);

      isInternalUpdate.current = true;
      onChange({ lat, lng });
    });

    // ✅ Click to move marker
    mapInstance.on("click", (event) => {
      markerFeature.getGeometry().setCoordinates(event.coordinate);
      const [lng, lat] = toLonLat(event.coordinate);

      isInternalUpdate.current = true;
      onChange({ lat, lng });
    });

    mapInstance.addInteraction(modify);

    setMarker(markerFeature);
    setMap(mapInstance);

    return () => {
      mapInstance.setTarget(null);
    };
  }, []);

  // ✅ Sync external value → map
  useEffect(() => {
    if (map && marker && value?.lat && value?.lng) {
      if (isInternalUpdate.current) {
        isInternalUpdate.current = false;
        return;
      }

      const coords = fromLonLat([value.lng, value.lat]);
      marker.getGeometry().setCoordinates(coords);
      map.getView().setCenter(coords);
    }
  }, [value, map, marker]);

  // ✅ Near me
  const handleNearMe = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords = fromLonLat([longitude, latitude]);

        map.getView().setCenter(coords);
        map.getView().setZoom(DEFAULT_ZOOM);
        marker.getGeometry().setCoordinates(coords);

        onChange({ lat: latitude, lng: longitude });
        setError("");
      },
      () => setError("Unable to access your location")
    );
  };

  // ✅ Move helper
  const moveTo = (lat, lng) => {
    if (!map || !marker) return;

    const coords = fromLonLat([lng, lat]);
    marker.getGeometry().setCoordinates(coords);

    map.getView().animate({
      center: coords,
      duration: 500,
    });

    onChange({ lat, lng });
  };

  // ✅ Search location
  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchValue
        )}`
      );

      const data = await res.json();

      if (data.length > 0) {
        moveTo(Number(data[0].lat), Number(data[0].lon));
        setError("");
      } else {
        setError("Location not found");
      }
    } catch {
      setError("Search failed");
    }
  };

  return (
    <Box>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          fullWidth
          label="Search location"
        />

        <Button variant="outlined" onClick={handleSearch}>
          Search
        </Button>

        <Button variant="outlined" onClick={handleNearMe}>
          Near me
        </Button>
      </Stack>

      <Typography sx={{ mb: 1, fontWeight: 600 }}>
        Pick pharmacy location from map
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}

      {/* ✅ Render the map only after the OpenLayers map instance is ready */}
      <Box
        ref={mapElement}
        sx={{
          height: "360px",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      />
    </Box>
  );
};

export default PharmacyMapPicker;