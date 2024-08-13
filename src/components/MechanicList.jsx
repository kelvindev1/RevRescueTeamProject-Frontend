import React, { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import axios from "axios";
import "./MechanicList.css";

function MechanicList() {
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5555/mechanics", {
          params: { search: searchQuery },
        });
        const data = response.data;
        setMechanics(data);
        setNoResults(data.length === 0);
      } catch (error) {
        console.error("There was an error fetching the mechanics!", error);
      }
    };

    fetchMechanics();
  }, [searchQuery]);

  const handleRequestAssistance = (mechanic) => {
    setSelectedMechanic(mechanic);
    setShowMessageInput(false);
  };

  const handleOptionClick = (option) => {
    if (option === "call") {
      console.log("Making call to:", selectedMechanic.phone_number);
      window.location.href = `tel:${selectedMechanic.phone_number}`;
    } else if (option === "message") {
      setShowMessageInput(true);
    }
  };

  const handleSendMessage = () => {
    if (!message) {
      alert("Message cannot be empty.");
      return;
    }
    console.log("Sending message with the following details:");
    console.log("User ID:", 4);
    console.log("Mechanic ID:", selectedMechanic.id);
    console.log("Message Content:", message);

    axios
      .post("http://127.0.0.1:5555/assistance_requests", {
        user_id: 5,
        mechanic_id: selectedMechanic.id,
        message: message,
        resolved: false,
      })
      .then((response) => {
        console.log("Message sent:", response.data);
        setFeedback("Message sent successfully.");
        setMessage("");
        setShowMessageInput(false);
        setTimeout(() => setFeedback(""), 3000);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setFeedback("Error sending message.");
        setTimeout(() => setFeedback(""), 3000);
      });
  };

  return (
    <>
      <div className="list-header">
        <div className="logo">
          <FaCar className="logo-icon" />
          <h3>RevRescue</h3>
        </div>
        <div className="searchandheader">
          <h2>Mechanics</h2>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mechanic-search-input"
          />
        </div>
      </div>
      <div className="mechanic-list">
        <div className="list-container">
          {noResults ? (
            <p className="no-results-message">No mechanics found.</p>
          ) : (
            mechanics.map((mechanic, index) => (
              <div key={index} className="list-item">
                <div className="mechanic-detail">
                  <img
                    src={mechanic.profile_picture}
                    alt={`${mechanic.first_name} ${mechanic.last_name}`}
                    className="mechanic-image"
                  />
                  <h2>{`${mechanic.first_name} ${mechanic.last_name}`}</h2>
                  <p>
                    <i>Username:</i> {mechanic.username}
                  </p>
                  <p>
                    <i>Email:</i> {mechanic.email}
                  </p>
                  <p>
                    <i>Phone Number:</i> {mechanic.phone_number}
                  </p>
                  <p>
                    <i>Expertise:</i> {mechanic.expertise}
                  </p>
                  <p>
                    <i>Experience:</i> {mechanic.experience_years} years
                  </p>
                  <p>
                    <i>Bio:</i> {mechanic.bio}
                  </p>
                </div>
                <div className="mechanic-actions">
                  <button
                    className="mechanic-todo"
                    onClick={() => handleRequestAssistance(mechanic)}
                  >
                    Request Assistance
                  </button>
                </div>
                {selectedMechanic === mechanic && (
                  <>
                    <div className="options-menu">
                      <button
                        onClick={() => handleOptionClick("call")}
                        className="mechanics-options-btn"
                      >
                        Call
                      </button>
                      <button
                        onClick={() => handleOptionClick("message")}
                        className="mechanics-options-btn"
                      >
                        Send Message
                      </button>
                    </div>

                    {showMessageInput && (
                      <div className="message-input">
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Enter your message here..."
                        />

                        <button
                          onClick={handleSendMessage}
                          className="mechanics-options-btn"
                        >
                          Send
                        </button>

                        <button
                          onClick={() => setShowMessageInput(false)}
                          className="mechanics-options-btn"
                        >
                          Cancel
                        </button>

                        {feedback && (
                          <p className="feedback-message">{feedback}</p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default MechanicList;
