import React from "react";
import AdminManager from "./AdminManager";
import { Link } from "react-router-dom";
import UsersList from "./UsersList";

function AdminHomePage() {
  return (
    <>
      <div>
        {" "}
        <p className="welcome-p">Welcome to Admin Home Page</p>
      </div>

      <div className="admin--register-link">
        <Link to="/admin_register">Register An Admin Here</Link>
      </div>

      <div>
        <AdminManager />
      </div>
      <div>
        <UsersList />
      </div>
    </>
  );
}

export default AdminHomePage;
