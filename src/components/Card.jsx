import React from "react";
import { FaCarBattery, FaWrench, FaLifeRing } from "react-icons/fa";

const services = [
  {
    title: "Car Wiring",
    icon: <FaCarBattery />,
  },
  {
    title: "Engine Repair",
    icon: <FaWrench />,
  },
  {
    title: "Tyres",
    icon: <FaLifeRing />,
  },
];

function Card() {
  return (
    <div className="card-container">
      {services.map((item, index) => (
        <div className="card" key={index}>
          <div className="card--cover">{item.icon}</div>
          <div className="card--title">
            <h3>{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;