/* ------------------------------ action types ------------------------------ */

const SET_ERROR = "SET_ERROR";
const HIDE_ERROR = "HIDE_ERROR";

/* ------------------------------ action creator ------------------------------ */

export const setError = (error) => {
  return {
    type: SET_ERROR,
    error: error,
  };
};

export const hideError = () => {
  return {
    type: HIDE_ERROR,
  };
};

const initState = {
  error: null,
  isOpen: false,
};

export function errorReducer(state = initState, action) {

  if (action.error) {
    return {
      error: action.error,
      isOpen: true,
    };
  } else if (action.type === HIDE_ERROR) {
    return {
      error: null,
      isOpen: false,
    };
  }

  return state;
}
