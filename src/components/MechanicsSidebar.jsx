import React from "react";
import {
  BiHome,
  BiMessage,
  BiSolidReport,
  BiStats,
  BiHelpCircle,
} from "react-icons/bi";
import { FaDollarSign, FaStar, FaTools } from "react-icons/fa";
import "./MechanicsSidebar.css";

function MechanicsSidebar() {
  return (
    <div className="mechanic-menu">
      <div className="mechanic-menu--list">
        <a href="#" className="item active">
          <BiHome className="icon" />
          Dashboard
        </a>
        <a href="/mechanichomepage/services" className="item">
          <FaTools className="icon" />
          Add a Service
        </a>{" "}
        <a href="/mechanichomepage/chat" className="item">
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
