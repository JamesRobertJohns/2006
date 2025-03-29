import { useState, useEffect } from "react";
import Chart from 'react-apexcharts'; 
import { loadRegions } from './loadRegions.js';

function Stats() {
  const regions = loadRegions(); // this is a custom 'hook'

  const avg = (flatArray) => {
    if (!flatArray || flatArray.length === 0) return 0;
    let sum = 0;
    flatArray.forEach((item) => {
      sum += parseFloat(item.resale_price);  
    });
    return (sum / flatArray.length).toFixed(2);
  };

  const [state, setState] = useState({
    series: [
      {
        name: "box",
        type: "boxPlot",
        data: [
          {
            x: "Alice",
            y: [42, 55, 60, 68, 80],
          },
          {
            x: "Bob",
            y: [35, 50, 58, 65, 75],
          },
          {
            x: "Charlie",
            y: [30, 45, 50, 60, 70],
          },
          {
            x: "David",
            y: [50, 60, 65, 72, 85],
          },
          {
            x: "Emma",
            y: [40, 52, 57, 63, 78],
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "boxPlot",
        height: 350,
      },
      colors: ["#008FFB"],
      title: {
        text: "Random Box Plot Chart",
        align: "left",
      },
      xaxis: {
        type: "category",
      },
    },
  });

  return (
    <>
      <Chart options={state.options} series={state.series} type="boxPlot" height={350} />
    </>
  );}

export default Stats;
