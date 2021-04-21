import API from "api/api";

/* ------------------------------ action types ------------------------------ */

const READ_RANDOM_QUOTE_RESULT = "랜덤 명언 보기";
const GET_RANDOM_QUOTE = "랜덤 명언 정보 요청";
const GET_RANDOM_QUOTE_SUCCESS = "랜덤 명언 정보 요청 성공";
const GET_RANDOM_QUOTE_FAILURE = "랜덤 명언 정보 요청 실패";

/* ----------------------------- thunk ---------------------------- */
export const fetchRandomQuote = () => async (dispatch) => {
  // 요청 시작
  dispatch({ type: GET_RANDOM_QUOTE });
  // API 호출
  try {
    const quoteData = await API(`/api/quote`, "get");
    dispatch({ type: GET_RANDOM_QUOTE_SUCCESS, quoteData });
  } catch (error) {
    // 실패했을 때
    dispatch({ type: GET_RANDOM_QUOTE_FAILURE, error });
  }
};

/* ------------------------- initial state + reducer ------------------------ */
const initialState = {
  isLoading: false,
  quoteData: null,
  error: null,
};

export const quoteReducer = (
  state = initialState,
  { type, quoteData, error }
) => {
  switch (type) {
    case READ_RANDOM_QUOTE_RESULT:
      return state;

    case GET_RANDOM_QUOTE:
      return {
        ...state,
        isLoading: true,
      };

    case GET_RANDOM_QUOTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quoteData,
      };

    case GET_RANDOM_QUOTE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};
