import React from "react";

const Bar = ({ current, max }) => {
  const percentage = (current / max) * 100;
  const fillColor =
    percentage > 50 ? "green" : percentage > 20 ? "orange" : "red";

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.fill,
          width: `${percentage}%`,
          backgroundColor: fillColor,
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    width: "200px",
    height: "20px",
    backgroundColor: "#ddd",
    borderRadius: "6px",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    transition: "width 0.3s ease",
  },
};

export default Bar;
