import React, { useState, useEffect, useCallback } from "react";
import StarRating from "./StarRatings";
import MessageInput from "./MessageInput";
import classes from "./FeedBack.module.css";

const FeedBack = ({ onFeedbackSubmit }) => {
  const [message, setMessage] = useState("");
  const [ratingValue, setRatingValue] = useState(null);

  const handleMessageChange = (newMessage) => {
    setMessage(newMessage);
  };

  const handleRatingValueChange = (newValue) => {
    setRatingValue(newValue);
  };

  // Memoize the onFeedbackSubmit function
  const memoizedOnFeedbackSubmit = useCallback(onFeedbackSubmit, []);

  // Pass the feedback data to the parent component
  useEffect(() => {
    // Move the initialization of feedbackData inside the useEffect callback
    const feedbackData = {
      message: message,
      ratingValue: ratingValue,
    };

    // Pass the feedback data to the parent component when the state changes
    memoizedOnFeedbackSubmit(feedbackData);
  }, [message, ratingValue, memoizedOnFeedbackSubmit]); // Include message and ratingValue as dependencies

  return (
    <div className={classes.feedbackContainer}>
      <h4>Feedback Message</h4>
      <MessageInput maxWords={50} onMessageChange={handleMessageChange} />
      <StarRating onStaRatingValue={handleRatingValueChange} />
    </div>
  );
};

export default FeedBack;
