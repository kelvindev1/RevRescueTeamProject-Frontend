import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MechanicList.css";

function MechanicList() {
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5555/mechanics")
      .then((response) => {
        setMechanics(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the mechanics!", error);
      });
  }, []);

  return (
    <div className="mechanic-list">
      <div className="list-header">
        <h2>Mechanics</h2>
      </div>
      <div className="list-container">
        {mechanics.map((mechanic, index) => (
          <div key={index} className="list-item">
            <div className="mechanic-detail">
              <img
                src={mechanic.profile_picture}
                alt={`${mechanic.first_name} ${mechanic.last_name}`}
                className="mechanic-image"
              />
              <h2>{`${mechanic.first_name} ${mechanic.last_name}`}</h2>
              <p>
                <i>Username:</i> {mechanic.username}
              </p>
              <p>
                <i>Email:</i> {mechanic.email}
              </p>
              <p>
                <i>Phone Number:</i> {mechanic.phone_number}
              </p>
              <p>
                <i>Expertise:</i> {mechanic.expertise}
              </p>
              <p>
                <i>Experience:</i> {mechanic.experience_years} years
              </p>
              <p>
                <i>Bio:</i> {mechanic.bio}
              </p>
            </div>
            <div className="mechanic-actions">
              <button className="mechanic-todo">Request Assistance</button>
              <button className="mechanic-todo">Review Mechanic</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MechanicList;
