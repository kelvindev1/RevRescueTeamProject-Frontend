import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./Reviews.css";

const api = axios.create({
  baseURL: "http://127.0.0.1:5555",
});

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [newReview, setNewReview] = useState({
    user_id: "",
    mechanic_id: "",
    rating: 0,
    feedback: "",
  });

  const [searchReviewer, setSearchReviewer] = useState("");
  const [searchMechanic, setSearchMechanic] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchMechanics();
    fetchReviews();
  }, [searchReviewer, searchMechanic]);

  const fetchReviews = async () => {
    try {
      const response = await api.get("/reviews", {
        params: {
          searchReviewer,
          searchMechanic,
        },
      });
      setReviews(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("There was an error fetching the reviews.");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/reviews", newReview);
      setReviews([...reviews, response.data]);
      setNewReview({
        user_id: "",
        mechanic_id: "",
        rating: 0,
        feedback: "",
      });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchReviewer") {
      setSearchReviewer(value);
    } else if (name === "searchMechanic") {
      setSearchMechanic(value);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="review-container">
      <h2>Reviews</h2>
      <div className="search-container">
        <label>
          Search by Reviewer:
          <input
            type="text"
            name="searchReviewer"
            value={searchReviewer}
            onChange={handleSearchChange}
            placeholder="Enter reviewer name"
          />
        </label>
        <label>
          Search by Mechanic:
          <input
            type="text"
            name="searchMechanic"
            value={searchMechanic}
            onChange={handleSearchChange}
            placeholder="Enter mechanic name"
          />
        </label>
      </div>
      <form onSubmit={handleSubmit} className="review-form">
        <label>
          User:
          <select
            name="user_id"
            value={newReview.user_id}
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
          Mechanic:
          <select
            name="mechanic_id"
            value={newReview.mechanic_id}
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
          Rating:
          <div className="stars">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                color={index < newReview.rating ? "#ffc107" : "#e4e5e9"}
                onClick={() => handleRatingChange(index + 1)}
              />
            ))}
          </div>
        </label>

        <label>
          Feedback:
          <textarea
            name="feedback"
            value={newReview.feedback}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Add Review</button>
      </form>

      <div className="review-cards">
        {reviews.length === 0 ? (
          <div>No reviews available</div>
        ) : (
          reviews.map((review) => {
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
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Reviews;
