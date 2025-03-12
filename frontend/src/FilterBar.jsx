import React, { useState } from 'react';
import Filter from "./Filter/Filter.jsx";

function FilterBar() {

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

  return (
      <div className='filter-bar-box'>
        <Filter optionName="Region" optionList={regionList} />
        <Filter optionName="Price Range" optionList={priceRangeList}/>
        <Filter optionName="Room Type" optionList={roomTypeList} />
        <Filter optionName="Lease Life" optionList={leaseLifeList} />
      </div>
  );
}

export default FilterBar;