import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MechanicsList.css";
import { BiSearch } from "react-icons/bi";

const MechanicsList = () => {
  const [mechanics, setMechanics] = useState([]);
  const [filteredMechanics, setFilteredMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5555/mechanics");
        setMechanics(response.data);
        setFilteredMechanics(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMechanics();
  }, []);

  useEffect(() => {
    const filtered = mechanics.filter(
      (mechanic) =>
        mechanic.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mechanic.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMechanics(filtered);
  }, [searchQuery, mechanics]);

  const handleDelete = async (mechanicId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Mechanic?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:5555/mechanics/${mechanicId}`);
        setMechanics(
          mechanics.filter((mechanic) => mechanic.id !== mechanicId)
        );
      } catch (err) {
        console.error("Failed to delete mechanic:", err.message);
      }
    }
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
        {filteredMechanics.map((mechanic) => (
          <div className="mechanic-card" key={mechanic.id}>
            <img
              src={mechanic.profile_picture}
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
        ))}
      </div>
    </div>
  );
};

export default MechanicsList;
