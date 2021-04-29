import axios from "axios";

/* ------------------------------ action types ------------------------------ */

const READ_RANDOM_QUOTE_RESULT = "랜덤 명언 보기";
const GET_RANDOM_QUOTE = "랜덤 명언 정보 요청";
const GET_RANDOM_QUOTE_SUCCESS = "랜덤 명언 정보 요청 성공";
const GET_RANDOM_QUOTE_FAILURE = "랜덤 명언 정보 요청 실패";

/* ----------------------------- thunk ---------------------------- */
export const fetchRandomQuoteData = (mode) => async (dispatch, prevState) => {
  const dispatchAction = async () => {
    // 요청 시작
    dispatch({ type: GET_RANDOM_QUOTE });
    // API 호출
    try {
      const res = await axios.get("/api/quote");
      if (res.statusText === "OK") {
        dispatch({ type: GET_RANDOM_QUOTE_SUCCESS, quoteData: res.data });
      } else {
        dispatch({
          type: GET_RANDOM_QUOTE_FAILURE,
          error: res.data.message || "오늘의 명언을 불러오는데 실패하였습니다",
        });
      }
    } catch (error) {
      // 실패했을 때
      dispatch({
        type: GET_RANDOM_QUOTE_FAILURE,
        error: "오늘의 명언을 불러오는중 에러가 발생하였습니다",
      });
    }
  };

  if (mode === "init") {
    const { quote } = prevState();
    if (quote.quoteData) {
      return;
    }
    dispatchAction();
  } else {
    dispatchAction();
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
