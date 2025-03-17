import { Marker } from "react-map-gl/maplibre";
import { IoArrowBackSharp } from "react-icons/io5";
import { IoSchoolOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { TbWorld } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { PiTrainBold } from "react-icons/pi";
import { BsFillBusFrontFill } from "react-icons/bs";

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
        address,
        postal_code,
        url_address,
        contact_number,
        school_email,
        nearest_mrt,
        bus_services,
        latitude,
        longitude
    ) {
        this.school_name = school_name;
        this.address = address;
        this.postal_code = postal_code;
        this.url_address = url_address;
        this.contact_number = contact_number;
        this.school_email = school_email;
        this.nearest_mrt = nearest_mrt;
        this.bus_services = bus_services;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getSchoolName() {
        return this.school_name;
    }

    getAddress() {
        return this.address;
    }

    getPostalCode() {
        return this.postal_code;
    }

    getURLAddress() {
        return this.url_address;
    }

    getContactNumber() {
        return this.contact_number;
    }

    getSchoolEmail() {
        return this.school_email;
    }

    getNearestMRT() {
        return this.nearest_mrt;
    }

    getBusServices() {
        return this.bus_services;
    }
    
    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }

    getSchoolMapIcon({pushCache}) {
        return (
            <Marker 
            school_name={this.school_name}
            latitude={this.latitude} 
            longitude={this.longitude}
            cursor="pointer"
            onClick={(e) => {
                e.originalEvent.stopPropagation();
                pushCache(this);
            }}
            >
                <div style={styles.iconContainer}>
                <IoSchoolOutline cursor="pointer" size={22} style={styles.icon}/>
                </div>
            </Marker>
        )
    }

    getSidePanel({clearCache, popCache}) {
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
                    <button className = "close-btn"
                    onClick={() => {
                        clearCache();
                    }}
                    >
                        ✕
                    </button>
                </div>
                <div className="sidebar-content">
                    <h2 className="school-name">{this.school_name}</h2>
                    <h5 className="school-address">{this.address}</h5>
                    <h5 className="school-postal-code">{this.postal_code}</h5>

                    <div className="school-details">
                        <p>
                            <FaPhone /> {this.contact_number}
                        </p>
                        <p>
                            <TbWorld /> <Link to ={this.url_address}>{this.url_address}</Link>
                        </p>
                        <p>
                            <MdEmail /> {this.school_email}
                        </p>
                        <p>
                            <PiTrainBold /> {this.nearest_mrt}
                        </p>
                        <p>
                            <BsFillBusFrontFill /> {this.bus_services}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default School;

