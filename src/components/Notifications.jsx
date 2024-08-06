import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Notifications.css";
const api = axios.create({
  baseURL: "http://127.0.0.1:5555",
});

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    sender_user_id: "",
    receiver_user_id: "",
    sender_mechanic_id: "",
    receiver_mechanic_id: "",
    assistance_request_id: "",
    message: "",
  });
  const [users, setUsers] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [assistanceRequests, setAssistanceRequests] = useState([]);

  useEffect(() => {
    fetchNotifications();
    fetchUsers();
    fetchMechanics();
    fetchAssistanceRequests();
  }, []);

  const fetchNotifications = () => {
    api
      .get("/notifications")
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error("Error fetching notifications:", error));
  };

  const fetchUsers = () => {
    api
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const fetchMechanics = () => {
    api
      .get("/mechanics")
      .then((response) => setMechanics(response.data))
      .catch((error) => console.error("Error fetching mechanics:", error));
  };

  const fetchAssistanceRequests = () => {
    api
      .get("/assistance_requests")
      .then((response) => setAssistanceRequests(response.data))
      .catch((error) =>
        console.error("Error fetching assistance requests:", error)
      );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification({ ...newNotification, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/notifications", newNotification)
      .then((response) => {
        setNotifications([...notifications, response.data]);
        setNewNotification({
          sender_user_id: "",
          receiver_user_id: "",
          sender_mechanic_id: "",
          receiver_mechanic_id: "",
          assistance_request_id: "",
          message: "",
        });
      })
      .catch((error) => console.error("Error adding notification:", error));
  };

  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      <form onSubmit={handleSubmit} className="notification-form">
        <label>
          Sender User:
          <select
            name="sender_user_id"
            value={newNotification.sender_user_id}
            onChange={handleInputChange}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Receiver User:
          <select
            name="receiver_user_id"
            value={newNotification.receiver_user_id}
            onChange={handleInputChange}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sender Mechanic:
          <select
            name="sender_mechanic_id"
            value={newNotification.sender_mechanic_id}
            onChange={handleInputChange}
          >
            <option value="">Select Mechanic</option>
            {mechanics.map((mechanic) => (
              <option key={mechanic.id} value={mechanic.id}>
                {mechanic.first_name} {mechanic.last_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Receiver Mechanic:
          <select
            name="receiver_mechanic_id"
            value={newNotification.receiver_mechanic_id}
            onChange={handleInputChange}
          >
            <option value="">Select Mechanic</option>
            {mechanics.map((mechanic) => (
              <option key={mechanic.id} value={mechanic.id}>
                {mechanic.first_name} {mechanic.last_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Assistance Request:
          <select
            name="assistance_request_id"
            value={newNotification.assistance_request_id}
            onChange={handleInputChange}
          >
            <option value="">Select Request</option>
            {assistanceRequests.map((request) => (
              <option key={request.id} value={request.id}>
                {request.description}
              </option>
            ))}
          </select>
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={newNotification.message}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Notification</button>
      </form>
      <div className="notification-cards">
        {notifications.map((notification) => (
          <div className="notification-card" key={notification.id}>
            <p>
              <strong>Message:</strong> {notification.message}
            </p>
            <p>
              <strong>Sender:</strong>{" "}
              {notification.sender_user_id
                ? `User ${notification.sender_user_id}`
                : `Mechanic ${notification.sender_mechanic_id}`}
            </p>
            <p>
              <strong>Receiver:</strong>{" "}
              {notification.receiver_user_id
                ? `User ${notification.receiver_user_id}`
                : `Mechanic ${notification.receiver_mechanic_id}`}
            </p>
            <p>
              <strong>Assistance Request:</strong>{" "}
              {notification.assistance_request_id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
