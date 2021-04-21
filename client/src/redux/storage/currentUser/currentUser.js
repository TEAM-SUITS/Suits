import API from 'api/api';

/* ------------------------------ action types ------------------------------ */
const READ_CURRENT_USER = '현재 사용자 정보 조회';
const GET_CURRENT_USER = '현재 사용자 정보 요청';
const GET_CURRENT_USER_SUCCESS = '현재 사용자 정보 요청 성공';
const GET_CURRENT_USER_FAILURE = '현재 사용자 정보 요청 실패';

/* ---------------------------------- thunk --------------------------------- */
export const fetchCurrentUserData = () => async dispatch => {
  // 요청 시작
  dispatch({ type: GET_CURRENT_USER });

  // API 호출
  try {
    // 성공했을 때
    const currentUserData = await API('/api/user-profile', 'get');
    dispatch({ type: GET_CURRENT_USER_SUCCESS, currentUserData });
  } catch (error) {
    // 실패했을 때
    dispatch({ type: GET_CURRENT_USER_FAILURE, error });
  }
};

/* ------------------------- initial state + reducer ------------------------ */
const initialState = {
  isLoading: false,
  currentUserData: null,
  error: null,
};

export const currentUserReducer = (
  state = initialState,
  { type, currentUserData, error }
) => {
  switch (type) {
    case READ_CURRENT_USER:
      return state;

    case GET_CURRENT_USER:
      return {
        ...state,
        isLoading: true,
      };

    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUserData
      };

    case GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error
      };

    default:
      return state;
  }
};
