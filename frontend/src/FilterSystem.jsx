import { useState, useMemo, useEffect, useContext } from 'react';
import Filter from "./Filter/Filter.jsx";
import { useNavigate } from "react-router-dom";
import Hdb from "./classes/Hdb.jsx";
import TownToRegionMap from "./TownToRegion.json";
import DynamicMap from "./DynamicMap.jsx"; 
import HDBContext from "./HDBContext.jsx";

function FilterSystem() {
   const { filteredHdbs, setFilteredHdbs } = useContext(HDBContext);
  const [allHdbs, setAllHdbs] = useState([]); 

  useEffect(() => {
    const fetchHdbs = async () => {
      try {
        const response = await fetch("./hdb.json");
        const data = await response.json();
        const hdbs = data.map((item, index) => {
          const hdb = new Hdb(
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
          hdb.key = `${index}`;
          return hdb;
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
    "199,999 and below",
    "200,000 - 299,999", 
    "300,000 - 399,999",
    "400,000 - 499,999", 
    "500,000 - 599,999", 
    "600,000 - 699,999", 
    "700,000 - 799,999", 
    "800,000 - 899,999",
    "900,000 - 999,999",
    "1,000,000 and above",
  ];

  const leaseLifeList = [
    "40 - 49",
    "50 - 59",
    "60 - 69",
    "70 - 79",
    "80 - 89",
    "90 - 99",
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


  /**
   * filter logic using memoization
   *
   * hdb.town should be in uppercase, see json
   * im not sure if i captured all the towns 
   * in any case uncaptured towns will be empty
   *
   * dependency list only have selected options array
   * our hdb json is static
   *
   * similarly, flatType from json are all upper case
   *
   * filtering of lease life will only use the years
   * i.e. round down to year, discard months
  */
  useEffect(() => {
    let filtered = allHdbs;

    if (selected.region) {
      filtered = filtered.filter(
        (hdb) => {
          const region = TownToRegionMap[hdb.town] || "";
          return region === selected.region;
        }
      );
    }

    if (selected.roomType) {
      filtered = filtered.filter(
        (hdb) => {
          const roomType = hdb.getFlatType();
          return roomType === selected.roomType.toUpperCase();
        }
      );
    }

    /**
     * e.g.
     * 40 - 49
     */
    if (selected.leaseLife) {
      let lowerbound = Number(selected.leaseLife.split(" ")[0]);
      let upperbound = Number(selected.leaseLife.split(" ")[2]);
      filtered = filtered.filter(
        (hdb) => {
          const leaseLife = Number(hdb.getLeaseLife().split(" ")[0]);             
          return leaseLife >= lowerbound && leaseLife <= upperbound;
        }
      );
    }

   /**
    * e.g.
    * 200,000 - 210,000
    * two extreme options
    * 199,999 and below
    * 1,000,000 and above
    * there shouldnt be many people requiring them
    * troublesome to separate until so granular
    *
    * note that in json reslae price is in XXXX.0
    *
    */

    if (selected.priceRange) {
      let lowerbound = Number(selected.priceRange.split(" ")[0].replace(/,/g, ""));
      let upperbound = selected.priceRange.split(" ")[2];
      if (upperbound === "below") {
        filtered = filtered.filter(
          (hdb) => {
           return Number(hdb.getPrice()) <= lowerbound; 
          }
        );
      }
      else if (upperbound === "above") {
        filtered = filtered.filter(
          (hdb) => {
             return Number(hdb.getPrice()) >= lowerbound; 
          }
        );
      }
      else {
        upperbound = Number(upperbound.replace(/,/g, ""));
        filtered = filtered.filter(
          (hdb) => {
            const price = Number(hdb.getPrice());             
            return price >= lowerbound && price <= upperbound; 
          }
        );

      }
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
          optionName="Price Range (S$)" optionList={priceRangeList}
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
          optionName="Lease Life (Yr)" 
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

export default FilterSystem;
