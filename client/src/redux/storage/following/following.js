import API from 'api/api';

/* ------------------------------ action types ------------------------------ */
const READ_FOLLOWING_DATA = '현재 사용자의 관심키워드에 해당하는 질문 조회';
const GET_FOLLOWING_DATA = '현재 사용자의 관심키워드에 해당하는 질문 요청';
const GET_FOLLOWING_DATA_SUCCESS = '관심키워드에 해당하는 질문 요청 성공';
const GET_FOLLOWING_DATA_FAILURE = '관심키워드에 해당하는 질문 요청 실패';

/* ---------------------------------- thunk --------------------------------- */
export const fetchFollowingData = (
  hashtags = [],
  currentTag = '',
  prevTag = '',
  init
) => async dispatch => {
  // 팔로잉 중인 키워드가 없는 경우
  if (!hashtags.length) {
    return;
  }

  // 다른 페이지 갔다가 돌아왔을 경우, 비동기 요청 없이 기존 정보 조회
  if (!init && currentTag === prevTag) {

    dispatch({ type: READ_FOLLOWING_DATA });
    return;
  }
  
  // 요청 시작
  dispatch({ type: GET_FOLLOWING_DATA, currentTag });

  const interests = currentTag === 'All' ? hashtags.join('+') : currentTag;

  try {
    // API 호출
    const followingData = await API(`/api/questions/following/${interests}`);

    // 성공했을 때
    dispatch({ type: GET_FOLLOWING_DATA_SUCCESS, followingData });
  } catch (error) {
    // 실패했을 때
    dispatch({ type: GET_FOLLOWING_DATA_FAILURE, error });
  }
};

/* ------------------------- initial state + reducer ------------------------ */
const initialState = {
  isLoading: false,
  isInitial: true,
  currentTag: 'All',
  followingData: null,
  error: null,
};

export const followingReducer = (
  state = initialState,
  { type, followingData, error, currentTag }
) => {
  switch (type) {
    case READ_FOLLOWING_DATA:
      return state;

    case GET_FOLLOWING_DATA:
      return {
        ...state,
        isLoading: true,
        isInitial: false,
        currentTag,
      };

    case GET_FOLLOWING_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        followingData,
      };

    case GET_FOLLOWING_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};