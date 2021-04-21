import axios from 'axios';

const FETCH_USER = '유저 정보 요청';
const FETCH_USER_SUCCESS = '유저 정보 요청 성공';
const FETCH_USER_FAILURE = '유저 정보 요청 실패';

const SIGN_OUT = '로그아웃 요청';
const SIGN_OUT_SUCCESS = '로그아웃 요청 성공';
const SIGN_OUT_FAILURE = '로그아웃 요청 실패';

export const fetchUserAction = () => async (dispatch) => {
  dispatch({ type: FETCH_USER });
  try {
    const res = await axios.get('/auth/user');
    dispatch({ type: FETCH_USER_SUCCESS, authUser: res.data.user });
  } catch (err) {
    dispatch({ type: FETCH_USER_FAILURE, msg: err.response.data });
  }
};

export const signOutAction = () => async (dispatch) => {
  dispatch({ type: SIGN_OUT });
  try {
    const res = await axios.get('/auth/logout');
    dispatch({ type: SIGN_OUT_SUCCESS });
  } catch (err) {
    dispatch({ type: SIGN_OUT_FAILURE, msg: err.response.data });
  }
};

const initialState = {
  authUser: null,
  isAuthed: false,
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, { type, authUser, msg }) => {
  switch (type) {
    case FETCH_USER:
    case SIGN_OUT:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        authUser,
        isLoading: false,
        isAuthed: !!authUser,
      };

    case FETCH_USER_FAILURE:
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        authUser: null,
        isLoading: false,
        error: msg,
      };

    case SIGN_OUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};
