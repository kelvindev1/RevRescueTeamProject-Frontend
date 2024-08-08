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
    fetchUsers();
    fetchMechanics();
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [searchReviewer, searchMechanic]);

  const fetchReviews = async () => {
    try {
      const response = await api.get("/reviews", {
        params: {
          searchReviewer: searchReviewer,
          searchMechanic: searchMechanic,
        },
      });
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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (isConfirmed) {
      try {
        await api.delete(`/reviews/${reviewId}`);
        setReviews(reviews.filter((review) => review.id !== reviewId));
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

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
        {reviews.length === 0 ? (
          <div>No reviews available</div>
        ) : (
          reviews.map((review) => {
            const reviewer = getUserById(review.user_id);
            const mechanic = getMechanicById(review.mechanic_id);

            return (
              <div className="review-card" key={review.id}>
                <button
                  className="review-admin-delete-button"
                  onClick={() => handleDelete(review.id)}
                >
                  &times;
                </button>
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
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AdminReviewsManager;
