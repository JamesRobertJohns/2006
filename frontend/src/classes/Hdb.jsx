import "./Sidebar.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaMosquito } from "react-icons/fa6";
import { FaTrainSubway } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaRestroom } from "react-icons/fa";
import { BsHouse } from "react-icons/bs";
import { Marker } from "react-map-gl/maplibre";
import { FaHome } from "react-icons/fa";
const primaryColor = "#2D4059";

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

  getMapIcon({ setActiveHdb }) {
    return (
      <Marker
        latitude={this.latitude}
        longitude={this.longitude}
        key={`marker-${this.address}`}
        cursor="pointer"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setActiveHdb(this);
        }}
      >
        <div style={styles.iconContainer}>
          <FaHome size={30} cursor="pointer" style={styles.icon} />
        </div>
      </Marker>
    );
  }

  getSidePanel({ closeSidePanel, popCache }) {
    const formatPrice = (price) => {
      return Number(price).toLocaleString();
    };

    return (
      <div className={`sidebar ${"open"}`}>
        <div className="sidebar-header">
          {/* Consider making this dynamic if you have images for each property */}
          {/*<img src="block426.jpeg" alt="Property" />*/}
          <button className="close-btn" onClick={() => {}}></button>
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
          <h2 className="rent-price">S${formatPrice(this.resale_price)}</h2>
          <h5 className="property-name">{this.address}</h5>
          <p className="sub-info">Lease hremaining: {this.remaining_lease}</p>

          <div className="property-details">
            <p>
              <FaBed /> {this.flat_type}
            </p>
            <p>
              <BsHouse /> {this.floor_area_sqm} m²
            </p>
            <p>
              <FaRestroom /> Block: {this.block}
            </p>
            <p>
              <FaMosquito /> Dengue: 1000
            </p>
            <p>
              <FaTrainSubway /> Nearest Train: 5 min
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Hdb;
