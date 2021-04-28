import axios from 'axios';

/* ------------------------------ action types ------------------------------ */
const READ_CURRENT_QUESTION = '포스트페이지 질문 정보 조회';
const GET_CURRENT_QUESTION = '포스트페이지 질문 정보 요청';
const GET_CURRENT_QUESTION_SUCCESS = '포스트페이지 질문 정보 요청 성공';
const GET_CURRENT_QUESTION_FAILURE = '포스트페이지 질문 정보 요청 실패';

/* ---------------------------------- thunk --------------------------------- */
export const fetchCurrentQuestion = (qId) => async (dispatch) => {
  // 요청 시작
  dispatch({ type: GET_CURRENT_QUESTION });

  // API 호출
  try {
    // 실패했을 때
    const res = await axios.get(`/api/questions/${qId}`);
    if (res.statusText !== 'OK') {
      dispatch({
        type: GET_CURRENT_QUESTION_FAILURE,
        error: res.data.message || '질문 정보를 가져오는 데 오류가 발생하였습니다.',
      });
    }

    // 성공했을 때
    dispatch({ type: GET_CURRENT_QUESTION_SUCCESS, currentQuestion: res.data });
  } catch (error) {
    dispatch({
      type: GET_CURRENT_QUESTION_FAILURE,
      error: error.message || '질문 정보를 가져오는 데 오류가 발생하였습니다.',
    });
  }
};

/* ------------------------- initial state + reducer ------------------------ */
const initialState = {
  isLoading: false,
  currentQuestion: null,
  error: null,
};

export const currentQuestionReducer = (state = initialState, { type, currentQuestion, error }) => {
  switch (type) {
    case READ_CURRENT_QUESTION:
      return state;

    case GET_CURRENT_QUESTION:
      return {
        ...state,
        isLoading: true,
      };

    case GET_CURRENT_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentQuestion,
      };

    case GET_CURRENT_QUESTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};
