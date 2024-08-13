import React from "react";
import AdminHomePageNavbar from "./AdminHomePageNavbar";
import AdminSidebar from "./AdminSidebar";
import "./AdminHomePage.css";
import AdminContent from "./AdminContent";

function AdminHomePage() {
  return (
    <>
      <div>
        <AdminHomePageNavbar />
      </div>
      <div className="mechanic__dashboard">
        <div className="mechanic__sidebar">
          <AdminSidebar />
        </div>
        <div className="dashboard-mechanic-content">
          <AdminContent />
        </div>
      </div>
    </>
  );
}

export default AdminHomePage;
