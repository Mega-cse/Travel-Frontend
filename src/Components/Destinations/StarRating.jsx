// StarRating.jsx
import React from 'react';

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div>
      {stars.map((star) => (
        <span key={star} style={{ color: star <= rating ? 'gold' : '#ddd' }}>
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
