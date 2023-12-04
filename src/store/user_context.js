import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../LoginPage/firebase-config";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    // onAuthStateChanged listener to update the user state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setMyUser(currentUser);
    });

    return () => {
      // Unsubscribe the onAuthStateChanged listener when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ myUser, auth }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
