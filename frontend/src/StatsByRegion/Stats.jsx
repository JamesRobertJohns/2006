import { useState, useEffect }  from "react";
import loadRegions from "./loadRegions.js";

function Stats() {
  const region = loadRegions(); // this is a map of all the flats in each region
  console.log(region.north[0]);
  return (
    <>
    </>
  );
};

export default Stats;
