import axios from "axios";

/* ------------------------------ action types ------------------------------ */
const READ_FOLLOWING_DATA = "현재 사용자의 관심키워드에 해당하는 질문 조회";
const GET_FOLLOWING_DATA = "현재 사용자의 관심키워드에 해당하는 질문 요청";
const GET_MORE_FOLLOWING_DATA =
  "현재 사용자의 관심키워드에 해당하는 질문 더보기 요청";
const GET_MORE_FOLLOWING_DATA_SUCCESS =
  "현재 사용자의 관심키워드에 해당하는 질문 더보기 성공";
const GET_MORE_FOLLOWING_DATA_FAILURE =
  "현재 사용자의 관심키워드에 해당하는 질문 더보기 실패";

const GET_FOLLOWING_DATA_SUCCESS = "관심키워드에 해당하는 질문 요청 성공";
const GET_FOLLOWING_DATA_FAILURE = "관심키워드에 해당하는 질문 요청 실패";

/* ---------------------------------- thunk --------------------------------- */
export const fetchFollowingData = (
  hashtags = [],
  currentTag = "",
  prevTag = "",
  init
) => async (dispatch) => {
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

  const interests = currentTag === "All" ? hashtags.join("+") : currentTag;

  try {
    // API 호출
    const res = await axios(`/api/questions/following/${interests}`);
    // 성공했을 때
    if (res.statusText === "OK")
      dispatch({ type: GET_FOLLOWING_DATA_SUCCESS, followingData: res.data });
    else {
      dispatch({
        type: GET_FOLLOWING_DATA_FAILURE,
        error:
          res.data.message || "관심 키워드 질문을 불러오는데 실패하였습니다",
      });
    }
  } catch (error) {
    // 실패했을 때
    dispatch({
      type: GET_FOLLOWING_DATA_FAILURE,
      error:
        error.message ||
        "관심 키워드 질문을 불러오는데 알 수 없는 오류가 발생했습니다",
    });
  }
};

// 정보를 더 요청할시 사용할 액셕함수
export const loadMoreFollowingData = (hashtags = [], currentTag = "") => async (
  dispatch,
  prevState
) => {
  // 리덕스 상태의 팔로잉 데이터 추출
  const { following } = prevState();
  // 다음페이지가 없다면 요청을 보내지않음.
  if (following.followingData && !following.followingData.hasNextPage) {
    console.log("데이터가 없어용");
    return;
  }

  const interests = currentTag === "All" ? hashtags.join("+") : currentTag;

  // 전 상태의 페이지에 1을 추가해서 새로운 데이터 요청후 기존 followingData docs 배열에 append 하도록 액션타입 전달
  if (following.followingData && following.followingData.page) {
    try {
      dispatch({ type: GET_MORE_FOLLOWING_DATA });
      const res = await axios(
        `/api/questions/following/${interests}?page=${
          following.followingData.page + 1
        }`
      );
      dispatch({
        type: GET_MORE_FOLLOWING_DATA_SUCCESS,
        followingData: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_MORE_FOLLOWING_DATA_FAILURE,
        error: error.message || "더보기 데이터를 불러오는데 실패하였씁니다 ",
      });
    }
  }
};

/* ------------------------- initial state + reducer ------------------------ */
const initialState = {
  isLoading: false,
  isLoadingMore: false, // 데이터를 더 불러올때 로딩 상태
  isInitial: true,
  currentTag: "All",
  followingData: null,
  error: null,
  // page
  // nextPage
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

    case GET_MORE_FOLLOWING_DATA:
      return {
        ...state,
        isLoadingMore: true,
      };

    case GET_MORE_FOLLOWING_DATA_SUCCESS:
      return {
        ...state,
        isLoadingMore: false,
        followingData: {
          ...followingData,
          docs: [...state.followingData.docs, ...followingData.docs],
        },
      };

    case GET_FOLLOWING_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    case GET_MORE_FOLLOWING_DATA_FAILURE:
      return {
        ...state,
        isLoadingMore: false,
        error,
      };

    default:
      return state;
  }
};
