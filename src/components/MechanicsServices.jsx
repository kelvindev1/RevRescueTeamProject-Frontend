import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MechanicsServices.css";

function MechanicsServices() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [mechanicId, setMechanicId] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    const fetchMechanicId = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5555/mechanic_auth/current-mechanic", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include your JWT here
          },
        });
        setMechanicId(response.data.id);
      } catch (error) {
        console.error(error);
        setError("Unable to fetch mechanic ID.");
      }
    };

    fetchMechanicId();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true); // Set loading to true

    if (!mechanicId) {
      setError("Mechanic ID is not available.");
      setLoading(false); // Set loading to false on error
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5555/services", {
        name,
        description,
        image_url: imageUrl,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token here
        },
      });

      if (response.status === 201) {
        setSuccessMessage("Service created successfully!");
        setName("");
        setDescription("");
        setImageUrl("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error creating service");
      console.error("Error creating service:", error); // Log error for debugging
    } finally {
      setLoading(false); // Set loading to false after request completes
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
              placeholder="Enter a URL for the service image"
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Adding..." : "Add Service"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </>
  );
}

export default MechanicsServices;
