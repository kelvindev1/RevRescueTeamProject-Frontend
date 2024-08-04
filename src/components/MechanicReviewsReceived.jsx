import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function MechanicReviewsReceived({ mechanicId = null }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      if (mechanicId === undefined || mechanicId === null) {
        setError("No mechanic ID provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/reviews?mechanic_id=${mechanicId}`);
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [mechanicId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Reviews for Mechanic {mechanicId}</h1>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                <strong>Rating:</strong> {review.rating}
              </p>
              <p>
                <strong>Feedback:</strong> {review.feedback}
              </p>
              <p>
                <strong>User ID:</strong> {review.user_id}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

MechanicReviewsReceived.propTypes = {
  mechanicId: PropTypes.number,
};

export default MechanicReviewsReceived;
