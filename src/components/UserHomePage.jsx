import React from "react";
import UserSidebar from "./UserSidebar";
import UserContent from "./UserContent";
import Profile from "./Profile"; // Add this import
import "./UserHomePage.css";

function UserHomePage() {
  return (
    <div className="dashboard">
      <UserSidebar />
      <div className="dashboard--content">
        <UserContent>
          <Profile /> {/* Profile component is now imported and used here */}
        </UserContent>
      </div>
    </div>
  );
}

export default UserHomePage;
