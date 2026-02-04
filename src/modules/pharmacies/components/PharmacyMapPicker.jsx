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
import "@terrestris/react-geo/dist/style.css";

const DEFAULT_CENTER = { lat: 33.3152, lng: 44.3661 };
const DEFAULT_ZOOM = 16;

const PharmacyMapPicker = ({ value, onChange }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const vectorSourceRef = useRef(new VectorSource({}));

  const center = useMemo(() => {
    if (value?.lat && value?.lng) {
      return fromLonLat([value.lng, value.lat]);
    }
    return fromLonLat([DEFAULT_CENTER.lng, DEFAULT_CENTER.lat]);
  }, [value]);

  const vectorLayer = useMemo(
    () =>
      new VectorLayer({
        source: vectorSourceRef.current,
      }),
    []
  );

  useEffect(() => {
    const mapInstance = new OlMap({
      target: undefined,
      layers: [
        new OlLayerTile({
          source: new OlSourceOsm(),
        }),
        vectorLayer,
      ],
    });

    const view = new OlView({
      center,
      zoom: DEFAULT_ZOOM,
    });
    mapInstance.setView(view);

    const markerFeature = new Feature({
      geometry: new Point(center),
    });
    markerFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          scale: 1,
        }),
      })
    );

    vectorSourceRef.current.addFeature(markerFeature);
    setMarker(markerFeature);

    const modify = new Modify({
      features: new Collection([markerFeature]),
    });

    modify.on("modifyend", () => {
      const coords = markerFeature.getGeometry().getCoordinates();
      const [lng, lat] = toLonLat(coords);
      onChange({ lat, lng });
    });

    mapInstance.addInteraction(modify);
    setMap(mapInstance);
  }, [center, onChange, vectorLayer]);

  useEffect(() => {
    if (!map || !marker) return;
    const clickHandler = (event) => {
      const clickedCoord = event.coordinate;
      marker.getGeometry().setCoordinates(clickedCoord);
      const [lng, lat] = toLonLat(clickedCoord);
      onChange({ lat, lng });
    };

    map.on("click", clickHandler);
    return () => {
      map.un("click", clickHandler);
    };
  }, [map, marker, onChange]);

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
      () => setError("Unable to access your location.")
    );
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchValue
        )}`
      );
      const results = await response.json();
      if (!results.length) {
        setError("No results found for this search.");
        return;
      }
      const top = results[0];
      const coords = fromLonLat([Number(top.lon), Number(top.lat)]);
      if (map) {
        map.getView().setCenter(coords);
        map.getView().setZoom(DEFAULT_ZOOM);
      }
      if (marker) {
        marker.getGeometry().setCoordinates(coords);
      }
      onChange({ lat: Number(top.lat), lng: Number(top.lon) });
      setError("");
    } catch (err) {
      setError("Search failed. Please try again.");
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
