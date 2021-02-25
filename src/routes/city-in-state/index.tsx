import React from "react";
import City from "../city";
import State from "../state";

function CityInState() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <City />
      <State />
    </div>
  );
}

export default CityInState;
