import React from "react";
import "./UserSidebar.css";
import {
  BiHome,
  BiMessage,
  BiSolidReport,
  BiStats,
  BiHelpCircle,
} from "react-icons/bi";
import { FaCar, FaWrench } from "react-icons/fa";

function UserSidebar() {
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
          <FaWrench className="icon" />
          Service
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
          <BiMessage className="icon" />
          Message
        </a>
        <a href="#" className="item">
          <BiHelpCircle className="icon" />
          Help
        </a>
      </div>
    </div>
  );
}

export default UserSidebar;
