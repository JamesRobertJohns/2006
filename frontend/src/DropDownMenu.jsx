import { useState } from "react";
import "./DropDownMenu.css";

const DropDownMenu = () => {
  const [showRegion, setShowRegion] = useState(false);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [showRoomType, setShowRoomType] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [leaseLife, setLeaseLife] = useState(0);
  const [progress, setProgress] = useState(0);

  const updateProgress = (categoryCompleted) => {
    if (!categoryCompleted) {
      setProgress((prev) => Math.min(prev + 25, 100)); // Prevents overflow 100%
    }
  };

  const handleRegionSelect = (region) => {
    if (!selectedRegion) updateProgress(selectedRegion);
    setSelectedRegion(region);
    setShowRegion(false);
  };

  const handleRoomTypeSelect = (roomType) => {
    if (!selectedRoomType) updateProgress(selectedRoomType);
    setSelectedRoomType(roomType);
    setShowRoomType(false);
  };

  const handlePriceRangeChange = (event) => {
    if (!priceRange) updateProgress(priceRange);
    setPriceRange(event.target.value);
  };

  const handleLeaseLifeChange = (event) => {
    if (!leaseLife) updateProgress(leaseLife);
    setLeaseLife(event.target.value);
  };

  return (
    <div className="dropDownMenu">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>

      {/* Region Selection */}
      <div className="dropdown">
        <button
          className="dropbtn"
          style={{ backgroundColor: selectedRegion ? "#3e8e41" : "#04AA6D" }}
          onClick={() => setShowRegion(!showRegion)}
        >
          {selectedRegion || "Region"}
        </button>
        {showRegion && (
          <div className="dropdown-content">
            <button onClick={() => handleRegionSelect("SouthWest")}>SouthWest</button>
            <button onClick={() => handleRegionSelect("NorthWest")}>NorthWest</button>
            <button onClick={() => handleRegionSelect("Central")}>Central</button>
            <button onClick={() => handleRegionSelect("Northeast")}>Northeast</button>
            <button onClick={() => handleRegionSelect("Southwest")}>Southwest</button>
          </div>
        )}
      </div>

      {/* Room Type Selection */}
      <div className="dropdown">
        <button
          className="dropbtn"
          style={{ backgroundColor: selectedRoomType ? "#3e8e41" : "#04AA6D" }}
          onClick={() => setShowRoomType(!showRoomType)}
        >
          {selectedRoomType || "Room Type"}
        </button>
        {showRoomType && (
          <div className="dropdown-content">
            <button onClick={() => handleRoomTypeSelect("Two-Room Flexi Flat")}>Two-Room Flexi Flat</button>
            <button onClick={() => handleRoomTypeSelect("Three-Room Flat")}>Three-Room Flat</button>
            <button onClick={() => handleRoomTypeSelect("Four-Room Flat")}>Four-Room Flat</button>
            <button onClick={() => handleRoomTypeSelect("Five-Room Flat")}>Five-Room Flat</button>
            <button onClick={() => handleRoomTypeSelect("Executive Flat")}>Executive Flat</button>
          </div>
        )}
      </div>

      {/* Price Range Selection */}
      <div className="dropdown">
        <button
          className="dropbtn"
          style={{ backgroundColor: showPriceRange ? "#3e8e41" : "#04AA6D" }}
          onClick={() => setShowPriceRange(!showPriceRange)}
        >
          Price Range
        </button>
        {showPriceRange && (
          <div className="dropdown-contentPRLL">
            <label htmlFor="priceRange">Price Range: ${priceRange}</label>
            <input
              type="range"
              id="priceRange"
              min="100"
              max="10000000"
              step="50"
              value={priceRange}
              onChange={handlePriceRangeChange}
              className="slider"
            />
          </div>
        )}
      </div>

      {/* Lease Life Selection */}
      <div className="dropdown">
        <button className="dropbtn">Lease Life</button>
        <div className="dropdown-contentPRLL">
          <input
            type="range"
            id="leaseLife"
            min="1"
            max="100"
            step="1"
            value={leaseLife}
            onChange={handleLeaseLifeChange}
            className="slider"
          />
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
