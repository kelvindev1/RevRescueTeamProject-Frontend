import React from "react";
import { Link } from "react-router-dom";
import { FaCar } from "react-icons/fa";

function MechanicHomePageNavbar() {
  return (
    <>
      <div className="navbar-header-container">
        <div className="car-logo">
          <FaCar className="car-logo-icon" />
          <h3>RevRescue</h3>
        </div>
        <div
          className="mechanic-homepage-navbar-container"
          style={{
            margin: "15px",
            justifyContent: "space-between",
            textAlign: "right",
          }}
        >
          About
          <Link
            to={"/"}
            style={{
              margin: "10px",
              padding: "4px",
              textDecoration: "none",
              fontSize: "20px",
            }}
          >
            logout
          </Link>
        </div>
      </div>
    </>
  );
}

export default MechanicHomePageNavbar;
