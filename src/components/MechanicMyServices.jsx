import React, { useState, useEffect } from "react";
import api from "./api";
import "./MechanicsServices.css";

function MechanicMyServices() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mechanicId, setMechanicId] = useState(null);

  useEffect(() => {
    const fetchMechanicId = async () => {
      try {
        const response = await api.get("mechanic_auth/current-mechanic");
        setMechanicId(response.data.id);
        fetchServices(response.data.id);
      } catch (error) {
        console.error("Error fetching mechanic ID:", error);
        setError("Unable to fetch mechanic ID.");
      }
    };

    fetchMechanicId();
  }, []);

  const fetchServices = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const mechanicServices = response.data.filter(
        (service) => service.mechanic_id === id
      );
      setServices(mechanicServices);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Unable to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mechanic-myservices-container">
      <h1 className="mechanicservice-h1">My Services</h1>
      {loading ? (
        <p>Loading services...</p>
      ) : services.length > 0 ? (
        <div className="services-list">
          {services.map((service) => (
            <div className="mechanic-service-card" key={service.id}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              {service.image_url && (
                <img src={service.image_url} alt={service.name} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No services found.</p>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default MechanicMyServices;
