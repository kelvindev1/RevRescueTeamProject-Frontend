import React from "react";
import "./UserProfile.css";
import userimage from "/src/assets/images/avatar.webp";
import { FaCarBattery, FaLifeRing, FaWrench } from "react-icons/fa";

const expertises = [
  {
    title: "Engine Repair",
    icon: <FaWrench />,
  },
  {
    title: "Car Wiring",
    icon: <FaCarBattery />,
  },
  {
    title: "Tyres",
    icon: <FaLifeRing />,
  },
];

function UserProfile() {
  return (
    <>
      <div className="profile">
        <div className="user--profile">
          <div className="user--detail">
            <img src={userimage} alt="user" />
            <h3 className="username">Profile</h3>
            <span className="profession">
              You can view all of our mechanics and navigate to the service
              section to checkout all of our services
            </span>
          </div>

          <div className="user-expertises">
            {expertises.map((expertise, index) => (
              <div key={index} className="expertise">
                <div className="expertise--detail">
                  <div className="expertise--cover">{expertise.icon}</div>
                  <div className="expertise-name">
                    <h5 className="title">{expertise.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
