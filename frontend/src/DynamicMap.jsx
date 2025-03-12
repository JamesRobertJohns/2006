import "maplibre-gl/dist/maplibre-gl.css";

import {
  Map,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl/maplibre";

import HousePin from "./HousePin.jsx";

import { useState, useEffect, useMemo } from "react";
import TrafficCamera from "./classes/TrafficCamera.jsx";
import Hdb from "./classes/Hdb.jsx";
import Switch from "@mui/material/Switch";
import Mrt from "./classes/mrt.jsx"
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

const fetchSchool = async(setSchool) => {
  try {
    const response = await fetch("./schools.json");
    const data = await response.json();
    
    if (data) {
      const Schools = data.map((item)=>{
        return new School(
          item.school_name,
          item.latitude,
          item.longitude
        );
      });
      setSchool(Schools);
    }

  } catch(error) {
    console.error("Error fetching schools: ", error);
  }
}

const fetchHdbs = async (setHdbs) => {
  try {
    const response = await fetch("./hdb.json");
    const data = await response.json();
    if (data) {
      const shuffledData = [...data];
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

  const [showHdb, setShowHdb] = useState(true);
  const [showTrafficCamera, setShowTrafficCamera] = useState(true);
  const [showMRT, setShowMRT] = useState(true);
  const [showSchool, setShowSchool] = useState(true);

  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    fetchTrafficCameras(setTrafficCameras);
    fetchHdbs(setHdbs);
    fetchMrt(setMRTs);
    fetchSchool(setSchools);
  }, []);

  {
    /*
        
        there's dupliates in addres need to check the reason why 

        using var.map(), key needs to be supplied and supposed to be unique

        otherwise will have warnings and may have future bugs

        */
  }

  const hdbpins = useMemo(
    () =>
      hdbs.map((hdb) => (
        <Marker
          latitude={hdb.latitude}
          longitude={hdb.longitude}
          key={`marker-${hdb.address}`}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation(); // this prevents propogation to Map
            setPopupInfo(hdb);
          }}
        >
          <HousePin />
        </Marker>
      )),
    [hdbs] // dependencies, rn it is just hdbs, but can put filtered-hdb or sth to reflect changes
  );

  return (
    <div
      style={{
        width: "100wh",
        height: "100vh",
      }}
    >
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
          <Switch defaultChecked onChange={()=> setShowSchool(!showSchool)}/>
          <span>Display School</span>
        </div>
      </div>
      <Map
        maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
        mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
        /* this is the TILEjson get */
        initialViewState={{
          longitude: initialLongitude,
          latitude: initialLatitude,
          zoom: initialZoom,
        }}
      >
        {/* imma place nav controls here */}

        <GeolocateControl
          position="top-left"
          trackUserLocation="false"
          showAccuracyCircle="false"
        />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {/* {hdbpins} */}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              <p>{popupInfo.address}</p>
            </div>
          </Popup>
        )}

        {showTrafficCamera &&
          trafficCameras.map((trafficCamera) => trafficCamera.getMapIcon())}
        {showHdb && hdbs.map((hdb) => hdb.getMapIcon(setPopupInfo))}
        {showMRT && MRTs.map((MRT) => MRT.getMapIconMRT())}
        {showSchool && Schools.map((School) => School.getSchoolMapIcon())}
      </Map>
    </div>
  );
}

export default DynamicMap;
