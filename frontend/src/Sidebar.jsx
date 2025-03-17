import "./Sidebar.css";
import { FaMosquito } from "react-icons/fa6";
import { FaTrainSubway } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaRestroom } from "react-icons/fa";
import { BsHouse } from "react-icons/bs";

function Sidebar({ isOpen, onClose, selectedHdb }) {
  if (!selectedHdb) return null;

  const formatPrice = (price) => {
   return Number(price).toLocaleString(); 
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        {/* Consider making this dynamic if you have images for each property */}
        {/*<img src="block426.jpeg" alt="Property" />*/}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="sidebar-content">
        <h2 className="rent-price">S${formatPrice(selectedHdb.resale_price)}</h2>
        <h5 className="property-name">{selectedHdb.address}</h5>
        <p className="sub-info">Lease remaining: {selectedHdb.remaining_lease}</p>

        <div className="property-details">
          <p><FaBed /> {selectedHdb.flat_type}</p>
          <p><BsHouse /> {selectedHdb.floor_area_sqm} m²</p>
          <p><FaRestroom /> Block: {selectedHdb.block}</p>
          <p><FaMosquito /> Dengue: 1000</p>
          <p><FaTrainSubway /> Nearest Train: 5 min</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
