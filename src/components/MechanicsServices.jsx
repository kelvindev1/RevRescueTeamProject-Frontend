import React, { useState, useEffect } from "react";
import api from "./api";
import "./MechanicsServices.css";

function MechanicsServices() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [mechanicId, setMechanicId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    const fetchMechanicId = async () => {
      try {
        const response = await api.get("mechanic_auth/current-mechanic");
        setMechanicId(response.data.id);
        fetchServices();
      } catch (error) {
        console.error("Error fetching mechanic ID:", error);
        setError(
          "Unable to fetch mechanic ID. Please check your authentication."
        );
      }
    };

    fetchMechanicId();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchServices = async () => {
    try {
      const response = await api.get("services");
      const mechanicServices = response.data.filter(
        (service) => service.mechanic_id === mechanicId
      );
      setServices(mechanicServices);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Unable to fetch services.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!mechanicId) {
      setError("Mechanic ID is not available.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("services", {
        name,
        description,
        image_url: imageUrl,
      });

      if (response.status === 201) {
        const newService = response.data.service;
        setServices((prevServices) => [...prevServices, newService]);
        setSuccessMessage("Service created successfully!");
        setName("");
        setDescription("");
        setImageUrl("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error creating service");
      console.error("Error creating service:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setName(service.name);
    setDescription(service.description);
    setImageUrl(service.image_url);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!editingService) {
      setError("No service selected for editing.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.patch(`services/${editingService.id}`, {
        name,
        description,
        image_url: imageUrl,
      });

      if (response.status === 200) {
        const updatedService = response.data.service;
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.id === updatedService.id ? updatedService : service
          )
        );
        setSuccessMessage("Service updated successfully!");
        setEditingService(null);
        setName("");
        setDescription("");
        setImageUrl("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error updating service");
      console.error("Error updating service:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await api.delete(`services/${id}`);

      if (response.status === 204) {
        setServices((prevServices) =>
          prevServices.filter((service) => service.id !== id)
        );
        setSuccessMessage("Service deleted successfully!");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error deleting service");
      console.error("Error deleting service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="mechanicservice-h1">Add New Service</h1>
      <div className="mechanicservice-container">
        <form onSubmit={editingService ? handleUpdate : handleSubmit}>
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

          <button
            type="submit"
            className="mechanic-submit-button"
            disabled={loading}
          >
            {loading
              ? editingService
                ? "Updating..."
                : "Adding..."
              : editingService
              ? "Update Service"
              : "Add Service"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>

      {services.length > 0 ? (
        <div className="services-list">
          {services.map((service) => (
            <div className="mechanic-service-card" key={service.id}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              {service.image_url && (
                <img src={service.image_url} alt={service.name} />
              )}
              <div className="service-card-buttons">
                <button onClick={() => handleEdit(service)}>Edit</button>
                <button onClick={() => handleDelete(service.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No services found.</p>
      )}
    </>
  );
}

export default MechanicsServices;
