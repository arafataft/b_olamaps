import { useState, useRef } from "react";

import { useEffect } from "react";
import { Map as MapLibreMap, NavigationControl, Marker } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

function App() {
  const [mapReady, setMapReady] = useState(false);
  const markerRef = useRef(null); // Reference to the Marker instance

  useEffect(() => {
    if (!mapReady) return;

    const map = new MapLibreMap({
      container: "central-map",
      center: [0, 0],
      zoom: 0,
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      transformRequest: (url, resourceType) => {
        // Replace the wrong URL with the correct one
        url = url.replace("app.olamaps.io", "api.olamaps.io");

        // Add the API key to the URL based on existing parameters
        if (url.includes("?")) {
          url = url + "&api_key=EkrQrT7mWoLXhadkgbeBxdgQjCdRoDcmTAqDY3em";
        } else {
          url = url + "?api_key=EkrQrT7mWoLXhadkgbeBxdgQjCdRoDcmTAqDY3em";
        }
        return { url, resourceType };
      },
    });

    const nav = new NavigationControl({
      visualizePitch: false,
      showCompass: true,
    });

    map.addControl(nav, "top-left");

    // Initialize Marker and store its reference
    markerRef.current = new Marker().setLngLat([88.363895, 22.572646]).addTo(map);

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      // Update marker position
      markerRef.current.setLngLat([lng, lat]);
    });
    }, [mapReady]);

  return (
    <>
      <div
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        ref={() => setMapReady(true)}
        id="central-map"
      />
    </>
  );
}

export default App;
