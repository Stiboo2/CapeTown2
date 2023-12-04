import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../store/user_context";

const FillInPassword = () => {
  const navigate = useNavigate();
  const { myUser } = useUserContext(); // Access the user information from context
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if the user is authenticated
    if (myUser && myUser.email) {
      setUsername(myUser.email); // Set the username to the user's email
    }
  }, [myUser]);
  const handleUsernameChange = (e) => {
    // setUsername(e.target.value);   you can not change your user/email address
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    // Check if the user is logged in
    if (
      myUser &&
      myUser.email &&
      myUser.email.endsWith("@tac-idwalalethu.com") &&
      password === "newdawn"
    ) {
      navigate("/PaymentsList"); // Redirect to the Payments slip List page
    } else {
      navigate("/unauthorizedpage"); // Redirect to the unauthorized page
    }
    // Reset the form
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default FillInPassword;
