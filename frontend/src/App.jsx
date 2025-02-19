import './App.css'
import Map from "react-map-gl/maplibre";
import RegionalMap from './RegionalMap';
import Filter from "./Filter/Filter.jsx";
import ProgressBar from "./ProgressBar/ProgressBar.jsx";
import FilterBar from "./FilterBar.jsx";

function App() {
  
  return (
    <>
      <FilterBar />
      <br/>
      <div className="static-map-box">
        <RegionalMap/>
      </div>
    </>
  );
}

export default App
