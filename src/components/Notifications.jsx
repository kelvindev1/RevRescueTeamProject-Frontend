import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Notifications.css";

const api = axios.create({
  baseURL: "http://127.0.0.1:5555",
});

function Notifications() {
  const [assistanceRequests, setAssistanceRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssistanceRequests();
    fetchUsers();
    fetchMechanics();
  }, []);

  const fetchAssistanceRequests = async () => {
    try {
      const response = await api.get("/assistance_requests");
      setAssistanceRequests(response.data);
    } catch (error) {
      console.error("Error fetching assistance requests:", error);
      setError("Failed to fetch assistance requests.");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users.");
    }
  };

  const fetchMechanics = async () => {
    try {
      const response = await api.get("/mechanics");
      setMechanics(response.data);
    } catch (error) {
      console.error("Error fetching mechanics:", error);
      setError("Failed to fetch mechanics.");
    }
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? `${user.first_name} ${user.last_name}` : "Unknown User";
  };

  const getMechanicName = (mechanicId) => {
    const mechanic = mechanics.find((mechanic) => mechanic.id === mechanicId);
    return mechanic
      ? `${mechanic.first_name} ${mechanic.last_name}`
      : "Unknown Mechanic";
  };

  const handleDeleteRequest = async (requestId) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await api.delete(`/assistance_requests/${requestId}`);
        setAssistanceRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== requestId)
        );
      } catch (error) {
        console.error("Error deleting assistance request:", error);
        setError("Failed to delete assistance request.");
      }
    }
  };

  return (
    <div className="notification-container">
      <h2>Assistance Requests</h2>
      {error && <p className="error">{error}</p>}
      <div className="notification-cards">
        {assistanceRequests.map((request) => (
          <div className="notification-card" key={request.id}>
            <p>
              <strong>Sender:</strong> {getUserName(request.user_id)}
            </p>
            <p>
              <strong>Receiver:</strong> {getMechanicName(request.mechanic_id)}
            </p>
            <p>
              <strong>Message:</strong> {request.message}
            </p>
            <p>
              <strong>Request Date:</strong>{" "}
              {new Date(request.request_date).toLocaleString()}
            </p>
            <button
              className="delete-button"
              onClick={() => handleDeleteRequest(request.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
