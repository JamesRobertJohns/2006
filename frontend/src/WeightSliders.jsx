import React, { useState } from "react";

const WeightSliders = ({ weights, onChange }) => {
  const [localWeights, setLocalWeights] = useState(weights);

  const handleChange = (key, value) => {
    const newWeights = { ...localWeights, [key]: parseFloat(value) };
    setLocalWeights(newWeights);
    onChange(newWeights);
  };

  return (
    <div style={{ padding: "1rem", width: "320px" }}>
      {Object.keys(localWeights).map((key) => (
        <div
          key={key}
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          <label style={{ marginBottom: "0.25rem" }}>
            {key.toUpperCase()} ({localWeights[key]})
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={localWeights[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            style={{
              width: "100%",
              height: "6px",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default WeightSliders;
