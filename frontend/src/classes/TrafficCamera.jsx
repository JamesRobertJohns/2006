import "./Sidebar.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { IoTimerSharp } from "react-icons/io5";
import { Marker } from "react-map-gl/maplibre";
import { PiSecurityCameraBold } from "react-icons/pi";

const primaryColor = "#F07B3F";

const styles = {
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    border: "2.4px solid" + primaryColor,
    backgroundColor: "white",
    padding: 3,
  },
  icon: {
    color: primaryColor,
  },
};

class TrafficCamera {
  constructor(id, url, latitude, longitude, timestamp) {
    this.id = id;
    this.url = url;
    this.latitude = latitude;
    this.longitude = longitude;
    this.timestamp = timestamp;
  }

  getUrl() {
    return this.url;
  }

  getLatitude() {
    return this.latitude;
  }

  getLongitude() {
    return this.longitude;
  }

  getMapIcon({ pushCache }) {
    return (
      <Marker
        key={this.id}
        latitude={this.latitude}
        longitude={this.longitude}
        onClick={() => {
          pushCache(this);
        }}
      >
        <div style={styles.iconContainer}>
          <PiSecurityCameraBold
            cursor="pointer"
            size={22}
            style={styles.icon}
          />
        </div>
      </Marker>
    );
  }

  getSidePanel({ clearCache, popCache }) {
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);

      // Extract day, month, and year with padding
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);

      // Extract hours, minutes, seconds, and AM/PM
      const hours = String(date.getHours() % 12 || 12).padStart(2, "0"); // 12-hour format
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      const ampm = date.getHours() >= 12 ? "PM" : "AM";

      // Format it as dd/MM/yy hh:mm:ss AM/PM
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    };

    return (
      <div className={`sidebar ${"open"}`}>
        <div className="sidebar-header">
          <button
            className="close-btn"
            onClick={() => {
              popCache();
            }}
          >
            <IoArrowBackSharp />
          </button>
          <button
            className="close-btn"
            onClick={() => {
              clearCache();
            }}
          >
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          <div>
            <img
              src={this.getUrl()}
              alt="Property"
              style={{
                width: "100%", // Makes the image stretch to fill the width of the container
                height: "auto", // Maintains the image's aspect ratio
                objectFit: "cover", // Ensures the image fills the container without distorting
              }}
            />
          </div>
          <h5 className="property-name">Traffic Camera ID: {this.id}</h5>
          <p className="sub-info">
            <IoTimerSharp /> {formatTimestamp(this.timestamp)}
          </p>
        </div>
      </div>
    );
  }
}

export default TrafficCamera;
