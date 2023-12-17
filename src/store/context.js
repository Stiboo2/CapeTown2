// appContext.js
import React, { useContext, useReducer, createContext } from "react";
import reducer from "./reducer";

import {
  NOTIFICATION_DISPLAY,
  WARNING,
  SUBMITTING,
  FLAG,
  FLAG_PROOF,
  WANT_TO_LOG_IN,
} from "./actions";

const AppContext = createContext();

const initialState = {
  logging: false,
  isSubmitting: false,
  flag: false,
  flagProof: false,
  setFlag: false,
  setFlagProof: false,
  notification: null,
  warning: null,
  isLoggedIn: false,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = state.logging;


  const setIsSubmitting = (status) => {
    dispatch({ type: SUBMITTING, payload: { status } });
  };

  const setFlag = (value) => {
    dispatch({ type: FLAG, payload: { value } });
  };

  const setFlagProof = (value) => {
    dispatch({ type: FLAG_PROOF, payload: { value } });
  };

  const notifications = (status, title, message) => {
    dispatch({
      type: NOTIFICATION_DISPLAY,
      payload: { status, title, message },
    });
  };

  const setWarning = (title, heading, message) => {
    dispatch({
      type: WARNING,
      payload: { title, heading, message },
    });
  };

  const setWantToLogIn = (status) => {
    dispatch({
      type: WANT_TO_LOG_IN,
      payload: { status },
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        notifications,
        setWarning,
        setIsSubmitting,
        setFlag,
        setFlagProof,
        setWantToLogIn,
      }}  
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
