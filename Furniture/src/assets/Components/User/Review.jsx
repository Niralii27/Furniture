import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from "axios";


const Review = () => {

  const { id: productId } = useParams();
  const navigate = useNavigate();  // Initialize navigate function

  

  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [touched, setTouched] = useState({
    rating: false,
    review: false
  });
  const [errors, setErrors] = useState({
    rating: '',
    review: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Validation function
  const validate = () => {
    const newErrors = {
      rating: '',
      review: ''
    };
    
    if (!rating) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!review) {
      newErrors.review = 'Please write your review';
    } else if (review.length < 10) {
      newErrors.review = 'Review must be at least 10 characters long';
    } else if (review.length > 500) {
      newErrors.review = 'Review cannot exceed 500 characters';
    }
    
    setErrors(newErrors);
    return !newErrors.rating && !newErrors.review;
  };

  // Handle field blur
  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ rating: true, review: true });
  
    if (validate()) {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;
    
      const reviewData = {
        rating: parseInt(rating),
        review,
        product: productId,  // renamed from productId to product
        user: userId         // renamed from userId to user
      };
      console.log("Sending review data:", reviewData);

      axios
        .post("http://localhost:5000/api/Review/add-review", reviewData)
        .then((res) => {
          console.log("Review submitted:", res.data);
          setSubmitted(true);
    
          setTimeout(() => {
            setRating('');
            setReview('');
            setTouched({
              rating: false,
              review: false
            });
            setSubmitted(false);
          }, 3000);

          // Show success message, then navigate to the shop page
          setTimeout(() => {
            navigate('/shop');  // Navigate to Shop page after success message
          }, 3000);  // Wait for 3 seconds before redirecting
      
        })
        .catch((err) => {
          console.error("Error submitting review:", err);
        });
    }
    
    
  };
  

  return (
    <div className="container mt-5 pt-5">
      {submitted ? (
        <div className="alert alert-success">
          Thank you! Your review has been submitted successfully.
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rating</label>
            <select 
              className={`form-select ${touched.rating && errors.rating ? 'is-invalid' : ''}`}
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              onBlur={() => handleBlur('rating')}
              required
            >
              <option value="" disabled>Select rating</option>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
            {touched.rating && errors.rating && (
              <div className="invalid-feedback">{errors.rating}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="review" className="form-label">Review</label>
            <textarea 
              className={`form-control ${touched.review && errors.review ? 'is-invalid' : ''}`}
              id="review" 
              rows="5" 
              placeholder="Write your review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              onBlur={() => handleBlur('review')}
              required
            ></textarea>
            {touched.review && errors.review && (
              <div className="invalid-feedback">{errors.review}</div>
            )}
            <small className="text-muted mt-1 d-block">
              Characters: {review.length}/500
            </small>
          </div>

          <button type="submit" className="btn light-brown-btn">
            Leave a review
          </button>
        </form>
      )}
    </div>
  );
};

export default Review;