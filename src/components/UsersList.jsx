import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UsersList.css";
import { BiSearch } from "react-icons/bi";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5555/users");
        const usersData = response.data;

        const usersWithLocationPromises = usersData.map(async (user) => {
          const locationResponse = await axios.get(
            `http://127.0.0.1:5555/locations/${user.location_id}`
          );
          return { ...user, location: locationResponse.data.address };
        });

        const usersWithLocation = await Promise.all(usersWithLocationPromises);
        setUsers(usersWithLocation);
        setFilteredUsers(usersWithLocation);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Failed to delete user:", err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Users List</h2>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by username or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <BiSearch className="usersearchicon" />
      </div>
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div className="user-card" key={user.id}>
            <img
              src={user.profile_picture}
              alt={`${user.username}'s profile`}
            />
            <h2>{user.username}</h2>
            <p>
              <i>Name:</i> {user.first_name} {user.last_name}
            </p>
            <p>
              <i>Email:</i> {user.email}
            </p>
            <p>
              <i>Location:</i> {user.location}
            </p>
            <p>
              <i>Phone:</i> {user.phone_number}
            </p>
            <p>
              <i>Car Info:</i> {user.car_info}
            </p>
            <button
              className="delete-button"
              onClick={() => handleDelete(user.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
