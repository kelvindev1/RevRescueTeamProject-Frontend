import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MechanicsList.css";
import { BiSearch } from "react-icons/bi";

const API_URL = "http://127.0.0.1:5555/mechanics";

const MechanicsList = () => {
  const [mechanics, setMechanics] = useState([]);
  const [filteredMechanics, setFilteredMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMechanics = async (query = "") => {
      try {
        const response = await axios.get(API_URL, {
          params: { search: query },
        });
        const mechanicsData = response.data;
        setMechanics(mechanicsData);
        setFilteredMechanics(mechanicsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMechanics(searchQuery);
  }, [searchQuery]);

  const handleDelete = async (mechanicId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mechanic?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${mechanicId}`);
        setMechanics(
          mechanics.filter((mechanic) => mechanic.id !== mechanicId)
        );
        setFilteredMechanics(
          filteredMechanics.filter((mechanic) => mechanic.id !== mechanicId)
        );
      } catch (err) {
        console.error("Failed to delete mechanic:", err.message);
      }
    }
  };

  const getProfilePictureUrl = (profilePicture) => {
    if (profilePicture && profilePicture.startsWith("http")) {
      return profilePicture;
    }
    return `http://127.0.0.1:5555/uploads/${profilePicture}`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Mechanics List</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by username or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <BiSearch className="mechanicsearchicon" />
      </div>

      <div className="mechanic-list">
        {filteredMechanics.length > 0 ? (
          filteredMechanics.map((mechanic) => (
            <div className="mechanic-card" key={mechanic.id}>
              <img
                src={getProfilePictureUrl(mechanic.profile_picture)}
                alt={`${mechanic.first_name} ${mechanic.last_name}'s profile`}
                className="profile-picture"
              />
              <h2>{mechanic.username}</h2>
              <p>
                <i>Name:</i> {mechanic.first_name} {mechanic.last_name}
              </p>
              <p>
                <i>Email:</i> {mechanic.email}
              </p>
              <p>
                <i>Phone:</i> {mechanic.phone_number}
              </p>
              <p>
                <i>Expertise:</i> {mechanic.expertise}
              </p>
              <p>
                <i>Experience:</i> {mechanic.experience_years}yrs
              </p>
              <p>
                <i>Bio:</i> {mechanic.bio}
              </p>
              <button
                className="delete-button-mechanic"
                onClick={() => handleDelete(mechanic.id)}
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <p>No Mechanics found.</p>
        )}
      </div>
    </div>
  );
};

export default MechanicsList;
