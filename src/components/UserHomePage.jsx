import React from "react";
import UserSidebar from "./UserSidebar";
import UserContent from "./UserContent";
import UserProfile from "./UserProfile";
import "./UserHomePage.css";

function UserHomePage() {
  return (
    <div className="dashboard">
      <div className="user-sidebar">
        <UserSidebar />
      </div>
      <div className="dashboard--content">
        <div className="dashboard-user-content">
          <UserContent />
        </div>
        <div className="dashboard-user-profile">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
