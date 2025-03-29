import { useState, useEffect } from "react";
import Chart from 'react-apexcharts'; 
import { loadRegions } from './loadRegions.js';
import "./Stats.css";

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


  const getPriceStats = (region, room) => {
    const array = [];
    region.forEach((item) => {
      if (item.flat_type === room) {
        array.push(item.resale_price)
      }
    });

    array.sort((a,b) => a - b);

    const getMedian = (array) => {
      const mi = Math.floor(array.length/2);
      return (array.length % 2 == 0)? (array[mi-1]+array[mi])/2 : array[mi];
    };

    const getQuartile = (arr, q) => {
      const mid = Math.floor(arr.length / 2);
      const lowerHalf = arr.slice(0, mid);
      const upperHalf = arr.slice(arr.length % 2 === 0 ? mid : mid + 1);

      return q === 1 ? getMedian(lowerHalf) : getMedian(upperHalf);
    };

    const q2 = getMedian(array);
    const q1 = getQuartile(array, 1);
    const q3 = getQuartile(array, 3);
    const IQR = q3 - q1;


    const lo = array.find(x => x >= q1 - 1.5 * IQR) || array[0];
    const hi = array.slice().reverse().find(x => x <= q3 + 1.5 * IQR) || array[array.length - 1];

    return {lo, q1, q2, q3, hi};
  };



  const drawPriceDistributionGraph = (room) => {

    const dataContainer = {
      'north': null,
      'central': null,
      'west': null,
      'east': null,
      'northEast': null
    }


    Object.keys(dataContainer).forEach(region => {
      dataContainer[region] = getPriceStats(regions[region], room);
    });

    const boxPlotData = Object.keys(dataContainer).map(region => {
      const stats = dataContainer[region];
      return {
        x: region,
        y: [stats.lo, stats.q1, stats.q2, stats.q3, stats.hi]
      };
    });

    const options = {
      chart: {
        type: 'boxPlot',
        height: 350,
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: '#2F3C7E',
            lower: '#FBEAEB'
          },
        },
      },
      title: {
        text: `Price Distribution for ${room} Flats`,
        align: 'center',
      },
      xaxis: {
        categories: Object.keys(dataContainer) 
      },
    };

    return {options: options, data: boxPlotData}
  };


  const [room, setRoom] = useState("2 ROOM"); 
  const [opt, setOpt] = useState({});
  const [data, setData] = useState([]); 

  useEffect(() => {
    const { options, data } = drawPriceDistributionGraph(room);
    setOpt(options);
    setData(data);
  }, [room, regions]);

  const handleRoomChange = (room) => {
    setRoom(room);
  };
  

  return (
    <>
      <div className="room-type-button-container">
        <button onClick={() => handleRoomChange("2 ROOM")}>2 Room</button>
        <button onClick={() => handleRoomChange("3 ROOM")}>3 Room</button>
        <button onClick={() => handleRoomChange("4 ROOM")}>4 Room</button>
        <button onClick={() => handleRoomChange("5 ROOM")}>5 Room</button>
        <button onClick={() => handleRoomChange("EXECUTIVE")}>Executive</button>

      </div>
      <div className="boxplot">
        <Chart
          options={opt}
          series={[{data: data}]}
          type="boxPlot"
          height={450}
        />
      </div>
    </>
  );
}export default Stats;
