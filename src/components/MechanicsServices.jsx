import React, { useState } from "react";
import axios from "axios";
import "./MechanicsServices.css";

function MechanicsServices() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [mechanicId, setMechanicId] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:5555/services", {
        name,
        description,
        image_url: imageUrl,
        mechanic_id: mechanicId,
      });

      if (response.status === 201) {
        setSuccessMessage("Service created successfully!");
        setName("");
        setDescription("");
        setImageUrl("");
        setMechanicId("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error creating service");
    }
  };

  return (
    <>
      <h1 className="mechanicservice-h1">Add New Service</h1>
      <div className="mechanicservice-container">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter service you can offer"
              required
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description of the service"
              required
            />
          </div>

          <div>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter a URL for the service"
              required
            />
          </div>

          <div>
            <input
              type="text"
              value={mechanicId}
              onChange={(e) => setMechanicId(e.target.value)}
              required
              placeholder="Enter your ID"
            />
          </div>

          <button type="submit" className="submit-button">
            Add Service
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </>
  );
}

export default MechanicsServices;
