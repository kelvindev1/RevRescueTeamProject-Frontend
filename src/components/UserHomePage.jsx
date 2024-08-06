import React, { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar";
import UserContent from "./UserContent";
import UserProfile from "./UserProfile";
import "./UserHomePage.css";

function UserHomePage() {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  if (!userId) {
    return <div>Not logged in</div>;
  }
  return (
    <>
      <div className="dashboard">
        <UserSidebar />
        <div className="dashboard--content">
          <UserContent />
        </div>
        <div className="homepage-userprofile">
          <UserProfile id={userId} />
        </div>
      </div>
    </>
  );
}

export default UserHomePage;
