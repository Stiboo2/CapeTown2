import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalf as halfStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import classes from "./StarRatings.module.css";

const StarRating = ({ onStaRatingValue }) => {
  const [rating, setRating] = useState(null);

  const handleRatingChange = (value) => {
    setRating(value);
    // Update the parent component with the new rating
    onStaRatingValue(value);
    // Remove the onStaRatingValue(rating) line
  };

  return (
    <div className={classes.starRatingContainer}>
      {[1, 2, 3, 4, 5].map((index) => (
        <FontAwesomeIcon
          key={index}
          icon={
            index <= rating
              ? solidStar
              : index - 0.5 === rating
              ? halfStar
              : regularStar
          }
          onClick={() => handleRatingChange(index)}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
};

export default StarRating;
