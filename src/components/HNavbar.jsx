import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./HNavbar.css";

function HNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
            to="/about"
            className="hnavbar__link"
            activeClassName="hnavbar__link--active"
          >
            About
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

        <li
          className="dropdown"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          <NavLink
            to="#"
            className="hnavbar__link"
            activeClassName="hnavbar__link--active"
          >
            Login
          </NavLink>
          {dropdownOpen && (
            <ul className="dropdown__menu">
              <li>
                <NavLink to="/user_login" className="dropdown__link">
                  User
                </NavLink>
              </li>
              <li>
                <NavLink to="/mechanic_login" className="dropdown__link">
                  Mechanic
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin_login" className="dropdown__link">
                  Admin
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default HNavbar;
