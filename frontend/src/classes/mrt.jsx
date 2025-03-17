import { Marker } from "react-map-gl/dist/esm/exports-maplibre";
import { FaTrain } from "react-icons/fa6";
import { IoArrowBackSharp } from "react-icons/io5";

const primaryColor = "green";

const styles = {
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    border: "2.5px solid " + primaryColor,
    backgroundColor: "white",
    padding: 4,
  },
  icon: {
    color: primaryColor,
  },
};

class Mrt {
  constructor(name, latitude, longitude) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
  }
  getMrtName() {
    return this.name;
  }

  getLatitude() {
    return this.latitude;
  }

  getLongitude() {
    return this.longitude;
  }

  getMapIconMRT({ pushCache }) {
    return (
      <Marker
        name={this.name}
        latitude={this.latitude}
        longitude={this.longitude}
        cursor="pointer"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          pushCache(this);
        }}
      >
        <div style={styles.iconContainer}>
          <FaTrain cursor="pointer" size={22} style={styles.icon} />
        </div>
      </Marker>
    );
  }

  getSidePanel({ closeSidePanel, popCache }) {
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
              closeSidePanel();
            }}
          >
            ✕
          </button>
        </div>
        <div className="sidebar-content">
          <h2 className="mrt-name">{this.name}</h2>
        </div>
      </div>
    );
  }
}

export default Mrt;
