import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminManager.css";
import { BiSearch } from "react-icons/bi";

const API_URL = "http://127.0.0.1:5555/admins";

function AdminManager() {
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [editAdmin, setEditAdmin] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: { search: searchQuery },
        });
        setAdmins(response.data);
      } catch (err) {
        setError("An error occurred while fetching data.");
        console.error(err);
      }
    };

    fetchAdmins();
  }, [searchQuery]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setAdmins(admins.filter((admin) => admin.id !== id));
      } catch (err) {
        setError("An error occurred while deleting the admin.");
        console.error(err);
      }
    }
  };

  const handleUpdate = async () => {
    if (!editAdmin) return;

    const updatePayload = {};
    if (newUsername && newUsername !== editAdmin.username) {
      updatePayload.username = newUsername;
    }

    if (newEmail && newEmail !== editAdmin.email) {
      updatePayload.email = newEmail;
    }
    if (Object.keys(updatePayload).length === 0) return;

    try {
      await axios.patch(`${API_URL}/${editAdmin.id}`, updatePayload);
      setAdmins(
        admins.map((admin) =>
          admin.id === editAdmin.id ? { ...admin, ...updatePayload } : admin
        )
      );
      setEditAdmin(null);
      setNewUsername("");
      setNewEmail("");
    } catch (err) {
      setError("An error occurred while updating the admin.");
      console.error(err);
    }
  };

  return (
    <div>
      <div className="admin-search-box">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <BiSearch className="adminsearchicon" />
      </div>

      {error && <p className="error-message">{error}</p>}

      <h2>All Admins</h2>
      {admins.length > 0 ? (
        <div className="admin-list">
          {admins.map((admin) => (
            <div key={admin.id} className="admin-card">
              <div className="admin-card-content">
                <p>
                  <i>Username:</i> {admin.username}
                </p>
                <p>
                  <i>Email:</i> {admin.email}
                </p>
                <button
                  className="admin-update-btn"
                  onClick={() => {
                    setEditAdmin(admin);
                    setNewUsername(admin.username);
                    setNewEmail(admin.email);
                  }}
                >
                  Update
                </button>
                <button
                  className="admin-delete-btn"
                  onClick={() => handleDelete(admin.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No admins found.</p>
      )}

      {editAdmin && (
        <div className="admin-update-form">
          <h3>Update Admin</h3>
          <input
            type="text"
            placeholder="New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />{" "}
          <br />
          <input
            type="email"
            placeholder="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />{" "}
          <br />
          <button className="admin-save-btn" onClick={handleUpdate}>
            Save Changes
          </button>
          <button
            className="admin-cancel-btn"
            onClick={() => setEditAdmin(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminManager;
