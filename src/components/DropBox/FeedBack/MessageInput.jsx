import React, { useState } from "react";
import classes from "./MessageInput.module.css";
const MessageInput = ({ maxWords, onMessageChange }) => {
  const [message, setMessage] = useState("");
  const [remainingWords, setRemainingWords] = useState(maxWords);

  const handleInputChange = (event) => {
    const inputMessage = event.target.value;
    const words = inputMessage.split(/\s+/).filter((word) => word !== ""); // Split by whitespace and filter out empty strings
    const currentWordCount = words.length;

    if (currentWordCount <= maxWords) {
      setMessage(inputMessage);
      setRemainingWords(maxWords - currentWordCount);
      onMessageChange(inputMessage);
    }
  };

  return (
    <div className={classes.messageContainer}>
      <textarea
        value={message}
        onChange={handleInputChange}
        placeholder={`Write your message (max ${maxWords} words)`}
      />
      <div>
        Words remaining: {remainingWords}/{maxWords}
      </div>
    </div>
  );
};

export default MessageInput;
