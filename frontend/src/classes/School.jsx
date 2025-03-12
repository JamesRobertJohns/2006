import { Marker } from "react-map-gl/maplibre";
import { IoSchoolOutline } from "react-icons/io5";

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

class School {
    constructor (
        school_name,
        latitude,
        longitude
    ) {
        this.school_name = school_name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getSchoolName() {
        return this.school_name;
    }
    
    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }

    getSchoolMapIcon() {
        return (
            <Marker 
            school_name={this.school_name}
            latitude={this.latitude} 
            longitude={this.longitude}
            >
                <div style={styles.iconContainer}>
                <IoSchoolOutline size={22} style={styles.icon}/>
                </div>
            </Marker>
        )
    }
}

export default School;

