import { useState } from 'react'
import './App.css'
import Map from "react-map-gl/maplibre";


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Map
      style={{ width: '100vw', height: '100vh' }}
      maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
      mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Grey.json"
    />
  </div>
  );
}

export default App
