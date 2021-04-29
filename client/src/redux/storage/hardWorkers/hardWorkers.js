import axios from 'axios';
import { setError } from '../error/error';

/* ------------------------------ action types ------------------------------ */

const READ_HARD_WORKERS_RESULT = '명예의 전당 정보 읽기';
const GET_HARD_WORKERS = '명예의 전당 정보 요청';
const GET_HARD_WORKERS_SUCCESS = '명예의 전당 정보 요청 성공';
const GET_HARD_WORKERS_FAILURE = '명예의 전당 정보 요청 실패';

/* ----------------------------- thunk ---------------------------- */
export const fetchHardWorkersData = (mode) => async (dispatch, prevState) => {
  const dispatchAction = async () => {
    dispatch({ type: GET_HARD_WORKERS });
    // API 호출
    try {
      const res = await axios(`/api/hard-workers`);
      if (res.statusText === 'OK') {
        dispatch({ type: GET_HARD_WORKERS_SUCCESS, workersData: res.data });
      } else {
        dispatch({
          type: GET_HARD_WORKERS_FAILURE,
          error: res.data.message || '명예의 전당 데이터를 서버에서 불러오는데 실패하였습니다',
        });
      }
    } catch (error) {
      // 실패했을 때
      dispatch({
        type: GET_HARD_WORKERS_FAILURE,
        error: '명예의 전당 데이터를 불러오는중 에러가 발생하였습니다',
      });
      dispatch(setError('명에의 전당 데이터를 불러오는중 에러가 발생하였습니다'));
    }
  };

  if (mode === 'init') {
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

export const hardWorkersReducer = (state = initialState, { type, workersData, error }) => {
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
