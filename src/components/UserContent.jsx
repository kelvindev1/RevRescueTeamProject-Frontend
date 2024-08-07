import React from "react";
import "./UserContent.css";
import MechanicList from "./MechanicList";

function UserContent() {
  return (
    <div>
      <div className="content">
        <MechanicList />
      </div>
    </div>
  );
}

export default UserContent;
