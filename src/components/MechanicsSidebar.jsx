import React from "react";
import {
  BiHome,
  BiMessage,
  BiSolidReport,
  BiStats,
  BiHelpCircle,
} from "react-icons/bi";
import { FaCar, FaDollarSign, FaStar, FaBell } from "react-icons/fa";

function MechanicsSidebar() {
  return (
    <div className="menu">
      <div className="logo">
        <FaCar className="logo-icon" />
        <h2>RevRescue</h2>
      </div>

      <div className="menu--list">
        <a href="#" className="item active">
          <BiHome className="icon" />
          Dashboard
        </a>
        <a href="#" className="item">
          <BiMessage className="icon" />
          Message
        </a>
        <a href="" className="item">
          <FaDollarSign className="icon" />
          Payments
        </a>
        <a href="/mechanichomepage/reviews" className="item">
          <FaStar className="icon" /> Reviews
        </a>
        <a href="#" className="item">
          <FaBell className="icon" />
          Notifications
        </a>{" "}
        <a href="#" className="item">
          <BiSolidReport className="icon" />
          Report
        </a>{" "}
        <a href="#" className="item">
          <BiStats className="icon" />
          Stats
        </a>
        <a href="#" className="item">
          <BiHelpCircle className="icon" />
          Help
        </a>
      </div>
    </div>
  );
}

export default MechanicsSidebar;