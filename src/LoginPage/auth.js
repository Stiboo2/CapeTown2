import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // onAuthStateChanged listener to update the user state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // If the user is not logged in, redirect to UnauthorizedPage
      if (!currentUser) {
        navigate("/unauthorizedpage");
      }
    });

    return () => {
      // Unsubscribe the onAuthStateChanged listener when the component unmounts
      unsubscribe();
    };
  }, [navigate]);

  return <>{user ? children : null}</>;
};

export default Auth;
