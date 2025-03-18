import { useState } from "react";
import HDBContext from "./HDBContext.jsx";

const HDBProvider = ({ children }) => {
  const [filteredHdbs, setFilteredHdbs] = useState([]);

  return (
    <HDBContext.Provider value={{ filteredHdbs, setFilteredHdbs }}>
      {children}
    </HDBContext.Provider>
  );
};

export default HDBProvider;
