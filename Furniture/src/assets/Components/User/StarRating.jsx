// StarRating.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const StarRating = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/product/${productId}`);
        setRating(res.data.averageRating);
        setTotalReviews(res.data.totalReviews);
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };
    fetchRating();
  }, [productId]);

  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return (
    <div className="d-flex align-items-center">
      {[...Array(fullStars)].map((_, i) => (
        <i key={i} className="bi bi-star-fill"></i>
      ))}
      {halfStar && <i className="bi bi-star-half"></i>}
      {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
        <i key={i} className="bi bi-star"></i>
      ))}
      <span className="ms-1 text-muted">({totalReviews})</span>
    </div>
  );
};

export default StarRating;
