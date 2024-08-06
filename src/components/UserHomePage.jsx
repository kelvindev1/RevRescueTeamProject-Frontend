import React from "react";
import UserSidebar from "./UserSidebar";
import UserContent from "./UserContent";
import "./UserHomePage.css";

function UserHomePage() {
  return (
    <>
      <div className="dashboard">
        <UserSidebar />
        <div className="dashboard--content">
          <UserContent />
        </div>
      </div>
    </>
  );
}

export default UserHomePage;
