import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceList.css";

function ServiceList() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchServices = async (query = "") => {
    try {
      const response = await axios.get("http://127.0.0.1:5555/services/all", {
        params: { search: query },
      });
      setServices(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("There was an error fetching the services.");
    }
  };

  useEffect(() => {
    fetchServices(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="service-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by service name or mechanic name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {services.length === 0 ? (
        <div className="no-results">No services found</div>
      ) : (
        <div className="service-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              {service.mechanic && (
                <div className="mechanic-details">
                  {service.mechanic.profile_picture && (
                    <img
                      src={service.mechanic.profile_picture}
                      alt={`${service.mechanic.first_name} ${service.mechanic.last_name}`}
                      className="mechanic-image"
                    />
                  )}
                  <p>
                    <strong>Mechanic:</strong> {service.mechanic.first_name}{" "}
                    {service.mechanic.last_name}
                  </p>
                </div>
              )}
              <img
                src={service.image_url}
                alt={service.name}
                className="service-image"
              />
              <div className="service-content">
                <h2>{service.name}</h2>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServiceList;
