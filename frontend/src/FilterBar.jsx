import React, { useState } from 'react';
import Filter from "./Filter/Filter.jsx";
import { useNavigate } from "react-router-dom";

function FilterBar() {
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('\map');
  };

  const regionList = [
    "Central", 
    "East", 
    "North", 
    "North-East", 
    "West"
  ];

  const roomTypeList = [
    "Two-Room", 
    "Three-Room", 
    "Four-Room", 
    "Five-Room", 
    "Executive"
  ];

  const priceRangeList = [
    "S$200,000 - 299,999", 
    "S$300,000 - 399,999",
    "S$400,000 - 499,999", 
    "S$500,000 - 599,999", 
    "S$600,000 - 699,999", 
    "S$700,000 - 799,999", 
    "S$800,000 - 899,999",
    "S$900,000 - 999,999",
  ];

  const leaseLifeList = [
    "20 - 29 yr",
    "29 - 39 yr", 
    "41 - 49 yr",
    "51 - 59 yr",
    "61 - 69 yr",
    "71 - 79 yr",
    "80 - 89 yr",
    "90 - 99 yr",
  ];

  // the filters are set to display default OptionName
  // if the values are set to NULL
  const [selected, setSelected] = useState({
    region: "",
    priceRange: "",
    roomType: "",
    leaseLife: "",
  });

 
  // updates the key value pair
  const handleSelectChange = (filter, option) => {
    setSelected((s) => ({
      ...s,
      [filter]: option,
    }));
  };

  // so long as it contains empty string, then
  // not all options are selected
  const isAllSelected = !Object.values(selected).includes("");

  return (
    <>
      <div className='filter-bar-box'>

        <Filter 
          optionName="Region" 
          optionList={regionList} 
          option={selected.region}
          onChange={(value) => handleSelectChange("region", value)}
        />

        <Filter 
          optionName="Price Range" optionList={priceRangeList}
          option={selected.priceRange}
          onChange={(value) => handleSelectChange("priceRange", value)}
        />

        <Filter 
          optionName="Room Type" 
          optionList={roomTypeList}
          option={selected.roomType}
          onChange={(value) => handleSelectChange("roomType", value)}
        />

        <Filter 
          optionName="Lease Life" 
          optionList={leaseLifeList}
          option={selected.leaseLife}
          onChange={(value) => handleSelectChange("leaseLife", value)}
        />

      </div>

      <div className='search-button-box'>
          <button 
            className={`button ${isAllSelected? 'active':'disabled'}`}
            onClick={handleSearch}
            disabled={!isAllSelected}
        >
            Find 
          </button>
      </div>

    </>
  );
}

export default FilterBar;
