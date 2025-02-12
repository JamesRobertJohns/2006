import Map from "react-map-gl/maplibre";


function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
      style={{ width: '100%', height: '100%' }}
      maxBounds={[103.596, 1.1443, 104.1, 1.4835]}
      mapStyle="https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json"
    />
  </div>
  );
}

export default App
