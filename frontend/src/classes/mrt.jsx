import { Marker } from "react-map-gl/dist/esm/exports-maplibre";
import { FaTrain } from "react-icons/fa6";

const primaryColor = "#1b1915";

const styles = {
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      border: "2.5px solid" + primaryColor,
      backgroundColor: "white",
      padding: 4,
    },
    icon: {
      color: primaryColor,
    },
  };

  class Mrt {
    constructor(
        name,
        latitude,
        longitude
    ) {
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
    
      getMapIconMRT() {
        return (
            <Marker
            name = {this.name}
            latitude={this.latitude}
            longitude={this.longitude}
            >
                <div style={styles.iconContainer}>
                    <FaTrain size={22} style={styles.icon}/>
                </div>
            </Marker>
        );
      }
  }

  export default Mrt;


