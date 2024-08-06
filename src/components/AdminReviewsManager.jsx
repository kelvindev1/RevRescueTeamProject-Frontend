import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./Reviews.css";

const api = axios.create({
  baseURL: "http://127.0.0.1:5555",
});

function AdminReviewsManager() {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [searchReviewer, setSearchReviewer] = useState("");
  const [searchMechanic, setSearchMechanic] = useState("");

  useEffect(() => {
    fetchReviews();
    fetchUsers();
    fetchMechanics();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get("/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchMechanics = async () => {
    try {
      const response = await api.get("/mechanics");
      setMechanics(response.data);
    } catch (error) {
      console.error("Error fetching mechanics:", error);
    }
  };

  const getUserById = (id) => users.find((user) => user.id === id);
  const getMechanicById = (id) =>
    mechanics.find((mechanic) => mechanic.id === id);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} color={index < rating ? "#ffc107" : "#e4e5e9"} />
    ));
  };

  const handleDelete = async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const reviewer = getUserById(review.user_id);
    const mechanic = getMechanicById(review.mechanic_id);

    const reviewerName = reviewer
      ? `${reviewer.first_name} ${reviewer.last_name}`
      : "";
    const mechanicName = mechanic
      ? `${mechanic.first_name} ${mechanic.last_name}`
      : "";

    const reviewerMatch = reviewerName
      .toLowerCase()
      .includes(searchReviewer.toLowerCase());
    const mechanicMatch = mechanicName
      .toLowerCase()
      .includes(searchMechanic.toLowerCase());

    return reviewerMatch && mechanicMatch;
  });

  return (
    <div className="review-container">
      <h2>Reviews</h2>
      <div className="search-container">
        <label>
          Search by Reviewer:
          <input
            type="text"
            value={searchReviewer}
            onChange={(e) => setSearchReviewer(e.target.value)}
            placeholder="Enter reviewer name"
          />
        </label>
        <label>
          Search by Mechanic:
          <input
            type="text"
            value={searchMechanic}
            onChange={(e) => setSearchMechanic(e.target.value)}
            placeholder="Enter mechanic name"
          />
        </label>
      </div>

      <div className="review-cards">
        {filteredReviews.length === 0 ? (
          <div>No reviews available</div>
        ) : (
          filteredReviews.map((review) => {
            const reviewer = getUserById(review.user_id);
            const mechanic = getMechanicById(review.mechanic_id);

            return (
              <div className="review-card" key={review.id}>
                <p>{review.feedback}</p>
                <p>{new Date(review.created_at).toLocaleString()}</p>
                <p>
                  <strong>Reviewer:</strong>{" "}
                  {reviewer
                    ? `${reviewer.first_name} ${reviewer.last_name}`
                    : "Loading..."}
                </p>
                <p>
                  <strong>Mechanic:</strong>{" "}
                  {mechanic
                    ? `${mechanic.first_name} ${mechanic.last_name}`
                    : "Loading..."}
                </p>
                <div className="rating">
                  <div className="stars">{renderStars(review.rating)}</div>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(review.id)}
                >
                  &times;
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AdminReviewsManager;
