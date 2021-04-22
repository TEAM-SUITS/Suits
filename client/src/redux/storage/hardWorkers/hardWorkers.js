import API from "api/api";

/* ------------------------------ action types ------------------------------ */

const READ_HARD_WORKERS_RESULT = "명예의 전당 정보 읽기";
const GET_HARD_WORKERS = "명예의 전당 정보 요청";
const GET_HARD_WORKERS_SUCCESS = "명예의 전당 정보 요청 성공";
const GET_HARD_WORKERS_FAILURE = "명예의 전당 정보 요청 실패";

/* ----------------------------- thunk ---------------------------- */
export const fetchHardWorkersData = (mode) => async (dispatch, prevState) => {
  const dispatchAction = async () => {
    dispatch({ type: GET_HARD_WORKERS });
    // API 호출
    try {
      const workersData = await API(`/api/hard-workers`, "get");
      dispatch({ type: GET_HARD_WORKERS_SUCCESS, workersData });
    } catch (error) {
      // 실패했을 때
      dispatch({ type: GET_HARD_WORKERS_FAILURE, error });
    }
  };

  if (mode === "init") {
    const { hardWorkers } = prevState();
    if (hardWorkers.workersData) return;
    dispatchAction();
  } else {
    dispatchAction();
  }
};

/* ------------------------- initial state + reducer ------------------------ */
const initialState = {
  isLoading: false,
  workersData: null,
  error: null,
};

export const hardWorkersReducer = (
  state = initialState,
  { type, workersData, error }
) => {
  switch (type) {
    case READ_HARD_WORKERS_RESULT:
      return state;

    case GET_HARD_WORKERS:
      return {
        ...state,
        isLoading: true,
      };

    case GET_HARD_WORKERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        workersData,
      };

    case GET_HARD_WORKERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};
