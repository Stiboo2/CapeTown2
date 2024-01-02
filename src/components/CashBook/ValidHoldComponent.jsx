import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  startAt,
  endAt,
  get,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const ValidHoldComponent = ({ onValidHoldFound }) => {
  const [validHold, setValidHold] = useState(null);

  useEffect(() => {
    const findValidHold = async () => {
      try {
        const referencesRef = ref(database, "reference");

        const snapshot = await get(
          query(
            referencesRef,
            orderByChild("holdExpiration"), // Order by holdExpiration only
            startAt(null),
            endAt(Date.now())
          )
        );

        const validHoldData = snapshot.val();

        if (validHoldData) {
          console.log("Found a valid hold:", validHoldData);
          setValidHold(validHoldData);
          onValidHoldFound(validHoldData); // Send to parent component
        } else {
          console.log("No valid hold found");
        }
      } catch (error) {
        console.error("An error occurred while finding valid hold:", error);
      }
    };

    findValidHold();
  }, [database, onValidHoldFound]);

  return (
    <div>
      {/* Render your component content here */}
      <p>Valid Hold Status: {validHold ? "Found" : "Not Found"}</p>
    </div>
  );
};

export default ValidHoldComponent;
