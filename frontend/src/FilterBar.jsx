import React, { useState } from 'react';
import Filter from "./Filter/Filter.jsx";

function FilterBar() {
  const regionList = ["Central", "East", "North", "North-East", "West"];
  const roomTypeList = ["Two-Room", "Three-Room", "Four-Room", "Five-Room", "Executive"];
  const priceRangeList = ["Dummy1", "Dummy2","Dummy3", "Dummy4"];
  const leaseLifeList = ["Dummy1", "Dummy2","Dummy3", "Dummy4"];

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
