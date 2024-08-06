import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import './Reviews.css'; // Ensure this file includes card styling

// Set up Axios instance with the base URL
const api = axios.create({
  baseURL: 'http://127.0.0.1:5555'
});

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [newReview, setNewReview] = useState({
    user_id: '',
    mechanic_id: '',
    rating: 0,
    feedback: ''
  });

  useEffect(() => {
    // Fetch all data when the component mounts
    fetchReviews();
    fetchUsers();
    fetchMechanics();
  }, []);

  const fetchReviews = () => {
    api.get('/reviews')
      .then(response => {
        console.log('Fetched reviews:', response.data); // Log fetched reviews
        setReviews(response.data);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  };

  const fetchUsers = () => {
    api.get('/users')
      .then(response => {
        console.log('Fetched users:', response.data); // Log fetched users
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const fetchMechanics = () => {
    api.get('/mechanics')
      .then(response => {
        console.log('Fetched mechanics:', response.data); // Log fetched mechanics
        setMechanics(response.data);
      })
      .catch(error => console.error('Error fetching mechanics:', error));
  };

  const getUserById = (id) => users.find(user => user.id === id);
  const getMechanicById = (id) => mechanics.find(mechanic => mechanic.id === id);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} color={index < rating ? '#ffc107' : '#e4e5e9'} />
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting review:', newReview); // Log the review being submitted
    api.post('/reviews', newReview)
      .then(response => {
        console.log('Added review:', response.data); // Log the added review
        setReviews([...reviews, response.data]);
        setNewReview({
          user_id: '',
          mechanic_id: '',
          rating: 0,
          feedback: ''
        });
      })
      .catch(error => console.error('Error adding review:', error));
  };

  return (
    <div className="review-container">
      <h2>Reviews</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <label>
          User:
          <select name="user_id" value={newReview.user_id} onChange={handleInputChange}>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Mechanic:
          <select name="mechanic_id" value={newReview.mechanic_id} onChange={handleInputChange}>
            <option value="">Select Mechanic</option>
            {mechanics.map(mechanic => (
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
                color={index < newReview.rating ? '#ffc107' : '#e4e5e9'}
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
        {reviews.map(review => {
          const reviewer = getUserById(review.user_id);
          const mechanic = getMechanicById(review.mechanic_id);

          return (
            <div className="review-card" key={review.id}>
              <div className="rating">
                <h3>Rating: {review.rating}</h3>
                <div className="stars">{renderStars(review.rating)}</div>
              </div>
              <p><strong>Feedback:</strong> {review.feedback}</p>
              <p><strong>Reviewer:</strong> {reviewer ? `${reviewer.first_name} ${reviewer.last_name}` : 'Loading...'}</p>
              <p><strong>Mechanic:</strong> {mechanic ? `${mechanic.first_name} ${mechanic.last_name}` : 'Loading...'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;
