import React from "react";
import UserSidebar from "./UserSidebar";
import UserContent from "./UserContent";
import UserProfile from "./UserProfile";
import "./UserHomePage.css";

function UserHomePage() {
  return (
    <>
      <div className="dashboard">
        <UserSidebar />
        <div className="dashboard--content">
          <UserContent />
        </div>
        <div className="homepage-userprofile">
          <UserProfile />
        </div>
      </div>
    </>
  );
}

export default UserHomePage;
