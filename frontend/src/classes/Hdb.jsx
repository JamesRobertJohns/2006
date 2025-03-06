import { Marker } from "react-map-gl/maplibre";
import { FaHome } from "react-icons/fa";
const primaryColor = "#2D4059";

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

class Hdb {
  constructor(
    month,
    town,
    flat_type,
    block,
    street_name,
    storey_range,
    floor_area_sqm,
    flat_model,
    lease_commence_date,
    remaining_lease,
    resale_price,
    address,
    latitude,
    longitude
  ) {
    this.month = month;
    this.town = town;
    this.flat_type = flat_type;
    this.block = block;
    this.street_name = street_name;
    this.storey_range = storey_range;
    this.floor_area_sqm = floor_area_sqm;
    this.flat_model = flat_model;
    this.lease_commence_date = lease_commence_date;
    this.remaining_lease = remaining_lease;
    this.resale_price = resale_price;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }

 
  getFlatType() {
    return this.flat_type;
  }

  getLeaseLife() {
    return this.remaining_lease;
  }

  getPrice() {
    return this.resale_price;
  }

  getLatitude() {
    return this.latitude;
  }

  getLongitude() {
    return this.longitude;
  }

  getMapIcon() {
    return (
      <Marker latitude={this.latitude} longitude={this.longitude}>
        <div style={styles.iconContainer}>
          <FaHome size={30} style={styles.icon} />
        </div>
      </Marker>
    );
  }
}

export default Hdb;
