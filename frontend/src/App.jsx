import './App.css'
import Map from "react-map-gl/maplibre";
import DropDownMenu from './dropdownMenu';
import RegionalMap from './RegionalMap';

function App() {
  return (
    
    <div>
      <progressBar />
      <DropDownMenu />
      <RegionalMap />
      <Map
      style={{ width: '75vw', height: '75vh' }}
      maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
      mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Grey.json"
    />
  </div>
  );
}

export default App