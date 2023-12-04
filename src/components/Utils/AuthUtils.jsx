import { useUserContext } from "../../store/user_context";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../LoginPage/firebase-config";

export function useCheckAuthLoader() {
  console.log("jumped to useCheckAuthLoader..");
  const [myUser, setMyUser] = useState(null);
  console.log("done with setMyUser.");
  const navigate = useNavigate();
  console.log("done with navigate.");
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

  useEffect(() => {
    if (!myUser) {
      console.log("User not authenticated. Redirecting...");
      // Redirect to the unauthorized page
      navigate('/unauthorizedpage');
    }
  }, [myUser, navigate]);

  console.log("Authentication check passed. Proceeding...");
}
