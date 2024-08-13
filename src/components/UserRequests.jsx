import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserRequests.css";

const api = axios.create({
  baseURL: "http://127.0.0.1:5555",
});

function UserRequests() {
  const [requests, setRequests] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [error, setError] = useState("");
  const [editingRequestId, setEditingRequestId] = useState(null);
  const [editedMessage, setEditedMessage] = useState("");
  const [editedResolved, setEditedResolved] = useState(false);

  useEffect(() => {
    fetchUserRequests();
    fetchMechanics();
  }, []);

  const fetchUserRequests = async () => {
    try {
      const response = await api.get("/assistance_requests/by_user", {
        params: { user_id: 5 },
      });
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching user requests:", error);
      setError("Failed to fetch user requests.");
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
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== requestId)
        );
      } catch (error) {
        console.error("Error deleting assistance request:", error);
        setError("Failed to delete assistance request.");
      }
    }
  };

  const handleEditRequest = (request) => {
    setEditingRequestId(request.id);
    setEditedMessage(request.message);
    setEditedResolved(request.resolved);
  };

  const handlePatchRequest = async () => {
    try {
      await api.patch(`/assistance_requests/${editingRequestId}`, {
        message: editedMessage,
        resolved: editedResolved,
      });
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === editingRequestId
            ? { ...request, message: editedMessage, resolved: editedResolved }
            : request
        )
      );
      setEditingRequestId(null);
    } catch (error) {
      console.error("Error updating assistance request:", error);
      setError("Failed to update assistance request.");
    }
  };

  return (
    <div className="user-requests">
      <h2>Messages</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="requests-grid">
        {requests.length === 0 ? (
          <p>No message requests found</p>
        ) : (
          requests.map((request) => (
            <div className="request-card" key={request.id}>
              <p>
                <strong>Mechanic:</strong>{" "}
                {getMechanicName(request.mechanic_id)}
              </p>
              {editingRequestId === request.id ? (
                <div className="edit-form">
                  <textarea
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={editedResolved}
                      onChange={(e) => setEditedResolved(e.target.checked)}
                    />
                    Resolved
                  </label>
                  <button
                    className="user-save-button"
                    onClick={handlePatchRequest}
                  >
                    Save
                  </button>
                  <button
                    className="user-cancel-button"
                    onClick={() => setEditingRequestId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p>
                    <strong>Message:</strong> {request.message}
                  </p>
                  <p>
                    <strong>Request Date:</strong>{" "}
                    {new Date(request.request_date).toLocaleString()}
                  </p>
                  <button
                    className="user-edit-button"
                    onClick={() => handleEditRequest(request)}
                  >
                    Edit
                  </button>
                  <button
                    className="user-delete-button"
                    onClick={() => handleDeleteRequest(request.id)}
                  >
                    &times;
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserRequests;
