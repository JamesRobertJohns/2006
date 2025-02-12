import React, { useState } from 'react';
import Filter from "./Filter/Filter.jsx";

function FilterBar() {
  const regionList = ["Central", "East", "North", "North-East", "West"];
  const roomTypeList = ["Two-Room", "Three-Room", "Four-Room", "Five-Room", "Executive"];

  return (
      <div className='filter-bar-box'>
        <Filter optionName="Region" optionList={regionList} />
        <Filter optionName="Price Range" />
        <Filter optionName="Room Type" optionList={roomTypeList} />
        <Filter optionName="Lease Life" />
      </div>
  );
}

export default FilterBar;
