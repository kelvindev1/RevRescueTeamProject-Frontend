import React from "react";
import { Link } from "react-router-dom";
import "./UserSidebar.css";
import { BiHome, BiMessage, BiSolidReport, BiHelpCircle } from "react-icons/bi";
import { FaWrench, FaStar } from "react-icons/fa";

function UserSidebar() {
  return (
    <div className="menu">
      <div className="menu--list">
        <a href="#" className="item active">
          <BiHome className="icon" />
          Dashboard
        </a>
        <a href="/home/services" className="item">
          <FaWrench className="icon" />
          Services
        </a>{" "}
        <a href="/home/requests" className="item">
          <BiMessage className="icon" />
          Messages
        </a>
        <a href="/home/reviews" className="item">
          <FaStar className="icon" />
          Review
        </a>
        <a href="/home/report" className="item">
          <BiSolidReport className="icon" />
          Report
        </a>{" "}
        <a href="/home/help" className="item">
          <BiHelpCircle className="icon" />
          Help
        </a>
      </div>
    </div>
  );
}

export default UserSidebar;
