import React from "react";
import {
  FaStar,
  FaUsers,
  FaCog,
  FaTools,
  FaUserShield,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { BiStats } from "react-icons/bi";
import "./AdminSidebar.css";

function AdminSidebar() {
  return (
    <div className="admin-sidebar-menu">
      <div className="admin-sidebar-menu-list">
        <a href="/admin_register" className="item active">
          <FaCog className="icon" />
          Register
        </a>
        <a href="/adminhomepage/admins " className="item">
          <FaUserShield className="icon" />
          Admins
        </a>
        <a href="/adminhomepage/users" className="item">
          <FaUsers className="icon" />
          Users
        </a>
        <a href="/adminhomepage/mechanics" className="item">
          <FaTools className="icon" />
          Mechanics
        </a>
        <a href="/adminhomepage/notifications" className="item">
          <FaRegQuestionCircle className="icon" />
          Requests
        </a>
        <a href="/adminhomepage/reviews" className="item">
          <FaStar className="icon" />
          Reviews
        </a>
        <a href="/home/stats" className="item">
          <BiStats className="icon" />
          Stats
        </a>
      </div>
    </div>
  );
}

export default AdminSidebar;
