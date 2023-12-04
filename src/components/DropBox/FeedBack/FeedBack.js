import React from 'react'
import StarRating from './StarRatings'
import MessageInput from './MessageInput'
import classes from './FeedBack.module.css';

const FeedBack = () => {
  return (
    <div className={classes.feedbackContainer}>
      <h4>Feedback Message</h4>
      <MessageInput maxWords={50} />
      <StarRating/>
    </div>
  )
}

export default FeedBack
