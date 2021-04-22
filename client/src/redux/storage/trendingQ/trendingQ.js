import API from "api/api";

/* ------------------------------ action types ------------------------------ */

const READ_TRENDING_QUESTIONS_RESULT = "급상승 문제 보기";
const GET_TRENDING_QUESTIONS = "급상승 문제 요청";
const GET_TRENDING_QUESTIONS_SUCCESS = "급상승 문제 요청 성공";
const GET_TRENDING_QUESTIONS_FAILURE = "급상승 문제 요청 실패";

/* ----------------------------- thunk ---------------------------- */
export const fetchTrendingData = (mode) => async (dispatch, prevState) => {
  const disptachAction = async () => {
    // 요청 시작
    dispatch({ type: GET_TRENDING_QUESTIONS });
    // API 호출
    try {
      const trendingQData = await API(`/api/questions/trend`, "get");
      dispatch({ type: GET_TRENDING_QUESTIONS_SUCCESS, trendingQData });
    } catch (error) {
      // 실패했을 때
      dispatch({ type: GET_TRENDING_QUESTIONS_FAILURE, error });
    }
  };

  if (mode === "init") {
    const { trendingQ } = prevState();
    if (trendingQ.trendingQData) return;
    disptachAction();
  } else {
    disptachAction();
  }
};

/* ------------------------- initial state + reducer ------------------------ */
const initialState = {
  isLoading: false,
  trendingQData: null,
  error: null,
};

export const trendingQReducer = (
  state = initialState,
  { type, trendingQData, error }
) => {
  switch (type) {
    case READ_TRENDING_QUESTIONS_RESULT:
      return state;

    case GET_TRENDING_QUESTIONS:
      return {
        ...state,
        isLoading: true,
      };

    case GET_TRENDING_QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        trendingQData,
      };

    case GET_TRENDING_QUESTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};
