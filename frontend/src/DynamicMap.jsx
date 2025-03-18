import "maplibre-gl/dist/maplibre-gl.css";
import {
  Map,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl/maplibre";
import { 
  useState, 
  useEffect, 
  useMemo, 
  useRef,
  useContext
} from "react";

import TrafficCamera from "./classes/TrafficCamera.jsx";
import Hdb from "./classes/Hdb.jsx";
import Switch from "@mui/material/Switch";
import Mrt from "./classes/mrt.jsx";
import School from "./classes/School.jsx";

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

const fetchMrt = async (setMRT) => {
  try {
    const response = await fetch("./LTAMRTStationExitUpdated.json");
    const data = await response.json();

    if (data) {
      const MRTs = data.features.map((item) => {
        return new Mrt(
          item.properties.Name,
          item.geometry.coordinates[1],
          item.geometry.coordinates[0]
        );
      });

      setMRT(MRTs);
    }
  } catch (error) {
    console.error("Error fetching MRT stations:", error);
  }
};

const fetchSchool = async (setSchool) => {
  try {
    const response = await fetch("./schools.json");
    const data = await response.json();

    if (data) {
      const Schools = data.map((item) => {
        return new School(
          item.school_name,
          item.address,
          item.postal_code,
          item.url_address,
          item.telephone_no,
          item.email_address,
          item.mrt_desc,
          item.bus_desc,
          item.latitude,
          item.longitude
        );
      });
      setSchool(Schools);
    }
  } catch (error) {
    console.error("Error fetching schools: ", error);
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
  const [MRTs, setMRTs] = useState([]);
  const [Schools, setSchools] = useState([]);

  const [displayTrafficCameras, setDisplayTrafficCameras] = useState([]);
  const [displayHdbs, setDisplayHdbs] = useState([]);
  const [displayMRTs, setDisplayMRTs] = useState([]);
  const [displaySchools, setDisplaySchools] = useState([]);

  const [showHdb, setShowHdb] = useState(true);
  const [showTrafficCamera, setShowTrafficCamera] = useState(true);
  const [showMRT, setShowMRT] = useState(true);
  const [showSchool, setShowSchool] = useState(true);

  const [cache, setCache] = useState([]); // cache state for side panel

  const mapRef = useRef();

  const pushCache = (element) => {
    setCache((prevCache) => [...prevCache, element]);
  };

  const popCache = () => {
    setCache((prevCache) => prevCache.slice(0, -1));
  };

  const clearCache = () => {
    setCache([]);
  };

  const setActiveHdb = (element) => {
    pushCache(element);
    setDisplayTrafficCameras(getNearestNLocations(trafficCameras, element, 5));
    setDisplayMRTs(getNearestNLocations(MRTs, element, 3));
    setDisplaySchools(getNearestNLocations(Schools, element, 3));
    setDisplayHdbs([element]);
  };

  const closeSidePanel = () => {
    clearCache();
    setDisplayTrafficCameras([]);
    setDisplayHdbs(hdbs);
    setDisplayMRTs([]);
    setDisplaySchools([]);
    resetFlyToLocation();
  };

  const euclideanDistance = (obj, target) => {
    const dx = obj.longitude - target.longitude;
    const dy = obj.latitude - target.latitude;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getNearestNLocations = (locations, target, n) => {
    return locations
      .sort((a, b) => {
        const distanceA = euclideanDistance(a, target);
        const distanceB = euclideanDistance(b, target);
        return distanceA - distanceB;
      })
      .slice(0, n);
  };

  const flyToLocation = (latitude, longitude) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 13.5,
        speed: 0.25,
        curve: 2.5,
      });
    }
  };

  const resetFlyToLocation = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [initialLongitude, initialLatitude],
        zoom: initialZoom,
        speed: 0.5,
        curve: 1,
      });
    }
  };

  useEffect(() => {
    fetchTrafficCameras(setTrafficCameras);
    fetchHdbs(setHdbs);
    fetchMrt(setMRTs);
    fetchSchool(setSchools);
  }, []);

  useEffect(() => {
    setDisplayHdbs(hdbs);
  }, [trafficCameras, hdbs, MRTs, Schools]);

  useEffect(() => {
    if (cache.length > 0) {
      const activeElement = cache[cache.length - 1];
      flyToLocation(activeElement.latitude, activeElement.longitude);
    }
  }, [cache]);

  // Prepare HDB markers using our updated getMapIcon method
  const hdbpins = useMemo(
    () => hdbs.map((hdb) => hdb.getMapIcon({ setActiveHdb })),
    [hdbs]
  );

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Side Panel */}
      {cache.length > 0 &&
        cache[cache.length - 1].getSidePanel({
          closeSidePanel,
          popCache,
        })}

      {/* Toggle Buttons */}
      {cache.length > 0 && (
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
          <div>
            <Switch defaultChecked onChange={() => setShowMRT(!showMRT)} />
            <span>Display MRT</span>
          </div>
          <div>
            <Switch
              defaultChecked
              onChange={() => setShowSchool(!showSchool)}
            />
            <span>Display School</span>
          </div>
        </div>
      )}

      <Map
        ref={mapRef}
        maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
        mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
        initialViewState={{
          longitude: initialLongitude,
          latitude: initialLatitude,
          zoom: initialZoom,
        }}
      >
        <GeolocateControl
          position="bottom-right"
          showAccuracyCircle={false}
          trackUserLocation={false}
        />
        <FullscreenControl position="bottom-right" />
        <NavigationControl position="bottom-right" />
        <ScaleControl />

        {showTrafficCamera &&
          displayTrafficCameras.map((trafficCamera) =>
            trafficCamera.getMapIcon({ pushCache })
          )}
        {showHdb && displayHdbs.map((hdb) => hdb.getMapIcon({ setActiveHdb }))}
        {showMRT && displayMRTs.map((MRT) => MRT.getMapIconMRT({ pushCache }))}
        {showSchool &&
          displaySchools.map((School) =>
            School.getSchoolMapIcon({ pushCache })
          )}
      </Map>
    </div>
  );
}

export default DynamicMap;
