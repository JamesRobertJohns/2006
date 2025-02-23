import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Marker } from "react-map-gl/maplibre";
import { useState, useEffect } from "react";
import TrafficCamera from "./classes/TrafficCamera.jsx";
import Hdb from "./classes/Hdb.jsx";

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
      const smallData = data.slice(0, 10);
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

  useEffect(() => {
    fetchTrafficCameras(setTrafficCameras);
    fetchHdbs(setHdbs);
  }, []);

  return (
    <div
      style={{
        width: "100wh",
        height: "100vh",
      }}
    >
      <Map
        maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
        mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
        initialViewState={{
          longitude: initialLongitude,
          latitude: initialLatitude,
          zoom: initialZoom,
        }}
      >
        {trafficCameras.map((trafficCamera) => (
          <Marker
            key={trafficCamera.id}
            latitude={trafficCamera.latitude}
            longitude={trafficCamera.longitude}
          >
            <img
              src={trafficCamera.url}
              style={{ width: 60, height: "auto" }}
            />
          </Marker>
        ))}
        {hdbs.map((hdb) => (
          <Marker
            latitude={hdb.latitude}
            longitude={hdb.longitude}
            style={{ background: "red", color: "white", padding: 4 }}
          >
            {console.log(hdb.address, hdb.latitude, hdb.longitude)}
            {hdb.address}
          </Marker>
        ))}
      </Map>
    </div>
  );
}

export default DynamicMap;
