import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import "./Filter.css";


function Filter({optionName="", optionList=[]}) {

  const [option, setOption] = useState("");

  return (
    <div>

      <select 
        className={`filter-button ${option ? 'filter-button-selected' : ''}`} 
        value={option} 
        onChange={()=>setOption(event.target.value)
      }> 
        <option value="" key="">{optionName}</option>
        {optionList.map((value, key)=> (<option key={key}>{value}</option>))}
      </select>
    </div>
  );
}

Filter.propTypes = {
  optionName: PropTypes.string,
  optionList: PropTypes.array,
}

export default Filter