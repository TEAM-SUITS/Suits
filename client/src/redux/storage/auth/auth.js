import axios from "axios";

const SIGN_IN = "로그인";
const SIGN_OUT = "로그아웃";

export const signInAction = () => async (dispatch) => {
  const res = await axios.get("/auth/getuser");
  dispatch({ type: SIGN_IN, authUser: res.data });
};

const initialState = {
  authUser: null,
  isAuthed: false,
};

export const authReducer = (state = initialState, { type, authUser }) => {
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        authUser,
        isAuthed: !!authUser,
      };

    case SIGN_OUT:
      return initialState;

    default:
      return state;
  }
};
