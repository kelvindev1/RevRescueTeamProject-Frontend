import React from "react";
import "./MechanicList.css";
import Image1 from "/src/assets/images/image.png";

const mechanics = [
  {
    image: Image1,
    name: "Mech.  Doe",
    cost: "50",
  },
  {
    image: Image1,
    name: "Mech.  Doe",
    cost: "50",
  },
  {
    image: Image1,
    name: "Mech.  Doe",
    cost: "50",
  },
  {
    image: Image1,
    name: "Mech.  Doe",
    cost: "50",
  },
];

function MechanicList() {
  return (
    <div className="mechanic--list">
      <div className="list--header">
        <h2>Mechanics</h2>
        <select>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
        </select>
      </div>
      <div className="list--container">
        {mechanics.map((mechanic, index) => (
          <div key={index} className="list">
            <div className="mechanic--detail">
              <img src={mechanic.image} alt={mechanic.name} />
              <h2>{mechanic.name}</h2>
            </div>
            <span>${mechanic.cost}/hr</span>
            <span className="mechanic--todo"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MechanicList;
