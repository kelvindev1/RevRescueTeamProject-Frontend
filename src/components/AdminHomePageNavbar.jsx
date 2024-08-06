import React from "react";
import { Link } from "react-router-dom";

function AdminHomePageNavbar() {
  return (
    <div
      className="admin-homepage-navbar-container"
      style={{
        margin: "15px",
        justifyContent: "space-between",
        textAlign: "right",
      }}
    >
      <Link
        to={"/admin_register"}
        style={{
          margin: "10px",
          padding: "4px",
          textDecoration: "none",
          fontSize: "20px",
        }}
      >
        Register An Admin
      </Link>
      <Link
        to={"/adminhomepage/admins"}
        style={{
          margin: "10px",
          padding: "4px",
          textDecoration: "none",
          fontSize: "20px",
        }}
      >
        Admins
      </Link>
      <Link
        to={"/adminhomepage/users"}
        style={{
          border: "",
          margin: "20px",
          padding: "20px",
          textDecoration: "none",
          fontSize: "20px",
        }}
      >
        Users
      </Link>
      <Link
        to={"/adminhomepage/mechanics"}
        style={{
          margin: "10px",
          padding: "4px",
          textDecoration: "none",
          fontSize: "20px",
        }}
      >
        Mechanics
      </Link>
      <Link
        to={"/adminhomepage/reviews"}
        style={{
          margin: "10px",
          padding: "4px",
          textDecoration: "none",
          fontSize: "20px",
        }}
      >
        Reviews
      </Link>
    </div>
  );
}

export default AdminHomePageNavbar;
