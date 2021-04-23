import API from "api/api";

/* ------------------------------ action types ------------------------------ */
const READ_SEARCH_RESULT = "검색 결과 조회";
const GET_SEARCH_RESULT = "검색어로 검색 요청";
const GET_SEARCH_SUCCESS = "검색 요청 성공";
const GET_SEARCH_FAILURE = "검색 요청 실패";

/* ----------------------------- thunk ---------------------------- */
export const fetchSearchData = (searchWord, prevSearchWord) => async (
  dispatch
) => {
  // 현재 검색어와 이전 검색어가 동일할 경우
  if (searchWord === prevSearchWord) {
    dispatch({ type: READ_SEARCH_RESULT });
    return;
  }

  // 빈 문자열일 경우
  if (searchWord === "") {
    dispatch({ type: GET_SEARCH_RESULT, searchWord });
    const searchData = [];
    dispatch({ type: GET_SEARCH_SUCCESS, searchData });
    return;
  }

  // 하나 이상의 공백으로만 작성한 경우
  if (/\s/.test(searchWord) || /\s{2,}/.test(searchWord)) {
    console.error("공백은 검색할 수 없습니다.");
    return;
  }

  // 요청 시작
  dispatch({ type: GET_SEARCH_RESULT, searchWord });

  // API 호출
  try {
    // 성공했을 때
    const searchData = await API(`/api/questions/search/${searchWord}`, "get");
    dispatch({ type: GET_SEARCH_SUCCESS, searchData });
  } catch (error) {
    // 실패했을 때
    dispatch({ type: GET_SEARCH_FAILURE, error });
  }
};

/* ------------------------- initial state + reducer ------------------------ */
const initialState = {
  isLoading: false,
  searchWord: "",
  searchData: null,
  error: null,
};

export const searchReducer = (
  state = initialState,
  { type, searchWord, searchData, error }
) => {
  switch (type) {
    case READ_SEARCH_RESULT:
      return state;

    case GET_SEARCH_RESULT:
      return {
        ...state,
        isLoading: true,
        searchWord,
      };

    case GET_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        searchData,
      };

    case GET_SEARCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};
