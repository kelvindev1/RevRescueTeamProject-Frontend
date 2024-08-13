import React from "react";
import { Link } from "react-router-dom";

function AdminHomePageNavbar() {
  return (
    <div
      className="admin-homepage-navbar-container"
      style={{
        justifyContent: "space-between",
        textAlign: "right",
      }}
    >
      <Link
        to={"/"}
        style={{
          margin: "10px",
          padding: "4px",
          textDecoration: "none",
          fontSize: "20px",
        }}
      >
        Logout
      </Link>
    </div>
  );
}

export default AdminHomePageNavbar;
