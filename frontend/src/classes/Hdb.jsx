import "./Sidebar.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaMosquito } from "react-icons/fa6";
import { FaTrainSubway } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaRestroom } from "react-icons/fa";
import { BsHouse } from "react-icons/bs";
import { Marker } from "react-map-gl/maplibre";
import { FaHome } from "react-icons/fa";
import UrbanDataObject from "./UrbanDataObject.jsx";
import Bar from "./Bar";

const primaryColor = "#2D4059";

/**
 * inline styling for HDB icon
 */
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

/**
 * Abstraction for an HDB object using attributes from data.gov.sg
 *
 * @class Hdb
 * @classdesc supports setters and getters, and rendering of marker
 */
class Hdb extends UrbanDataObject {
  /**
   * Constructs a HDB object by initialisng relevant attributes.
   *
   * @constructs Hdb object
   * @param {string} month
   * @param {string} town
   * @param {string} block
   * @param {string} street_name
   * @param {string} storey_range
   * @param {string} floor_area_sqm
   * @param {string} flat_model
   * @param {string} lease_commence_date
   * @param {string} remaining_lease
   * @param {string} resale_price
   * @param {string} address
   * @param {string} latitude
   * @param {string} longitude
   */
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
    super(longitude, latitude);

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
    this.nearestSchools = [];
    this.nearestMRT = [];
    this.nearestTrafficCameras = [];
    this.nearestDengue = [];
  }

  setNearestSchools = (nearestSchools) => {
    this.nearestSchools = nearestSchools;
  };

  setNearestMRT = (nearestMRT) => {
    this.nearestMRT = nearestMRT;
  };

  setNearestTrafficCameras = (nearestCameras) => {
    this.nearestTrafficCameras = nearestCameras;
  };

  setNearestDengue = (nearestDengue) => {
    this.nearestDengue = nearestDengue;
  };

  getFlatType() {
    return this.flat_type;
  }

  getFullAddress() {
    return this.address + " " + this.block;
  }

  getLeaseLife() {
    return this.remaining_lease;
  }

  getPrice() {
    return this.resale_price;
  }

  getTotalScore(weights) {
    // return 0.5;
    const schoolTarget = this.nearestSchools?.[0];
    const mrtTarget = this.nearestMRT?.[0];
    const dengueTarget = this.nearestDengue?.[0];

    const schoolScore = schoolTarget ? this.getDistanceScore(schoolTarget) : 0;
    const mrtScore = mrtTarget ? this.getDistanceScore(mrtTarget) : 0;
    const dengueScore = dengueTarget
      ? this.getDengueDistanceScore(dengueTarget)
      : 0;

    // const schoolScore = 0.5;
    // const mrtScore = 0.5;
    // const dengueScore = 0.5;

    // console.log(schoolTarget, mrtTarget, dengueTarget);
    // console.log(schoolScore, mrtScore, dengueScore);

    return (
      weights &&
      weights.school * schoolScore +
        weights.mrt * mrtScore +
        weights.dengue * dengueScore
    );
  }

  getDistanceScore(target) {
    if (!target) return 0;

    const MAX_WALKING_DIST_KM = 2;
    const KM_PER_DEGREE = 111;

    const euclideanDistance = (obj, target) => {
      const dx = obj.longitude - target.longitude;
      const dy = obj.latitude - target.latitude;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const distDegrees = euclideanDistance(this, target);
    const distKm = distDegrees * KM_PER_DEGREE;

    // Base score: closer = higher score (clamped between 0 and 1)
    let score = Math.max(0, 1 - distKm / MAX_WALKING_DIST_KM);

    return score;
  }

  getDengueDistanceScore(target) {
    if (!target) return 0;

    const MAX_WALKING_DIST_KM = 5;
    const KM_PER_DEGREE = 111;

    const euclideanDistance = (obj, target) => {
      const dx = obj.longitude - target.longitude;
      const dy = obj.latitude - target.latitude;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const distDegrees = euclideanDistance(this, target);
    const distKm = distDegrees * KM_PER_DEGREE;

    let score = Math.min(1, distKm / MAX_WALKING_DIST_KM);

    return score;
  }

  /**
   * Returns <Marker /> component initialised with the HDB flat's coordinate
   * and icon.
   *
   * @param {function} setActiveHdb, from useState()
   * @return <Marker /> from maplibre
   */
  getMapIcon({ setActiveHdb }) {
    return (
      <Marker
        latitude={this.getLatitude()}
        longitude={this.getLongitude()}
        key={`marker-${this.key}`}
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

  /**
   * Renders side panel by creating <div> and <p> elements
   *
   * @param {function} closeSidePanel
   * @para {function} popCache
   * @description loads relevant attributes from HDB objects
   * @return the rendered side panel
   */

  getSidePanel({ closeSidePanel, popCache }) {
    const formatPrice = (price) => {
      return Number(price).toLocaleString();
    };

    return (
      <div className={`sidebar ${"open"}`}>
        <div className="sidebar-header">
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
              <FaTrainSubway /> Nearest Train: 3 min
            </p>
          </div>

          <div className="list-container">
            {this.nearestSchools.map((school, index) => {
              return (
                <div key={index} className="list-item">
                  {school.school_name}
                  <Bar value={this.getDistanceScore(school)} />
                </div>
              );
            })}
          </div>
          <div className="list-container">
            {this.nearestMRT.map((mrt, index) => {
              return (
                <div key={index} className="list-item">
                  {mrt.name}
                  <Bar value={this.getDistanceScore(mrt)} />
                </div>
              );
            })}
          </div>
          <div className="list-container">
            {this.nearestDengue.map((dengue, index) => {
              return (
                <div key={index} className="list-item">
                  {dengue.caseSize}
                  <Bar value={this.getDengueDistanceScore(dengue)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Hdb;
