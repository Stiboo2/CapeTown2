
import {
  LOADING,
  NOTIFICATION_DISPLAY,
  WARNING,
  SUBMITTING,
  FLAG,
  FLAG_PROOF,
  WANT_TO_LOG_IN,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SUBMITTING) {
    return { ...state, isSubmitting: action.payload.status };
  }
  if (action.type === FLAG) {
    return { ...state, flag: action.payload.value };
  }
  if (action.type === FLAG_PROOF) {
    return { ...state, flagProof: action.payload.value };
  }
  if (action.type === WANT_TO_LOG_IN) { 
    return { ...state, LogIn: action.payload.status };
  }
  if (action.type === LOADING) {
    return { ...state, loading: true };
  }
  if (action.type === NOTIFICATION_DISPLAY) {
    return {
      ...state,
      notification: {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      },
    };
  }
  if (action.type === WARNING) {
    return {
      ...state,
      warning: {
        title: action.payload.title,
        heading: action.payload.heading,
        message: action.payload.message,
      },
    };
  }
  throw new Error(`no matching action type: ${action.type}`);
};
export default reducer;
