import React, { useState } from "react";
import classes from "./MessageInput.module.css";
const MessageInput = ({ maxWords, onMessageChange }) => {
  const [message, setMessage] = useState("");
  const [remainingWords, setRemainingWords] = useState(maxWords);

  const handleInputChange = (event) => {
    const inputMessage = event.target.value;
    const characters = inputMessage.split(""); // Split the string into an array of characters
    const currentCharacterCount = characters.length;

    if (currentCharacterCount <= maxWords) {
      setMessage(inputMessage);
      setRemainingWords(maxWords - currentCharacterCount);
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
