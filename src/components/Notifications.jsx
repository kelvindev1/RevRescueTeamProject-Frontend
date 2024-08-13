import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Notifications.css";

const api = axios.create({
  baseURL: "http://127.0.0.1:5555",
});

function Notifications() {
  const [users, setUsers] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [assistanceRequests, setAssistanceRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchMechanics();
    fetchAssistanceRequests();
  }, []);

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

  const fetchAssistanceRequests = async () => {
    try {
      const response = await api.get("/assistance_requests");
      setAssistanceRequests(response.data);
    } catch (error) {
      console.error("Error fetching assistance requests:", error);
      setError("Failed to fetch assistance requests.");
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

  const getAssistanceRequestMessage = (assistanceRequestId) => {
    const request = assistanceRequests.find(
      (request) => request.id === assistanceRequestId
    );
    return request ? request.message : "Unknown Request";
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
              <strong>Message:</strong>{" "}
              {getAssistanceRequestMessage(request.id)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
