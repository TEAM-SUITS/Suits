import axios from "axios";

/* ------------------------------ action types ------------------------------ */

const READ_RANDOM_QUESTION_RESULT = "랜덤 문제 보기 ";
const GET_RANDOM_QUESTION = "랜덤 문제 요청";
const GET_RANDOM_QUESTION_SUCCESS = "랜덤 문제 요청 성공";
const GET_RANDOM_QUESTION_FAILURE = "랜덤 문제 요청 실패";

/* ----------------------------- thunk ---------------------------- */
export const fetchRandomQData = (mode) => async (dispatch, prevState) => {
  const dispatchAction = async () => {
    // 요청 시작
    try {
      // 요청 시작
      dispatch({ type: GET_RANDOM_QUESTION });

      const res = await axios(`/api/questions/random`);
      if ((res.statusText = "OK")) {
        dispatch({ type: GET_RANDOM_QUESTION_SUCCESS, randomQData: res.data });
      }
      // 서버에서 실패
      else
        dispatch({
          type: GET_RANDOM_QUESTION_FAILURE,
          error:
            res.data.message ||
            "랜덤 문제 데이터를 서버에서 불러오는데 실패하였습니다",
        });
    } catch (error) {
      // 클라이언트 실패했을 때
      dispatch({
        type: GET_RANDOM_QUESTION_FAILURE,
        error: "랜덤 질문 요청중에 에러가 발생했습니다.",
      });
    }
  };

  // 컴포넌트가 리랜더링 될때마다 매번 데이터 요청을 하지 않도록 useEffect 내에서는 모드를 init으로 지정
  if (mode === "init") {
    const { randomQ } = prevState();
    if (randomQ.randomQData) return;
    dispatchAction();
  } else {
    dispatch({ type: GET_RANDOM_QUESTION });
    // API 호출
    dispatchAction();
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
        error: error,
      };

    default:
      return state;
  }
};
