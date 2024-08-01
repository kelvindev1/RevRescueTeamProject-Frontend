import React from "react";
import "./Profile.css";
import ProfileHeader from "./ProfileHeader";
import userimage from "/src/assets/images/image.png";
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

function Profile() {
  return (
    <>
      <div className="profile">
        <ProfileHeader />

        <div className="user--profile">
          <div className="user--detail">
            <img src={userimage} alt="user" />
            <h3 className="username">Kelvin Mutugi</h3>
            <span className="profession">Mechanic</span>
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
                <div className="action">:</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
