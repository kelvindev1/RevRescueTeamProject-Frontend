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
        setUsers(usersData);
        setFilteredUsers(usersData);
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:5555/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
      } catch (err) {
        console.error("Failed to delete user:", err.message);
      }
    }
  };

  const getProfilePictureUrl = (profilePicture) => {
    // If profilePicture starts with 'http', return it as is
    if (profilePicture.startsWith("http")) {
      return profilePicture;
    }
    // Otherwise, treat it as a local file
    return `http://127.0.0.1:5555/uploads/${profilePicture}`;
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
              src={getProfilePictureUrl(user.profile_picture)}
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
