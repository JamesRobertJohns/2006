import "./App.css";
import DynamicMap from "./DynamicMap.jsx";

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
  return <DynamicMap />;
}

export default App;
