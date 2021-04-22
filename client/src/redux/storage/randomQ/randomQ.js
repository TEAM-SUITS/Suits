import API from "api/api";

/* ------------------------------ action types ------------------------------ */

const READ_RANDOM_QUESTION_RESULT = "랜덤 문제 보기 ";
const GET_RANDOM_QUESTION = "랜덤 문제 요청";
const GET_RANDOM_QUESTION_SUCCESS = "랜덤 문제 요청 성공";
const GET_RANDOM_QUESTION_FAILURE = "랜덤 문제 요청 실패";

/* ----------------------------- thunk ---------------------------- */
export const fetchRandomQData = () => async (dispatch) => {
  // 요청 시작
  dispatch({ type: GET_RANDOM_QUESTION });
  // API 호출
  try {
    const randomQData = await API(`/api/questions/random`, "get");
    dispatch({ type: GET_RANDOM_QUESTION_SUCCESS, randomQData });
  } catch (error) {
    // 실패했을 때
    dispatch({ type: GET_RANDOM_QUESTION_FAILURE, error });
  }
};

/* ------------------------- initial state + reducer ------------------------ */
const initialState = {
  isLoading: false,
  randomQData: null,
  error: null,
};

export const randomQReducer = (
  state = initialState,
  { type, randomQData, error }
) => {
  switch (type) {
    case READ_RANDOM_QUESTION_RESULT:
      return state;

    case GET_RANDOM_QUESTION:
      return {
        ...state,
        isLoading: true,
      };

    case GET_RANDOM_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        randomQData,
      };

    case GET_RANDOM_QUESTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};
