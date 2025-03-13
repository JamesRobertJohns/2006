import "maplibre-gl/dist/maplibre-gl.css";
import {
  Map,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl/maplibre";
import { useState, useEffect, useMemo } from "react";

import TrafficCamera from "./classes/TrafficCamera.jsx";
import Hdb from "./classes/Hdb.jsx";
import Sidebar from "./Sidebar.jsx";
import Switch from "@mui/material/Switch";

const initialLongitude = 103.81895378099354;
const initialLatitude = 1.356474868742945;
const initialZoom = 11.6;

const fetchTrafficCameras = async (setTrafficCameras) => {
  try {
    const response = await fetch(
      "https://api.data.gov.sg/v1/transport/traffic-images"
    );
    const data = await response.json();

    if (data) {
      const trafficCameras = data.items[0].cameras.map((item) => {
        return new TrafficCamera(
          item.camera_id,
          item.image,
          item.location.latitude,
          item.location.longitude,
          item.timestamp
        );
      });
      setTrafficCameras(trafficCameras);
    }
  } catch (error) {
    console.error("Error fetching:", error);
  }
};

const fetchHdbs = async (setHdbs) => {
  try {
    const response = await fetch("./hdb.json");
    const data = await response.json();
    if (data) {
      const shuffledData = [...data];
      // Shuffle the array
      for (let i = shuffledData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
      }
      const smallData = shuffledData.slice(0, 75);
      const hdbs = smallData.map((item) => {
        return new Hdb(
          item.month,
          item.town,
          item.flat_type,
          item.block,
          item.street_name,
          item.storey_range,
          item.floor_area_sqm,
          item.flat_model,
          item.lease_commence_date,
          item.remaining_lease,
          item.resale_price,
          item.address,
          item.latitude,
          item.longitude
        );
      });
      setHdbs(hdbs);
    }
  } catch (error) {
    console.error("Error fetching:", error);
  }
};

function DynamicMap() {
  const [trafficCameras, setTrafficCameras] = useState([]);
  const [hdbs, setHdbs] = useState([]);

  const [showHdb, setShowHdb] = useState(true);
  const [showTrafficCamera, setShowTrafficCamera] = useState(true);

  // State for the selected HDB (for sidebar)
  const [selectedHdb, setSelectedHdb] = useState(null);

  useEffect(() => {
    fetchTrafficCameras(setTrafficCameras);
    fetchHdbs(setHdbs);
  }, []);

  // Prepare HDB markers using our updated getMapIcon method
  const hdbpins = useMemo(
    () => hdbs.map((hdb) => hdb.getMapIcon(setSelectedHdb)),
    [hdbs]
  );

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Sidebar Integration */}
      <Sidebar
        isOpen={Boolean(selectedHdb)}
        onClose={() => setSelectedHdb(null)}
        selectedHdb={selectedHdb}
      />
      {/* Toggle Buttons */}
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          background: "white",
        }}
      >
        <div>
          <Switch defaultChecked onChange={() => setShowHdb(!showHdb)} />
          <span>Display HDB</span>
        </div>
        <div>
          <Switch
            defaultChecked
            onChange={() => setShowTrafficCamera(!showTrafficCamera)}
          />
          <span>Display Traffic Camera</span>
        </div>
      </div>

      <Map
        maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
        mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
        initialViewState={{
          longitude: initialLongitude,
          latitude: initialLatitude,
          zoom: initialZoom,
        }}
      >
        <GeolocateControl position="bottom-right" showAccuracyCircle={false}  />
        <FullscreenControl position="bottom-right" />
        <NavigationControl position="bottom-right" />
        <ScaleControl />

        {showTrafficCamera &&
          trafficCameras.map((trafficCamera) =>
            trafficCamera.getMapIcon()
          )}
        {showHdb && hdbpins}
      </Map>
    </div>
  );
}

export default DynamicMap;
