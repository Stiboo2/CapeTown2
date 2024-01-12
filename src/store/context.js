import { useContext, useReducer, createContext } from "react";
import reducer from "./reducer";

import capetownBranch from "../components/Meals/Data/churchDa";
import {
  CLEAR_CART,
  REMOVE,
  REMOVE_MEMBER,
  INCREASE,
  DECREASE,
  EDITMEMBER,
  DELETA,
  NEW_BRANCH_DATE,
  NEW_EVENT,
  UPDATE_ATTENDANCE_RECORD,
  NOTIFICATION_DISPLAY,
  WARNING,
  REPLACE_MEMBERS_DATA,
  SUBMITING,
  FLAG,
  FLAGPROOF,
  BRANCH_NAME,
  RELOAD_MEMBERS,
  ADD_MEMBER,
  WANT_TO_LOG_IN,
} from "./actions";
import { getTotals } from "../components/Utils/utils";

const AppContext = createContext();

const initialState = {
  logging: false,
  isSubmitting: false,
  flag: false,
  flagProof: false,
  setFlag: false,
  setFlagProof: false,
  cart: new Map(),
  branchs: new Map(capetownBranch.map((branch) => [branch._id, branch])),
  branch_Date: {},
  notification: null,
  warning: null,
  LogIn: false,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalCost, branchName, date, uBaba } = getTotals(
    state.branch_Date,
    state.branchs
  );
  console.log(state.cart);
  const login = state.logging;
  const setCartAtReducer = (newCart) => {
    dispatch({ type: REPLACE_MEMBERS_DATA, payload: { newCart } });
  };
  const reloadMembers = (attendanceRecord) => {
    dispatch({ type: RELOAD_MEMBERS, payload: { attendanceRecord } });
  };
  const addNewMember = (newMember) => {
    dispatch({ type: ADD_MEMBER, payload: { newMember } });
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };
  const removeMember = (id, date, BI) => {
    dispatch({ type: REMOVE_MEMBER, payload: { id, date, BI } });
  };

  const increase = (id, attendanceRecord) => {
    dispatch({ type: INCREASE, payload: { id, attendanceRecord } });
  };
  const deleteMember = (id) => {
    dispatch({ type: DELETA, payload: { id } });
  };
  const editmember = (member) => {
    dispatch({ type: EDITMEMBER, payload: { member } });
  };
  const setIsSubmitting = (status) => {
    dispatch({ type: SUBMITING, payload: { status } });
  };
  const setFlag = (value) => {
    dispatch({ type: FLAG, payload: { value } });
  };
  const setFlagProof = (value) => {
    dispatch({ type: FLAGPROOF, payload: { value } });
  };
  const decrease = (id, attendanceRecord) => {
    dispatch({ type: DECREASE, payload: { id, attendanceRecord } });
  };
  const updateAttendanceRecord = (branch_Date) => {
    dispatch({ type: UPDATE_ATTENDANCE_RECORD, payload: { branch_Date } });
  };
  const insetData = (attendanceRecord) => {
    dispatch({ type: NEW_EVENT, payload: { attendanceRecord } });
  };
  const seach_branch_name = (churchID) => {
    dispatch({ type: BRANCH_NAME, payload: { churchID } });
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
        clearCart,
        remove,
        removeMember,
        increase,
        decrease,
        editmember,
        deleteMember,
        updateAttendanceRecord,
        totalAmount,
        totalCost,
        branchName,
        date,
        uBaba,
        insetData,
        login,
        notifications,
        setWarning,
        setCartAtReducer,
        setIsSubmitting,
        setFlag,
        setFlagProof,
        seach_branch_name,
        reloadMembers,
        addNewMember,
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
