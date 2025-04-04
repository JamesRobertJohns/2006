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
const primaryColor = "#2D4059";
import Chart from 'react-apexcharts'; 

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


  drawPriceDistributionGraph(flats) {

    const getPriceStats = (flats) => {
      let array = [];
      for (let i = 0; i < flats.length; i++) {
        array.push(Number(flats[i].resale_price));
      }
      array.sort((a,b) => a - b);
      const getMedian = (array) => {
        const mi = Math.floor(array.length/2);
        return (array.length % 2 == 0)? (array[mi-1]+array[mi])/2 : array[mi];
      };
      const getQuartile = (arr, q) => {
        const mid = Math.floor(arr.length / 2);
        const lowerHalf = arr.slice(0, mid);
        const upperHalf = arr.slice(arr.length % 2 === 0 ? mid : mid + 1);
        return q === 1 ? getMedian(lowerHalf) : getMedian(upperHalf);
      };
      const q2 = getMedian(array);
      const q1 = getQuartile(array, 1);
      const q3 = getQuartile(array, 3);
      const IQR = q3 - q1;
      const lo = array.find(x => x >= q1 - 1.5 * IQR) || array[0];
      const hi = array.slice().reverse().find(x => x <= q3 + 1.5 * IQR) || array[array.length - 1];
      console.log(array);
      return {lo, q1, q2, q3, hi};
    };

    const stats = getPriceStats(flats); 

    const boxplotData = {
      x: 'Price',
      y: [stats.lo, stats.q1, stats.q2, stats.q3, stats.hi],
      goals: [
        {
          value: this.resale_price,
          strokeWidth: 10,
          strokeHeight: 0,
          strokeLineCap: 'round',
          strokeColor: '#F283B6',
        } 
      ]
    }

    const options = {
      chart: {
        type: 'boxPlot',
        height: 150,
        width: '80%',
        toolbar: {
          show: false
        }
      },
      title: {
        text: 'Price Distribution',
        align: 'left',
        style: {
          fontSize: '0' 
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '40%'
        },
        boxPlot: {
          colors: {
            upper: '#B6C454',
            lower: '#EDBFB7'
          }
        }
      },
      stroke: {
        colors: ['#333']
      }
    };
    return {data: boxplotData, opt: options}
  };


  /**
   * Renders side panel by creating <div> and <p> elements
   *
   * @param {function} closeSidePanel
   * @para {function} popCache
   * @description loads relevant attributes from HDB objects
   * @return the rendered side panel
   */
  getSidePanel({ closeSidePanel, popCache, filteredHdbs }) {

    const formatPrice = (price) => {
      return Number(price).toLocaleString();
    };

    const { data, opt } = this.drawPriceDistributionGraph(filteredHdbs || []);

    return (
      <>

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
                <FaTrainSubway /> Nearest Train: 5 min
              </p>
            </div>
          </div>


          <div className="boxplot">
            <Chart
              options={opt}
              series={[{ data: [data] }]} 
              type="boxPlot"
              height={150}
            />
          </div>



        </div>
      </>
    );
  }
}

export default Hdb;
