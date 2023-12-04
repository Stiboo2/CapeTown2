import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalf as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import classes from './StarRatings.module.css';


const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    console.log(value);
    setRating(value);
    // Handle the new rating as needed
  };

  return (
    <div className={classes.starRatingContainer}>
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesomeIcon
          key={index}
          icon={(index <= rating) ? solidStar : (index - 0.5 === rating) ? halfStar : regularStar}
          onClick={() => handleRatingChange(index)}
          style={{ cursor: 'pointer' }}
        />
      ))}
    </div>
  );
};

export default StarRating;
