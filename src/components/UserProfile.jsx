import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./UserProfile.css";

function UserProfile({ id }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("UserProfile rendered with ID:", id);
    if (id) {
      console.log("Fetching user data for ID:", id);
      axios
        .get(`http://127.0.0.1:5555/users/${id}`)
        .then((response) => {
          console.log("User data received:", response.data);
          setUser(response.data);
          setError(null);
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
          setError("There was an error fetching the user data!");
        });
    } else {
      console.warn("No ID provided to UserProfile");
      setError("No user ID provided.");
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>User Profile</h2>
      </div>
      <div className="profile-container">
        <div className="profile-detail">
          <img
            src={user.profile_picture}
            alt={`${user.first_name} ${user.last_name}`}
            className="profile-image"
          />
          <h2>{`${user.first_name} ${user.last_name}`}</h2>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phone_number}
          </p>
          <p>
            <strong>Expertise:</strong> {user.expertise}
          </p>
          <p>
            <strong>Experience:</strong> {user.experience_years} years
          </p>
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UserProfile;
