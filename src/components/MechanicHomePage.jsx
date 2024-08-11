import React from "react";
import MechanicHomePageNavbar from "./MechanicHomePageNavbar";
import MechanicsSidebar from "./MechanicsSidebar";
import "./MechanicHomepage.css";
import MechanicContent from "./MechanicContent";
import UserProfile from "./UserProfile";

function MechanicHomePage() {
  return (
    <>
      <MechanicHomePageNavbar />
      <div className="mechanic-dashboard">
        <div className="Mechanic-sidebar">
          <MechanicsSidebar />
        </div>
        <div className="dashboard--contents">
          <div className="dashboard-mechanic-content">
            <MechanicContent />
          </div>
          <div className="dashboard-mechanic-profile">
            <UserProfile />
          </div>
        </div>
      </div>
    </>
  );
}

export default MechanicHomePage;
