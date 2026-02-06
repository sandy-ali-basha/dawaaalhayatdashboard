import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import MapComponent from "@terrestris/react-geo/dist/Map/MapComponent/MapComponent";
import OlLayerTile from "ol/layer/Tile";
import OlMap from "ol/Map";
import { fromLonLat, toLonLat } from "ol/proj";
import OlSourceOsm from "ol/source/OSM";
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
// import "@terrestris/react-geo/dist/style.css";

const DEFAULT_CENTER = { lat: 33.3152, lng: 44.3661 };
const DEFAULT_ZOOM = 16;

const PharmacyMapPicker = ({ value, onChange }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const vectorSourceRef = useRef(new VectorSource({}));
  const mapElement = useRef(null); // Ref for the map container
  const isInternalUpdate = useRef(false); // To prevent loops
  // 1. Initialize Map ONCE
  useEffect(() => {
    const markerFeature = new Feature({
      geometry: new Point(
        fromLonLat([
          value?.lng || DEFAULT_CENTER.lng,
          value?.lat || DEFAULT_CENTER.lat,
        ]),
      ),
    });

    markerFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Use a valid icon URL
          scale: 0.05,
        }),
      }),
    );

    const vectorLayer = new VectorLayer({ source: vectorSourceRef.current });
    vectorSourceRef.current.addFeature(markerFeature);

    const mapInstance = new OlMap({
      layers: [new OlLayerTile({ source: new OlSourceOsm() }), vectorLayer],
      view: new OlView({
        center: fromLonLat([
          value?.lng || DEFAULT_CENTER.lng,
          value?.lat || DEFAULT_CENTER.lat,
        ]),
        zoom: DEFAULT_ZOOM,
      }),
    });

    const modify = new Modify({ features: new Collection([markerFeature]) });
    modify.on("modifyend", () => {
      const coords = markerFeature.getGeometry().getCoordinates();
      const [lng, lat] = toLonLat(coords);
      isInternalUpdate.current = true;
      onChange({ lat, lng });
    });

    mapInstance.on("click", (event) => {
      markerFeature.getGeometry().setCoordinates(event.coordinate);
      const [lng, lat] = toLonLat(event.coordinate);
      isInternalUpdate.current = true;
      onChange({ lat, lng });
    });

    mapInstance.addInteraction(modify);
    setMarker(markerFeature);
    setMap(mapInstance);

    return () => mapInstance.setTarget(undefined);
  }, []); // Empty dependency array: run once

  // 2. Sync Marker when "value" prop changes (e.g., after API load)
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
  }, [value?.lat, value?.lng, map, marker]);
  const handleNearMe = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = fromLonLat([
          position.coords.longitude,
          position.coords.latitude,
        ]);
        if (map) {
          map.getView().setCenter(coords);
          map.getView().setZoom(DEFAULT_ZOOM);
        }
        if (marker) {
          marker.getGeometry().setCoordinates(coords);
        }
        onChange({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError("");
      },
      () => setError("Unable to access your location."),
    );
  };
  // Move map function
  const moveTo = (lat, lng) => {
    if (!map || !marker) return;
    const coords = fromLonLat([lng, lat]);
    marker.getGeometry().setCoordinates(coords);
    map.getView().animate({ center: coords, duration: 500 });
    onChange({ lat, lng });
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchValue)}`,
      );
      const data = await res.json();
      if (data.length > 0) {
        moveTo(Number(data[0].lat), Number(data[0].lon));
        setError("");
      } else {
        setError("Not found");
      }
    } catch {
      setError("Search error");
    }
  };

  if (!map) return null;

  return (
    <Box>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          fullWidth
          label="Search location"
          placeholder="Search on map"
        />
        <Button variant="outlined" onClick={handleSearch}>
          Search
        </Button>
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
      <MapComponent
        map={map}
        style={{
          height: "360px",
          flex: 1,
          minWidth: "400px",
          maxWidth: "100%",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      />
    </Box>
  );
};

export default PharmacyMapPicker;
