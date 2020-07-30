import React from "react";
import Chip from "@material-ui/core/Chip";

const TemperamentList = ({ temperament = '' }) => {
  const temperaments = temperament.split(",");
  return (
    <div style={{ marginTop: 20 }}>
      {temperaments?.map((item) => {
        return (
          <Chip
            label={item.trim()}
            variant="outlined"
            key={item}
            style={{ marginBottom: 6, marginRight: 6 }}
          />
        );
      })}
    </div>
  );
};


export default TemperamentList;