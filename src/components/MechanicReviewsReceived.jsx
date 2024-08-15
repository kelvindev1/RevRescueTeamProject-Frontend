import React, { useState, useEffect } from "react";
import api from "./api";
import "./MechanicReviewsReceived.css";

function MechanicReviewsReceived() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mechanicId, setMechanicId] = useState(null);

  useEffect(() => {
    const fetchMechanicId = async () => {
      try {
        const response = await api.get("mechanic_auth/current-mechanic");
        setMechanicId(response.data.id);
        fetchReviews(response.data.id);
      } catch (error) {
        console.error("Error fetching mechanic ID:", error);
        setError("Unable to fetch mechanic ID.");
      }
    };

    fetchMechanicId();
  }, []);

  const fetchReviews = async (id) => {
    setLoading(true);
    try {
      const response = await api.get("reviews", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const mechanicReviews = response.data.filter(
        (review) => review.mechanic_id === id
      );
      setReviews(mechanicReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Unable to fetch reviews.");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;

    return (
      <>
        {Array(filledStars)
          .fill("★")
          .map((star, index) => (
            <span key={`filled-${index}`} className="filled-star">
              {star}
            </span>
          ))}
        {Array(emptyStars)
          .fill("☆")
          .map((star, index) => (
            <span key={`empty-${index}`} className="empty-star">
              {star}
            </span>
          ))}
      </>
    );
  };

  return (
    <>
      <h1 className="spec-mechanic-reviews-h1">Reviews Received</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="spec-mechanic-reviews-container">
          {error && <p className="spec-error-message">{error}</p>}
          {reviews.length === 0 ? (
            <p>No reviews received yet.</p>
          ) : (
            <ul className="reviews-list">
              {reviews.map((review) => (
                <li className="spec-mech-review-card" key={review.id}>
                  <h2 className="reviewer-username">
                    {review.user_id.username}
                  </h2>
                  <p className="review-feedback">{review.feedback}</p>
                  <p className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                  <p className="review-rating">{renderStars(review.rating)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default MechanicReviewsReceived;
