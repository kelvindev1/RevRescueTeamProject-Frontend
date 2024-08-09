import React from "react";
import { BiEdit } from "react-icons/bi";

function ProfileHeader() {
  return (
    <>
      <div className="profile--header">
        <h2 className="header--title">profile</h2>
        <div className="edit">
          <BiEdit />
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;