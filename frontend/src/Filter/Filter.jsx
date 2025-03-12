import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import "./Filter.css";


function Filter({optionName="", optionList=[], option, onChange}) {

  return (
    <>
      <select 
        className={`filter-button ${option ? 'filter-button-selected' : ''}`} 
        value={option} 
        onChange={()=>onChange(event.target.value)
      }> 
        <option value="" key="">{optionName}</option>
        {optionList.map((value, key)=> (<option key={key}>{value}</option>))}
      </select>
    </>
  );
}

Filter.propTypes = {
  optionName: PropTypes.string,
  optionList: PropTypes.array,
}

export default Filter