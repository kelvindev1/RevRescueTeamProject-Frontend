import React from "react";
import { NavLink } from "react-router-dom";
import "./HNavbar.css";

function HNavbar() {
  return (
    <nav className="hnavbar">
      <div className="hnavbar__logo">
        <NavLink to="/" className="hnavbar__link">
          YourLogo
        </NavLink>
      </div>
      <ul className="hnavbar__menu">
        <li>
          <NavLink
            to="/home"
            className="hnavbar__link"
            activeClassName="hnavbar__link--active"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="hnavbar__link"
            activeClassName="hnavbar__link--active"
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/services"
            className="hnavbar__link"
            activeClassName="hnavbar__link--active"
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="hnavbar__link"
            activeClassName="hnavbar__link--active"
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HNavbar;
