import { Marker } from "react-map-gl/maplibre";
import { PiSecurityCameraBold } from "react-icons/pi";

const primaryColor = "#F07B3F";

const styles = {
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    border: "2px solid" + primaryColor,
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

  getMapIcon() {
    return (
      <Marker key={this.id} latitude={this.latitude} longitude={this.longitude}>
        <div style={styles.iconContainer}>
          <PiSecurityCameraBold size={22} style={styles.icon} />
        </div>
      </Marker>
    );
  }
}

export default TrafficCamera;
