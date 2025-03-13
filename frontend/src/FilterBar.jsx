import React, { useState, useMemo, useEffect } from 'react';
import Filter from "./Filter/Filter.jsx";
import { useNavigate } from "react-router-dom";
import Hdb from "./classes/Hdb.jsx";
import TownToRegionMap from "./TownToRegion.json";

function FilterBar() {

  const [allHdbs, setAllHdbs] = useState([]); 
  const [filteredHdbs, setFilteredHdbs] = useState([]); 


  useEffect(() => {
    const fetchHdbs = async () => {
      try {
        const response = await fetch("./hdb.json");
        const data = await response.json();
        const hdbs = data.map((item) => {
          return new Hdb(
            item.month,
            item.town,
            item.flat_type,
            item.block,
            item.street_name,
            item.storey_range,
            item.floor_area_sqm,
            item.flat_model,
            item.lease_commence_date,
            item.remaining_lease,
            item.resale_price,
            item.address,
            item.latitude,
            item.longitude
          );
        });
        setAllHdbs(hdbs); 
        setFilteredHdbs(hdbs); 
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchHdbs();
  }, []);

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
    "2 Room", 
    "3 Room", 
    "4 Room", 
    "5 Room", 
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

  // hdb.town should be in uppercase, see json
  useMemo(() => {
    let filtered = allHdbs;

    if (selected.region) {
      filtered = filtered.filter((hdb) => {
        const region = TownToRegionMap[hdb.town] || "";
        return region === selected.region;
      });
    }
    setFilteredHdbs(filtered);
  }, [selected, allHdbs]);

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
          optionName="Flat Type" 
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

      <div className='house-count'>
        <h1>{filteredHdbs.length.toLocaleString()}</h1>
        <p>Flats Available</p>
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
